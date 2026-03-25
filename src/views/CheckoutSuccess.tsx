import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import DeliveryScheduleForm from "@/components/DeliveryScheduleForm";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { checkSubscription, user, subscription } = useAuth();
  const scheduleOnly = searchParams.get("schedule") === "true";
  const [step, setStep] = useState<"success" | "schedule">(scheduleOnly ? "schedule" : "success");

  useEffect(() => {
    if (!scheduleOnly) {
      checkSubscription();
    }
  }, [scheduleOnly]);

  useEffect(() => {
    if (scheduleOnly && !subscription.subscribed && user) {
      toast.error("You need an active subscription to schedule a delivery");
      navigate("/dashboard");
    }
  }, [scheduleOnly, subscription.subscribed, user, navigate]);

  if (step === "success") {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl shadow-soft border border-border p-8 max-w-md w-full text-center"
        >
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="h-16 w-16 text-success mx-auto" />
            </motion.div>
          </div>

          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            Welcome to Sudsy Co!
          </h1>
          <p className="text-muted-foreground mb-6">
            Your rental subscription is now active. Let's schedule your delivery and installation!
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => setStep("schedule")}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Truck className="mr-2 h-5 w-5" />
              Schedule Delivery & Installation
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
              size="lg"
            >
              I'll Schedule Later
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <DeliveryScheduleForm
        userId={user?.id}
        customerName={user?.user_metadata?.full_name || user?.email?.split("@")[0]}
        customerEmail={user?.email}
        onSuccess={() => navigate("/")}
        onCancel={() => scheduleOnly ? navigate("/dashboard") : setStep("success")}
        cancelLabel={scheduleOnly ? "Back to Dashboard" : "Back"}
      />
    </div>
  );
};

export default CheckoutSuccess;
