import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Truck,
  ArrowLeft,
  MessageSquare,
  Package,
  Users,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminRole } from "@/hooks/useAdminRole";
import { toast } from "sonner";
import { ContactSubmissions } from "@/components/admin/ContactSubmissions";
import { MachineInventory } from "@/components/admin/MachineInventory";
import { CustomerManagement } from "@/components/admin/CustomerManagement";
import { SubscriptionManagement } from "@/components/admin/SubscriptionManagement";
import { DeliveryManagement } from "@/components/admin/DeliveryManagement";
import { SalesReport } from "@/components/admin/SalesReport";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();

  useEffect(() => {
    // Wait for both auth and admin role checks to complete
    if (authLoading || adminLoading) {
      console.log("[AdminDashboard] Still loading...", { authLoading, adminLoading });
      return;
    }

    console.log("[AdminDashboard] Auth check complete", { user: !!user, isAdmin });

    if (!user) {
      console.log("[AdminDashboard] No user, redirecting to /auth");
      window.location.href = "/auth";
      return;
    }

    if (!isAdmin) {
      console.log("[AdminDashboard] User not admin, redirecting to /");
      toast.error("Access denied. Admin privileges required.");
      window.location.href = "/";
      return;
    }
    
    console.log("[AdminDashboard] Access granted");
  }, [user, isAdmin, authLoading, adminLoading]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <a href="/">
              <Button
                variant="ghost"
                size="icon"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </a>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage deliveries, inquiries, and inventory
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="deliveries" className="space-y-6">
          <TabsList>
            <TabsTrigger value="deliveries" className="gap-2">
              <Truck className="h-4 w-4" />
              Deliveries
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="machines" className="gap-2">
              <Package className="h-4 w-4" />
              Machines
            </TabsTrigger>
            <TabsTrigger value="sales" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Sales
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deliveries">
            <DeliveryManagement />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionManagement />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactSubmissions />
          </TabsContent>

          <TabsContent value="machines">
            <MachineInventory />
          </TabsContent>

          <TabsContent value="sales">
            <SalesReport />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
