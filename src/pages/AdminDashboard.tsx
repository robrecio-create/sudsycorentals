import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Truck,
  Calendar,
  MapPin,
  Phone,
  Clock,
  Search,
  Filter,
  ArrowLeft,
  RefreshCw,
  MessageSquare,
  Package,
  Users,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminRole } from "@/hooks/useAdminRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContactSubmissions } from "@/components/admin/ContactSubmissions";
import { MachineInventory } from "@/components/admin/MachineInventory";
import { CustomerManagement } from "@/components/admin/CustomerManagement";
import { SubscriptionManagement } from "@/components/admin/SubscriptionManagement";
import type { Tables } from "@/integrations/supabase/types";

type DeliverySchedule = Tables<"delivery_schedules">;

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  const [deliveries, setDeliveries] = useState<DeliverySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("delivery_schedules")
        .select("*")
        .order("scheduled_date", { ascending: true });

      if (error) throw error;
      setDeliveries(data || []);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      toast.error("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Wait for both auth and admin role checks to complete
    if (authLoading || adminLoading) {
      return;
    }

    if (!user) {
      navigate("/auth");
      return;
    }

    if (!isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
      return;
    }

    fetchDeliveries();
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("delivery_schedules")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setDeliveries((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.street_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || delivery.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: deliveries.length,
    pending: deliveries.filter((d) => d.status === "pending").length,
    confirmed: deliveries.filter((d) => d.status === "confirmed").length,
    completed: deliveries.filter((d) => d.status === "completed").length,
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
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
            <TabsTrigger value="customers" className="gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deliveries" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Deliveries</CardDescription>
                  <CardTitle className="text-3xl">{stats.total}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Pending</CardDescription>
                  <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Confirmed</CardDescription>
                  <CardTitle className="text-3xl text-blue-600">{stats.confirmed}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Completed</CardDescription>
                  <CardTitle className="text-3xl text-green-600">{stats.completed}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by address, city, or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={fetchDeliveries} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-8 text-center text-muted-foreground">
                    Loading deliveries...
                  </div>
                ) : filteredDeliveries.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No deliveries found
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDeliveries.map((delivery) => (
                          <TableRow key={delivery.id}>
                            <TableCell>
                              <div className="font-medium">
                                {delivery.customer_name || "—"}
                              </div>
                              {delivery.customer_email && (
                                <div className="text-sm text-muted-foreground">
                                  {delivery.customer_email}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5 font-medium">
                                  <Calendar className="h-3.5 w-3.5 text-primary" />
                                  {format((() => {
                                    const [year, month, day] = delivery.scheduled_date.split("-").map(Number);
                                    return new Date(year, month - 1, day);
                                  })(), "EEE, MMM d, yyyy")}
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5" />
                                  {delivery.time_window}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-start gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                                <div>
                                  <div>{delivery.street_address}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {delivery.city}, {delivery.zip_code}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1.5">
                                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                {delivery.phone}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-48 truncate text-sm text-muted-foreground">
                                {delivery.notes || "—"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={statusColors[delivery.status] || ""}
                              >
                                {delivery.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={delivery.status}
                                onValueChange={(value) => updateStatus(delivery.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
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

          <TabsContent value="customers">
            <CustomerManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
