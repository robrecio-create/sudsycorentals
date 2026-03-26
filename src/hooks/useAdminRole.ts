import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const useAdminRole = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Dynamic import to avoid SSR issues with supabase client
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        console.log("[useAdminRole] Checking admin for user:", user.id, user.email);
        
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();

        console.log("[useAdminRole] Query result:", { data, error });

        if (error) {
          console.error("[useAdminRole] Error checking admin role:", error);
          setIsAdmin(false);
        } else {
          console.log("[useAdminRole] Setting isAdmin to:", !!data);
          setIsAdmin(!!data);
        }
      } catch (err) {
        console.error("[useAdminRole] Failed to check admin role:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user]);

  return { isAdmin, loading };
};
