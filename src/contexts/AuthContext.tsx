import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionInfo {
  subscribed: boolean;
  productId: string | null;
  subscriptionEnd: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  subscription: SubscriptionInfo;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkSubscription: (sessionOverride?: Session | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionInfo>({
    subscribed: false,
    productId: null,
    subscriptionEnd: null,
  });

  const checkSubscription = useCallback(
    async (sessionOverride?: Session | null) => {
      // IMPORTANT: don't rely on React state being updated yet (Safari/iOS can be timing-sensitive)
      const effectiveSession =
        sessionOverride ?? (await supabase.auth.getSession()).data.session;

      if (!effectiveSession) {
        setSubscription({ subscribed: false, productId: null, subscriptionEnd: null });
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("check-subscription", {
          // Be explicit: prevents relying on any potentially stale global auth header.
          headers: { Authorization: `Bearer ${effectiveSession.access_token}` },
        });

        if (error) {
          const msg = (error as any)?.message ?? String(error);
          const status = (error as any)?.status;

          // If the backend says the session is missing/revoked, clear local session
          // so the UI doesn't get stuck in a 500/blank-screen loop.
          if (status === 401 || /Auth session missing/i.test(msg) || /Unauthorized/i.test(msg)) {
            await supabase.auth.signOut();
            setSubscription({ subscribed: false, productId: null, subscriptionEnd: null });
            return;
          }

          console.error("Error checking subscription:", error);
          return;
        }
        setSubscription({
          subscribed: data?.subscribed || false,
          productId: data?.product_id || null,
          subscriptionEnd: data?.subscription_end || null,
        });
      } catch (err) {
        console.error("Failed to check subscription:", err);
      }
    },
    []
  );

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Check subscription using the session object we already have
        if (session?.user) {
          setTimeout(() => {
            checkSubscription(session);
          }, 0);
        } else {
          setSubscription({ subscribed: false, productId: null, subscriptionEnd: null });
        }
      }
    );

    // THEN check for existing session (subscription check handled by onAuthStateChange)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => authSubscription.unsubscribe();
  }, [checkSubscription]);

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSubscription({ subscribed: false, productId: null, subscriptionEnd: null });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        subscription,
        signUp,
        signIn,
        signOut,
        checkSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
