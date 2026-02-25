import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeliveryScheduleForm from "@/components/DeliveryScheduleForm";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ScheduleDelivery = () => {
  const navigate = useNavigate();
  const { user, subscription, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      toast.error("Please sign in to schedule a delivery");
      navigate("/auth");
      return;
    }

    if (!subscription.subscribed) {
      toast.error("You need an active subscription to schedule a delivery");
      navigate("/#pricing");
    }
  }, [user, subscription.subscribed, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !subscription.subscribed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="py-12 px-4">
        <DeliveryScheduleForm
          userId={user.id}
          customerName={user.user_metadata?.full_name || user.email?.split("@")[0]}
          customerEmail={user.email}
          onSuccess={() => navigate("/dashboard")}
          onCancel={() => navigate(-1)}
          cancelLabel="Go Back"
        />
      </main>
      <Footer />
    </div>
  );
};

export default ScheduleDelivery;
