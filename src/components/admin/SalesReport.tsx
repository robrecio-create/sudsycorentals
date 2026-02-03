import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DollarSign, TrendingUp, Package, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SoldMachine {
  id: string;
  type: string;
  brand: string;
  model_number: string | null;
  serial_number: string | null;
  in_house_id: string | null;
  purchase_cost: number | null;
  sale_price: number | null;
  sold_date: string | null;
  date_purchased: string | null;
}

const typeColors: Record<string, string> = {
  washer: "bg-cyan-100 text-cyan-800 border-cyan-200",
  dryer: "bg-orange-100 text-orange-800 border-orange-200",
  combo: "bg-purple-100 text-purple-800 border-purple-200",
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "—";
  const [year, month, day] = dateString.split("-").map(Number);
  return format(new Date(year, month - 1, day), "MMM d, yyyy");
};

const formatCurrency = (amount: number | null) => {
  if (amount === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const SalesReport = () => {
  const [soldMachines, setSoldMachines] = useState<SoldMachine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSoldMachines = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("machines")
        .select("id, type, brand, model_number, serial_number, in_house_id, purchase_cost, sale_price, sold_date, date_purchased")
        .eq("status", "sold")
        .order("sold_date", { ascending: false });

      if (error) throw error;
      setSoldMachines(data || []);
    } catch (error) {
      console.error("Error fetching sold machines:", error);
      toast.error("Failed to load sales data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoldMachines();
  }, []);

  // Calculate summary stats
  const totalSales = soldMachines.reduce((sum, m) => sum + (m.sale_price || 0), 0);
  const totalCost = soldMachines.reduce((sum, m) => sum + (m.purchase_cost || 0), 0);
  const totalProfit = totalSales - totalCost;
  const avgSalePrice = soldMachines.length > 0 ? totalSales / soldMachines.length : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {formatCurrency(totalSales)}
            </div>
            <p className="text-xs text-muted-foreground">
              From {soldMachines.length} machine{soldMachines.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(totalProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              Sales minus purchase costs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sale Price</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(avgSalePrice)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per machine sold
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soldMachines.length}</div>
            <p className="text-xs text-muted-foreground">
              Total machines sold
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>
            Complete record of all sold machines with profit/loss analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading sales data...
            </div>
          ) : soldMachines.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No machines have been sold yet. Mark a machine as "Sold" to see it here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Brand / Model</TableHead>
                    <TableHead>Date Sold</TableHead>
                    <TableHead className="text-right">Purchase Cost</TableHead>
                    <TableHead className="text-right">Sale Price</TableHead>
                    <TableHead className="text-right">Profit/Loss</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {soldMachines.map((machine) => {
                    const profit = (machine.sale_price || 0) - (machine.purchase_cost || 0);
                    return (
                      <TableRow key={machine.id}>
                        <TableCell className="font-mono text-sm">
                          {machine.in_house_id || machine.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={typeColors[machine.type]}>
                            {machine.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{machine.brand}</div>
                          {machine.model_number && (
                            <div className="text-sm text-muted-foreground">
                              {machine.model_number}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(machine.sold_date)}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(machine.purchase_cost)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(machine.sale_price)}
                        </TableCell>
                        <TableCell className={`text-right font-medium ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {profit >= 0 ? "+" : ""}{formatCurrency(profit)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
