import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  CheckCircle2,
  Calendar,
  CreditCard,
  Truck,
  Clock,
  MapPin,
  Settings,
  LogOut,
  Home,
  Loader2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DeliverySchedule {
  id: string;
  scheduled_date: string;
  time_window: string;
  street_address: string;
  city: string;
  zip_code: string;
  status: string;
  notes: string | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: <Clock className="h-3.5 w-3.5" /> },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800 border-blue-200", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  completed: { label: "Completed", color: "bg-green-100 text-green-800 border-green-200", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200", icon: <XCircle className="h-3.5 w-3.5" /> },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, subscription, loading: authLoading, signOut, checkSubscription } = useAuth();
  const [deliveries, setDeliveries] = useState<DeliverySchedule[]>([]);
  const [loadingDeliveries, setLoadingDeliveries] = useState(true);
  const [loadingPortal, setLoadingPortal] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDeliveries();
    }
  }, [user]);

  const fetchDeliveries = async () => {
    setLoadingDeliveries(true);
    try {
      const { data, error } = await supabase
        .from("delivery_schedules")
        .select("*")
        .order("scheduled_date", { ascending: false });

      if (error) throw error;
      setDeliveries(data || []);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      toast.error("Failed to load delivery schedules");
    } finally {
      setLoadingDeliveries(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoadingPortal(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast.error("Failed to open subscription management");
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleRefreshSubscription = async () => {
    await checkSubscription();
    toast.success("Subscription status refreshed");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const upcomingDelivery = deliveries.find(
    (d) => d.status === "pending" || d.status === "confirmed"
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display font-bold text-xl text-foreground">
              My Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">{user.email}</p>
        </motion.div>

        {/* Subscription Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Subscription Status
              </CardTitle>
              <CardDescription>
                Your current rental subscription details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscription.subscribed ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Active Subscription</p>
                      <p className="text-sm text-muted-foreground">
                        Washer & Dryer Rental
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-auto bg-green-100 text-green-800 border-green-200">
                      Active
                    </Badge>
                  </div>

                  {subscription.subscriptionEnd && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Next billing date:{" "}
                        {format(new Date(subscription.subscriptionEnd), "MMMM d, yyyy")}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={handleManageSubscription}
                      disabled={loadingPortal}
                    >
                      {loadingPortal ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Settings className="h-4 w-4 mr-2" />
                      )}
                      Manage Subscription
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleRefreshSubscription}>
                      Refresh Status
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">No Active Subscription</p>
                      <p className="text-sm text-muted-foreground">
                        Start renting a washer & dryer today
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => navigate("/#pricing")}>
                    View Rental Plans
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Delivery Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Delivery & Installation
              </CardTitle>
              <CardDescription>
                Your scheduled deliveries and installation appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingDeliveries ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : deliveries.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    No delivery scheduled yet
                  </p>
                  {subscription.subscribed && (
                    <Button onClick={() => navigate("/checkout-success?schedule=true")}>
                      Schedule Delivery
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Upcoming/Active Delivery Highlight */}
                  {upcomingDelivery && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-foreground">
                            {format(new Date(upcomingDelivery.scheduled_date), "EEEE, MMMM d, yyyy")}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={statusConfig[upcomingDelivery.status]?.color}
                        >
                          {statusConfig[upcomingDelivery.status]?.icon}
                          <span className="ml-1.5">
                            {statusConfig[upcomingDelivery.status]?.label}
                          </span>
                        </Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{upcomingDelivery.time_window}</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <span>
                            {upcomingDelivery.street_address}, {upcomingDelivery.city},{" "}
                            {upcomingDelivery.zip_code}
                          </span>
                        </div>
                      </div>
                      {upcomingDelivery.notes && (
                        <p className="text-sm text-muted-foreground mt-3 italic">
                          "{upcomingDelivery.notes}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* All Deliveries List */}
                  {deliveries.length > 1 && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Delivery History
                      </h4>
                      <div className="space-y-3">
                        {deliveries
                          .filter((d) => d.id !== upcomingDelivery?.id)
                          .map((delivery) => (
                            <div
                              key={delivery.id}
                              className="flex items-center justify-between py-2"
                            >
                              <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">
                                  {format(new Date(delivery.scheduled_date), "MMM d, yyyy")}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {delivery.time_window}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className={statusConfig[delivery.status]?.color}
                              >
                                {statusConfig[delivery.status]?.label}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => navigate("/#contact")}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => navigate("/#faq")}>
                  View FAQ
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
