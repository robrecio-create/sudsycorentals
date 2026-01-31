import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Plus,
  Search,
  Filter,
  RefreshCw,
  Pencil,
  Trash2,
  ExternalLink,
  CheckCircle,
  XCircle,
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
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

interface Machine {
  id: string;
  type: string;
  brand: string;
  model_number: string | null;
  serial_number: string | null;
  status: string;
  customer: string | null;
  purchase_cost: number | null;
  purchase_from: string | null;
  date_purchased: string | null;
  tested: boolean | null;
  notes: string | null;
  photos_link: string | null;
  created_at: string;
  updated_at: string;
}

const machineSchema = z.object({
  type: z.enum(["washer", "dryer", "combo"], { required_error: "Type is required" }),
  brand: z.string().min(1, "Brand is required").max(100, "Brand must be less than 100 characters"),
  model_number: z.string().max(100, "Model # must be less than 100 characters").optional().nullable(),
  serial_number: z.string().max(100, "Serial # must be less than 100 characters").optional().nullable(),
  status: z.enum(["available", "rented", "maintenance", "retired"]),
  customer: z.string().max(200, "Customer must be less than 200 characters").optional().nullable(),
  purchase_cost: z.number().min(0, "Cost must be positive").optional().nullable(),
  purchase_from: z.string().max(200, "Purchase from must be less than 200 characters").optional().nullable(),
  date_purchased: z.string().optional().nullable(),
  tested: z.boolean().optional().nullable(),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional().nullable(),
  photos_link: z.string().url("Must be a valid URL").max(500, "Link must be less than 500 characters").optional().nullable().or(z.literal("")),
});

type MachineFormData = z.infer<typeof machineSchema>;

const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-800 border-green-200",
  rented: "bg-blue-100 text-blue-800 border-blue-200",
  maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
  retired: "bg-gray-100 text-gray-800 border-gray-200",
};

const typeColors: Record<string, string> = {
  washer: "bg-cyan-100 text-cyan-800 border-cyan-200",
  dryer: "bg-orange-100 text-orange-800 border-orange-200",
  combo: "bg-purple-100 text-purple-800 border-purple-200",
};

const defaultFormData: MachineFormData = {
  type: "washer",
  brand: "",
  model_number: "",
  serial_number: "",
  status: "available",
  customer: "",
  purchase_cost: null,
  purchase_from: "",
  date_purchased: "",
  tested: false,
  notes: "",
  photos_link: "",
};

export const MachineInventory = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [deletingMachine, setDeletingMachine] = useState<Machine | null>(null);
  const [formData, setFormData] = useState<MachineFormData>(defaultFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const fetchMachines = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("machines")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMachines(data || []);
    } catch (error) {
      console.error("Error fetching machines:", error);
      toast.error("Failed to load machines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const openAddDialog = () => {
    setEditingMachine(null);
    setFormData(defaultFormData);
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (machine: Machine) => {
    setEditingMachine(machine);
    setFormData({
      type: machine.type as "washer" | "dryer" | "combo",
      brand: machine.brand,
      model_number: machine.model_number || "",
      serial_number: machine.serial_number || "",
      status: machine.status as "available" | "rented" | "maintenance" | "retired",
      customer: machine.customer || "",
      purchase_cost: machine.purchase_cost,
      purchase_from: machine.purchase_from || "",
      date_purchased: machine.date_purchased || "",
      tested: machine.tested || false,
      notes: machine.notes || "",
      photos_link: machine.photos_link || "",
    });
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (machine: Machine) => {
    setDeletingMachine(machine);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    // Validate form
    const result = machineSchema.safeParse({
      ...formData,
      photos_link: formData.photos_link || null,
      model_number: formData.model_number || null,
      serial_number: formData.serial_number || null,
      customer: formData.customer || null,
      purchase_from: formData.purchase_from || null,
      date_purchased: formData.date_purchased || null,
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
        type: formData.type,
        brand: formData.brand.trim(),
        model_number: formData.model_number?.trim() || null,
        serial_number: formData.serial_number?.trim() || null,
        status: formData.status,
        customer: formData.customer?.trim() || null,
        purchase_cost: formData.purchase_cost,
        purchase_from: formData.purchase_from?.trim() || null,
        date_purchased: formData.date_purchased || null,
        tested: formData.tested,
        notes: formData.notes?.trim() || null,
        photos_link: formData.photos_link?.trim() || null,
      };

      if (editingMachine) {
        const { error } = await supabase
          .from("machines")
          .update(saveData)
          .eq("id", editingMachine.id);

        if (error) throw error;
        toast.success("Machine updated successfully");
      } else {
        const { error } = await supabase.from("machines").insert(saveData);

        if (error) throw error;
        toast.success("Machine added successfully");
      }

      setIsDialogOpen(false);
      fetchMachines();
    } catch (error) {
      console.error("Error saving machine:", error);
      toast.error("Failed to save machine");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingMachine) return;

    try {
      const { error } = await supabase
        .from("machines")
        .delete()
        .eq("id", deletingMachine.id);

      if (error) throw error;
      toast.success("Machine deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletingMachine(null);
      fetchMachines();
    } catch (error) {
      console.error("Error deleting machine:", error);
      toast.error("Failed to delete machine");
    }
  };

  const filteredMachines = machines.filter((machine) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      machine.brand.toLowerCase().includes(searchLower) ||
      machine.model_number?.toLowerCase().includes(searchLower) ||
      machine.serial_number?.toLowerCase().includes(searchLower) ||
      machine.customer?.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === "all" || machine.status === statusFilter;
    const matchesType = typeFilter === "all" || machine.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: machines.length,
    available: machines.filter((m) => m.status === "available").length,
    rented: machines.filter((m) => m.status === "rented").length,
    maintenance: machines.filter((m) => m.status === "maintenance").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Machines</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.available}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rented</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.rented}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Maintenance</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.maintenance}</CardTitle>
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
                placeholder="Search by brand, model, serial, or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="washer">Washer</SelectItem>
                <SelectItem value="dryer">Dryer</SelectItem>
                <SelectItem value="combo">Combo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchMachines} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Machine
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading machines...
            </div>
          ) : filteredMachines.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No machines found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Model #</TableHead>
                    <TableHead>Serial #</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Tested</TableHead>
                    <TableHead>Photos</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMachines.map((machine) => (
                    <TableRow key={machine.id}>
                      <TableCell>
                        <Badge variant="outline" className={typeColors[machine.type] || ""}>
                          {machine.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{machine.brand}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {machine.model_number || "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {machine.serial_number || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[machine.status] || ""}>
                          {machine.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {machine.customer || "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {machine.purchase_cost
                          ? `$${machine.purchase_cost.toFixed(2)}`
                          : "—"}
                      </TableCell>
                      <TableCell>
                        {machine.tested ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        {machine.photos_link ? (
                          <a
                            href={machine.photos_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(machine)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(machine)}
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMachine ? "Edit Machine" : "Add New Machine"}
            </DialogTitle>
            <DialogDescription>
              {editingMachine
                ? "Update the machine details below."
                : "Enter the machine details below."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value as "washer" | "dryer" | "combo" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="washer">Washer</SelectItem>
                    <SelectItem value="dryer">Dryer</SelectItem>
                    <SelectItem value="combo">Combo</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.type && (
                  <p className="text-sm text-destructive">{formErrors.type}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as "available" | "rented" | "maintenance" | "retired",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g., Samsung, LG, Whirlpool"
                />
                {formErrors.brand && (
                  <p className="text-sm text-destructive">{formErrors.brand}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model_number">Model #</Label>
                <Input
                  id="model_number"
                  value={formData.model_number || ""}
                  onChange={(e) => setFormData({ ...formData, model_number: e.target.value })}
                  placeholder="Model number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serial_number">Serial #</Label>
                <Input
                  id="serial_number"
                  value={formData.serial_number || ""}
                  onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                  placeholder="Serial number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Input
                  id="customer"
                  value={formData.customer || ""}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  placeholder="Customer name (if rented)"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchase_cost">Purchase Cost ($)</Label>
                <Input
                  id="purchase_cost"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.purchase_cost || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      purchase_cost: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchase_from">Purchase From</Label>
                <Input
                  id="purchase_from"
                  value={formData.purchase_from || ""}
                  onChange={(e) => setFormData({ ...formData, purchase_from: e.target.value })}
                  placeholder="Vendor/Source"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_purchased">Date Purchased</Label>
                <Input
                  id="date_purchased"
                  type="date"
                  value={formData.date_purchased || ""}
                  onChange={(e) => setFormData({ ...formData, date_purchased: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos_link">Photos Link (Google Photos URL)</Label>
              <Input
                id="photos_link"
                type="url"
                value={formData.photos_link || ""}
                onChange={(e) => setFormData({ ...formData, photos_link: e.target.value })}
                placeholder="https://photos.google.com/..."
              />
              {formErrors.photos_link && (
                <p className="text-sm text-destructive">{formErrors.photos_link}</p>
              )}
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="tested"
                checked={formData.tested || false}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, tested: checked as boolean })
                }
              />
              <Label htmlFor="tested" className="font-normal">
                Machine has been tested
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingMachine ? "Update Machine" : "Add Machine"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Machine</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {deletingMachine?.brand}{" "}
              {deletingMachine?.type}? This action cannot be undone.
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
};
