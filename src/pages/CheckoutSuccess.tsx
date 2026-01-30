import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { checkSubscription } = useAuth();

  useEffect(() => {
    // Refresh subscription status after successful checkout
    checkSubscription();
  }, []);

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
          Your rental subscription is now active. We'll be in touch shortly to schedule your delivery and installation.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Go to Homepage
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
