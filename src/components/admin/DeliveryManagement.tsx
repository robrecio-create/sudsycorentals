import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  MapPin,
  Phone,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Pencil,
  Trash2,
  CalendarOff,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type DeliverySchedule = Tables<"delivery_schedules">;

interface BlackoutDate {
  id: string;
  blackout_date: string;
  reason: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const timeWindows = [
  "Morning (8AM-12PM)",
  "Afternoon (12PM-4PM)",
  "Evening (4PM-7PM)",
];

function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function DeliveryManagement() {
  const [deliveries, setDeliveries] = useState<DeliverySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Blackout dates state
  const [blackoutDates, setBlackoutDates] = useState<BlackoutDate[]>([]);
  const [blackoutLoading, setBlackoutLoading] = useState(true);
  const [addBlackoutOpen, setAddBlackoutOpen] = useState(false);
  const [newBlackoutDate, setNewBlackoutDate] = useState<Date | undefined>();
  const [newBlackoutReason, setNewBlackoutReason] = useState("");
  const [deletingBlackout, setDeletingBlackout] = useState<BlackoutDate | null>(null);
  
  // Add delivery dialog state
  const [addDeliveryOpen, setAddDeliveryOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    customer_name: "",
    customer_email: "",
    phone: "",
    street_address: "",
    city: "",
    zip_code: "",
    scheduled_date: "",
    time_window: "",
    notes: "",
    status: "pending",
  });
  const [addingDelivery, setAddingDelivery] = useState(false);

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState<DeliverySchedule | null>(null);
  const [editForm, setEditForm] = useState({
    customer_name: "",
    customer_email: "",
    phone: "",
    street_address: "",
    city: "",
    zip_code: "",
    scheduled_date: "",
    time_window: "",
    notes: "",
    status: "",
  });
  
  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingDelivery, setDeletingDelivery] = useState<DeliverySchedule | null>(null);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("delivery_schedules")
        .select("*")
        .order("scheduled_date", { ascending: false });

      if (error) throw error;
      setDeliveries(data || []);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      toast.error("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlackoutDates = async () => {
    setBlackoutLoading(true);
    try {
      const { data, error } = await supabase
        .from("delivery_blackout_dates")
        .select("*")
        .order("blackout_date", { ascending: true });

      if (error) throw error;
      setBlackoutDates(data || []);
    } catch (error) {
      console.error("Error fetching blackout dates:", error);
      toast.error("Failed to load blackout dates");
    } finally {
      setBlackoutLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
    fetchBlackoutDates();
  }, []);

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

  const openEditDialog = (delivery: DeliverySchedule) => {
    setEditingDelivery(delivery);
    setEditForm({
      customer_name: delivery.customer_name || "",
      customer_email: delivery.customer_email || "",
      phone: delivery.phone,
      street_address: delivery.street_address,
      city: delivery.city,
      zip_code: delivery.zip_code,
      scheduled_date: delivery.scheduled_date,
      time_window: delivery.time_window,
      notes: delivery.notes || "",
      status: delivery.status,
    });
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    if (!editingDelivery) return;

    try {
      // If date or time window changed, validate the limits
      const dateChanged = editForm.scheduled_date !== editingDelivery.scheduled_date;
      const timeChanged = editForm.time_window !== editingDelivery.time_window;

      if (dateChanged || timeChanged) {
        const { data: existing, error: checkError } = await supabase
          .from("delivery_schedules")
          .select("id, time_window")
          .eq("scheduled_date", editForm.scheduled_date)
          .neq("status", "cancelled")
          .neq("id", editingDelivery.id);

        if (checkError) throw checkError;

        if (existing && existing.length >= 1) {
          toast.error("Maximum of 1 delivery allowed per day. That date is fully booked.");
          return;
        }

        if (existing && existing.some((d) => d.time_window === editForm.time_window)) {
          toast.error("That time slot is already booked. Please select a different time.");
          return;
        }
      }

      const { error } = await supabase
        .from("delivery_schedules")
        .update({
          customer_name: editForm.customer_name || null,
          customer_email: editForm.customer_email || null,
          phone: editForm.phone,
          street_address: editForm.street_address,
          city: editForm.city,
          zip_code: editForm.zip_code,
          scheduled_date: editForm.scheduled_date,
          time_window: editForm.time_window,
          notes: editForm.notes || null,
          status: editForm.status,
        })
        .eq("id", editingDelivery.id);

      if (error) throw error;

      await fetchDeliveries();
      toast.success("Delivery updated successfully");
      setEditDialogOpen(false);
      setEditingDelivery(null);
    } catch (error: any) {
      console.error("Error updating delivery:", error);
      toast.error(error.message || "Failed to update delivery");
    }
  };

  const openDeleteDialog = (delivery: DeliverySchedule) => {
    setDeletingDelivery(delivery);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingDelivery) return;

    try {
      const { error } = await supabase
        .from("delivery_schedules")
        .delete()
        .eq("id", deletingDelivery.id);

      if (error) throw error;

      setDeliveries((prev) => prev.filter((d) => d.id !== deletingDelivery.id));
      toast.success("Delivery deleted successfully");
      setDeleteDialogOpen(false);
      setDeletingDelivery(null);
    } catch (error) {
      console.error("Error deleting delivery:", error);
      toast.error("Failed to delete delivery");
    }
  };

  const handleAddBlackout = async () => {
    if (!newBlackoutDate) {
      toast.error("Please select a date");
      return;
    }

    const dateStr = format(newBlackoutDate, "yyyy-MM-dd");
    
    // Check if date already exists
    if (blackoutDates.some((b) => b.blackout_date === dateStr)) {
      toast.error("This date is already blacked out");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("delivery_blackout_dates")
        .insert({
          blackout_date: dateStr,
          reason: newBlackoutReason.trim() || null,
        })
        .select()
        .single();

      if (error) throw error;

      setBlackoutDates((prev) => [...prev, data].sort((a, b) => 
        a.blackout_date.localeCompare(b.blackout_date)
      ));
      toast.success("Blackout date added");
      setAddBlackoutOpen(false);
      setNewBlackoutDate(undefined);
      setNewBlackoutReason("");
    } catch (error) {
      console.error("Error adding blackout date:", error);
      toast.error("Failed to add blackout date");
    }
  };

  const handleDeleteBlackout = async () => {
    if (!deletingBlackout) return;

    try {
      const { error } = await supabase
        .from("delivery_blackout_dates")
        .delete()
        .eq("id", deletingBlackout.id);

      if (error) throw error;

      setBlackoutDates((prev) => prev.filter((b) => b.id !== deletingBlackout.id));
      toast.success("Blackout date removed");
      setDeletingBlackout(null);
    } catch (error) {
      console.error("Error deleting blackout date:", error);
      toast.error("Failed to remove blackout date");
    }
  };

  const handleAddDelivery = async () => {
    if (!addForm.phone || !addForm.street_address || !addForm.city || !addForm.zip_code || !addForm.scheduled_date || !addForm.time_window) {
      toast.error("Please fill in all required fields");
      return;
    }

    setAddingDelivery(true);
    try {
      // Use the RPC function to enforce daily limit (max 2) and slot limit (max 1)
      const { data: newId, error: rpcError } = await supabase.rpc("book_delivery_slot", {
        p_user_id: null,
        p_scheduled_date: addForm.scheduled_date,
        p_time_window: addForm.time_window,
        p_street_address: addForm.street_address,
        p_city: addForm.city,
        p_zip_code: addForm.zip_code,
        p_phone: addForm.phone,
        p_notes: addForm.notes || null,
        p_customer_name: addForm.customer_name || null,
        p_customer_email: addForm.customer_email || null,
      });

      if (rpcError) throw rpcError;

      // If status is not "pending", update it (RPC inserts as pending)
      if (addForm.status !== "pending" && newId) {
        await supabase
          .from("delivery_schedules")
          .update({ status: addForm.status })
          .eq("id", newId);
      }

      // Refetch to get the full delivery record
      await fetchDeliveries();
      toast.success("Delivery added successfully");
      setAddDeliveryOpen(false);
      setAddForm({
        customer_name: "",
        customer_email: "",
        phone: "",
        street_address: "",
        city: "",
        zip_code: "",
        scheduled_date: "",
        time_window: "",
        notes: "",
        status: "pending",
      });
    } catch (error: any) {
      console.error("Error adding delivery:", error);
      toast.error(error.message || "Failed to add delivery");
    } finally {
      setAddingDelivery(false);
    }
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.street_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.phone.includes(searchTerm) ||
      (delivery.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (delivery.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

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

  // Get existing blackout date strings for calendar highlighting
  const blackoutDateStrings = blackoutDates.map((b) => b.blackout_date);

  return (
    <div className="space-y-6">
      {/* Blackout Dates Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarOff className="h-5 w-5 text-destructive" />
                Blackout Dates
              </CardTitle>
              <CardDescription>
                Block dates when deliveries are not available
              </CardDescription>
            </div>
            <Button onClick={() => setAddBlackoutOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Blackout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {blackoutLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : blackoutDates.length === 0 ? (
            <p className="text-muted-foreground text-sm">No blackout dates set</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {blackoutDates.map((blackout) => (
                <Badge
                  key={blackout.id}
                  variant="outline"
                  className="bg-destructive/10 text-destructive border-destructive/20 px-3 py-1.5 flex items-center gap-2"
                >
                  <span>
                    {format(parseDateString(blackout.blackout_date), "EEE, MMM d, yyyy")}
                    {blackout.reason && (
                      <span className="text-destructive/70 ml-1">— {blackout.reason}</span>
                    )}
                  </span>
                  <button
                    onClick={() => setDeletingBlackout(blackout)}
                    className="hover:bg-destructive/20 rounded p-0.5"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
                placeholder="Search by name, email, address, city, or phone..."
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
            <Button onClick={() => setAddDeliveryOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Delivery
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
                            <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                            {format(parseDateString(delivery.scheduled_date), "EEE, MMM d, yyyy")}
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
                        <div className="max-w-48 max-h-20 overflow-y-auto text-sm text-muted-foreground whitespace-pre-wrap">
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
                        <div className="flex items-center gap-2">
                          <Select
                            value={delivery.status}
                            onValueChange={(value) => updateStatus(delivery.id, value)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(delivery)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(delivery)}
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

      {/* Add Blackout Dialog */}
      <Dialog open={addBlackoutOpen} onOpenChange={setAddBlackoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Blackout Date</DialogTitle>
            <DialogDescription>
              Select a date to block from delivery scheduling.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newBlackoutDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newBlackoutDate ? format(newBlackoutDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newBlackoutDate}
                    onSelect={setNewBlackoutDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const dateStr = format(date, "yyyy-MM-dd");
                      // Disable past dates, Sundays (already blocked), and already blacked out dates
                      return date < today || date.getDay() === 0 || blackoutDateStrings.includes(dateStr);
                    }}
                    modifiers={{
                      blackedOut: blackoutDates.map((b) => parseDateString(b.blackout_date)),
                    }}
                    modifiersStyles={{
                      blackedOut: { 
                        backgroundColor: "hsl(var(--destructive) / 0.2)",
                        color: "hsl(var(--destructive))",
                      },
                    }}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason (optional)</Label>
              <Input
                id="reason"
                placeholder="e.g., Holiday, Maintenance, etc."
                value={newBlackoutReason}
                onChange={(e) => setNewBlackoutReason(e.target.value)}
                maxLength={100}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddBlackoutOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBlackout}>Add Blackout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Blackout Confirmation */}
      <AlertDialog open={!!deletingBlackout} onOpenChange={(open) => !open && setDeletingBlackout(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Blackout Date</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove the blackout for{" "}
              <strong>
                {deletingBlackout && format(parseDateString(deletingBlackout.blackout_date), "EEEE, MMMM d, yyyy")}
              </strong>?
              Customers will be able to schedule deliveries on this date again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBlackout}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Delivery Dialog */}
      <Dialog open={addDeliveryOpen} onOpenChange={setAddDeliveryOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Delivery</DialogTitle>
            <DialogDescription>
              Create a new delivery schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add_customer_name">Customer Name</Label>
                <Input
                  id="add_customer_name"
                  value={addForm.customer_name}
                  onChange={(e) => setAddForm({ ...addForm, customer_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add_customer_email">Customer Email</Label>
                <Input
                  id="add_customer_email"
                  type="email"
                  value={addForm.customer_email}
                  onChange={(e) => setAddForm({ ...addForm, customer_email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add_phone">Phone *</Label>
              <Input
                id="add_phone"
                value={addForm.phone}
                onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add_street_address">Street Address *</Label>
              <Input
                id="add_street_address"
                value={addForm.street_address}
                onChange={(e) => setAddForm({ ...addForm, street_address: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add_city">City *</Label>
                <Input
                  id="add_city"
                  value={addForm.city}
                  onChange={(e) => setAddForm({ ...addForm, city: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add_zip_code">Zip Code *</Label>
                <Input
                  id="add_zip_code"
                  value={addForm.zip_code}
                  onChange={(e) => setAddForm({ ...addForm, zip_code: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add_scheduled_date">Scheduled Date *</Label>
                <Input
                  id="add_scheduled_date"
                  type="date"
                  value={addForm.scheduled_date}
                  onChange={(e) => setAddForm({ ...addForm, scheduled_date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add_time_window">Time Window *</Label>
                <Select
                  value={addForm.time_window}
                  onValueChange={(value) => setAddForm({ ...addForm, time_window: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeWindows.map((window) => (
                      <SelectItem key={window} value={window}>
                        {window}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add_status">Status</Label>
              <Select
                value={addForm.status}
                onValueChange={(value) => setAddForm({ ...addForm, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add_notes">Notes</Label>
              <Textarea
                id="add_notes"
                value={addForm.notes}
                onChange={(e) => setAddForm({ ...addForm, notes: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDeliveryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDelivery} disabled={addingDelivery}>
              {addingDelivery ? "Adding..." : "Add Delivery"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Delivery</DialogTitle>
            <DialogDescription>
              Update the delivery details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Customer Name</Label>
                <Input
                  id="customer_name"
                  value={editForm.customer_name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, customer_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_email">Customer Email</Label>
                <Input
                  id="customer_email"
                  type="email"
                  value={editForm.customer_email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, customer_email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street_address">Street Address</Label>
              <Input
                id="street_address"
                value={editForm.street_address}
                onChange={(e) =>
                  setEditForm({ ...editForm, street_address: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={editForm.city}
                  onChange={(e) =>
                    setEditForm({ ...editForm, city: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip_code">Zip Code</Label>
                <Input
                  id="zip_code"
                  value={editForm.zip_code}
                  onChange={(e) =>
                    setEditForm({ ...editForm, zip_code: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduled_date">Scheduled Date</Label>
                <Input
                  id="scheduled_date"
                  type="date"
                  value={editForm.scheduled_date}
                  onChange={(e) =>
                    setEditForm({ ...editForm, scheduled_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time_window">Time Window</Label>
                <Select
                  value={editForm.time_window}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, time_window: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeWindows.map((window) => (
                      <SelectItem key={window} value={window}>
                        {window}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={editForm.notes}
                onChange={(e) =>
                  setEditForm({ ...editForm, notes: e.target.value })
                }
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Delivery</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this delivery for{" "}
              <strong>{deletingDelivery?.customer_name || deletingDelivery?.street_address}</strong>?
              This action cannot be undone.
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
    </div>
  );
}
