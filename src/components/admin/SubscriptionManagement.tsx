import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  CreditCard,
  RefreshCw,
  Search,
  User,
  Calendar,
  DollarSign,
  AlertCircle,
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Subscription {
  id: string;
  customer_id: string;
  customer_email: string;
  customer_name: string | null;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  created: string | null;
  cancel_at_period_end: boolean;
  product_id: string | null;
  price_id: string | null;
  amount: number;
  currency: string;
  interval: string;
}

export const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-list-subscriptions");
      
      if (error) throw error;
      
      setSubscriptions(data?.subscriptions || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      sub.customer_email?.toLowerCase().includes(searchLower) ||
      sub.customer_name?.toLowerCase().includes(searchLower) ||
      sub.id.toLowerCase().includes(searchLower)
    );
  });

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const stats = {
    total: subscriptions.length,
    monthlyRevenue: subscriptions.reduce((acc, sub) => {
      if (sub.interval === "month") {
        return acc + (sub.amount || 0);
      } else if (sub.interval === "year") {
        return acc + ((sub.amount || 0) / 12);
      }
      return acc;
    }, 0),
    cancelling: subscriptions.filter((s) => s.cancel_at_period_end).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Subscriptions</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Revenue</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {formatCurrency(stats.monthlyRevenue, "usd")}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Cancellation</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.cancelling}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search and Refresh */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email, name, or subscription ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={fetchSubscriptions} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Active Subscriptions
          </CardTitle>
          <CardDescription>
            All active rental subscriptions from Stripe
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading subscriptions...
            </div>
          ) : filteredSubscriptions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              {searchTerm ? "No subscriptions match your search" : "No active subscriptions found"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Current Period</TableHead>
                    <TableHead>Started</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">
                              {subscription.customer_name || "—"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {subscription.customer_email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 border-green-200 w-fit"
                          >
                            {subscription.status}
                          </Badge>
                          {subscription.cancel_at_period_end && (
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800 border-yellow-200 w-fit text-xs"
                            >
                              Cancels at period end
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-medium">
                            {formatCurrency(subscription.amount, subscription.currency)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /{subscription.interval}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {subscription.current_period_start && subscription.current_period_end ? (
                          <div className="flex items-center gap-1.5 text-sm">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>
                              {format(new Date(subscription.current_period_start), "MMM d")} -{" "}
                              {format(new Date(subscription.current_period_end), "MMM d, yyyy")}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {subscription.created ? (
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(subscription.created), "MMM d, yyyy")}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
