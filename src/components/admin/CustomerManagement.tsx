import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  Pencil,
  Trash2,
  Phone,
  Mail,
  MapPin,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { format } from "date-fns";

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  street_address: string | null;
  city: string | null;
  zip_code: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface RentalHistory {
  id: string;
  machine_id: string;
  customer_id: string;
  rental_start_date: string;
  rental_end_date: string | null;
  monthly_rate: number | null;
  status: string;
  notes: string | null;
  machines?: {
    type: string;
    brand: string;
    model_number: string | null;
    serial_number: string | null;
  };
}

const phoneRegex = /^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const customerSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name must be less than 200 characters"),
  email: z.string().regex(emailRegex, "Invalid email format").max(255).optional().nullable().or(z.literal("")),
  phone: z.string().regex(phoneRegex, "Phone format: (123) 456-7890"),
  street_address: z.string().max(300).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  zip_code: z.string().max(10).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

const defaultFormData: CustomerFormData = {
  name: "",
  email: "",
  phone: "",
  street_address: "",
  city: "",
  zip_code: "",
  notes: "",
};

export const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [rentalHistory, setRentalHistory] = useState<RentalHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>(defaultFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchRentalHistory = async (customerId: string) => {
    setHistoryLoading(true);
    try {
      const { data, error } = await supabase
        .from("rental_history")
        .select(`
          *,
          machines:machine_id (type, brand, model_number, serial_number)
        `)
        .eq("customer_id", customerId)
        .order("rental_start_date", { ascending: false });

      if (error) throw error;
      setRentalHistory(data || []);
    } catch (error) {
      console.error("Error fetching rental history:", error);
      toast.error("Failed to load rental history");
    } finally {
      setHistoryLoading(false);
    }
  };

  const openAddDialog = () => {
    setEditingCustomer(null);
    setFormData(defaultFormData);
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email || "",
      phone: customer.phone,
      street_address: customer.street_address || "",
      city: customer.city || "",
      zip_code: customer.zip_code || "",
      notes: customer.notes || "",
    });
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (customer: Customer) => {
    setDeletingCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const openHistoryDialog = (customer: Customer) => {
    setViewingCustomer(customer);
    fetchRentalHistory(customer.id);
    setIsHistoryDialogOpen(true);
  };

  const handleSave = async () => {
    const result = customerSchema.safeParse({
      ...formData,
      email: formData.email || null,
      street_address: formData.street_address || null,
      city: formData.city || null,
      zip_code: formData.zip_code || null,
      notes: formData.notes || null,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    setSaving(true);
    try {
      const saveData = {
        name: formData.name.trim(),
        email: formData.email?.trim() || null,
        phone: formData.phone.trim(),
        street_address: formData.street_address?.trim() || null,
        city: formData.city?.trim() || null,
        zip_code: formData.zip_code?.trim() || null,
        notes: formData.notes?.trim() || null,
      };

      if (editingCustomer) {
        const { error } = await supabase
          .from("customers")
          .update(saveData)
          .eq("id", editingCustomer.id);

        if (error) throw error;
        toast.success("Customer updated successfully");
      } else {
        const { error } = await supabase.from("customers").insert(saveData);

        if (error) throw error;
        toast.success("Customer added successfully");
      }

      setIsDialogOpen(false);
      fetchCustomers();
    } catch (error: any) {
      console.error("Error saving customer:", error);
      if (error.message?.includes("customers_phone_format")) {
        setFormErrors({ phone: "Phone format: (123) 456-7890" });
      } else if (error.message?.includes("customers_email_format")) {
        setFormErrors({ email: "Invalid email format" });
      } else {
        toast.error("Failed to save customer");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingCustomer) return;

    try {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", deletingCustomer.id);

      if (error) throw error;
      toast.success("Customer deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletingCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer. They may have active rentals.");
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchTerm) ||
      customer.city?.toLowerCase().includes(searchLower)
    );
  });

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800 border-green-200",
    completed: "bg-gray-100 text-gray-800 border-gray-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-3xl">{customers.length}</CardTitle>
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
                placeholder="Search by name, email, phone, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={fetchCustomers} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading customers...
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No customers found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            {customer.phone}
                          </div>
                          {customer.email && (
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Mail className="h-3.5 w-3.5" />
                              {customer.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {customer.street_address ? (
                          <div className="flex items-start gap-1.5 text-sm">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                              <div>{customer.street_address}</div>
                              {(customer.city || customer.zip_code) && (
                                <div className="text-muted-foreground">
                                  {customer.city}{customer.city && customer.zip_code ? ", " : ""}{customer.zip_code}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-48 truncate text-sm text-muted-foreground">
                          {customer.notes || "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openHistoryDialog(customer)}
                            title="View rental history"
                          >
                            <History className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(customer)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(customer)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Customer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? "Edit Customer" : "Add New Customer"}
            </DialogTitle>
            <DialogDescription>
              {editingCustomer
                ? "Update the customer details below."
                : "Enter the customer details below."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Customer name"
              />
              {formErrors.name && (
                <p className="text-sm text-destructive">{formErrors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(123) 456-7890"
                />
                {formErrors.phone && (
                  <p className="text-sm text-destructive">{formErrors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
                {formErrors.email && (
                  <p className="text-sm text-destructive">{formErrors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street_address">Street Address</Label>
              <Input
                id="street_address"
                value={formData.street_address || ""}
                onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ""}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip_code">ZIP Code</Label>
                <Input
                  id="zip_code"
                  value={formData.zip_code || ""}
                  onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                  placeholder="12345"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional notes..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingCustomer ? "Update Customer" : "Add Customer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deletingCustomer?.name}? This will also
              delete their rental history. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rental History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Rental History - {viewingCustomer?.name}</DialogTitle>
            <DialogDescription>
              View all rental records for this customer.
            </DialogDescription>
          </DialogHeader>

          {historyLoading ? (
            <div className="py-8 text-center text-muted-foreground">
              Loading rental history...
            </div>
          ) : rentalHistory.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No rental history found for this customer.
            </div>
          ) : (
            <div className="space-y-4">
              {rentalHistory.map((rental) => (
                <Card key={rental.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">
                          {rental.machines?.brand} {rental.machines?.type}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {rental.machines?.model_number && `Model: ${rental.machines.model_number}`}
                          {rental.machines?.serial_number && ` | Serial: ${rental.machines.serial_number}`}
                        </div>
                        <div className="text-sm mt-2">
                          {format(new Date(rental.rental_start_date), "MMM d, yyyy")}
                          {rental.rental_end_date
                            ? ` - ${format(new Date(rental.rental_end_date), "MMM d, yyyy")}`
                            : " - Present"}
                        </div>
                        {rental.monthly_rate && (
                          <div className="text-sm text-muted-foreground">
                            ${rental.monthly_rate}/month
                          </div>
                        )}
                      </div>
                      <Badge variant="outline" className={statusColors[rental.status] || ""}>
                        {rental.status}
                      </Badge>
                    </div>
                    {rental.notes && (
                      <div className="text-sm text-muted-foreground mt-2 pt-2 border-t">
                        {rental.notes}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
