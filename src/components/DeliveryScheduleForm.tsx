import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, Truck, MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useDeliveryAvailability, useBlackoutDates } from "@/hooks/useDeliveryAvailability";

const timeSlots = [
  "Morning (8AM-12PM)",
  "Afternoon (12PM-4PM)",
  "Evening (4PM-7PM)",
];

interface DeliveryScheduleFormProps {
  /** If provided, associates the delivery with a user */
  userId?: string;
  /** Pre-fill customer name */
  customerName?: string;
  /** Pre-fill customer email */
  customerEmail?: string;
  /** Called on successful submission */
  onSuccess?: () => void;
  /** Called when user clicks back/cancel */
  onCancel?: () => void;
  /** Label for cancel button */
  cancelLabel?: string;
  /** Whether to show name/email fields (hidden when auto-filled from auth) */
  showContactFields?: boolean;
}

const DeliveryScheduleForm = ({
  userId,
  customerName,
  customerEmail,
  onSuccess,
  onCancel,
  cancelLabel = "Back",
  showContactFields = false,
}: DeliveryScheduleFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState(customerName || "");
  const [email, setEmail] = useState(customerEmail || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { availability, loading: availabilityLoading } = useDeliveryAvailability(selectedDate);
  const { blackoutDates } = useBlackoutDates();

  useEffect(() => {
    if (availability && selectedTime) {
      const slotInfo = availability.slots.find((s) => s.slot === selectedTime);
      if (slotInfo && !slotInfo.available) {
        setSelectedTime("");
      }
    }
  }, [availability, selectedTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalName = customerName || name.trim();
    const finalEmail = customerEmail || email.trim();

    if (!selectedDate || !selectedTime || !address.trim() || !city.trim() || !zipCode.trim() || !phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (showContactFields && (!finalName || !finalEmail)) {
      toast.error("Please provide your name and email");
      return;
    }

    setIsSubmitting(true);

    try {
      const scheduledDateStr = format(selectedDate, "yyyy-MM-dd");

      const { error } = await supabase.from("delivery_schedules").insert({
        user_id: userId || null,
        scheduled_date: scheduledDateStr,
        time_window: selectedTime,
        street_address: address.trim(),
        city: city.trim(),
        zip_code: zipCode.trim(),
        phone: phone.trim(),
        notes: notes.trim() || null,
        customer_name: finalName || null,
        customer_email: finalEmail || null,
      });

      if (error) throw error;

      // Send confirmation email (non-blocking)
      if (finalEmail) {
        supabase.functions.invoke("send-delivery-confirmation", {
          body: {
            customerEmail: finalEmail,
            customerName: finalName,
            scheduledDate: scheduledDateStr,
            timeWindow: selectedTime,
            streetAddress: address.trim(),
            city: city.trim(),
            zipCode: zipCode.trim(),
          },
        }).catch((err) => console.error("Failed to send confirmation email:", err));
      }

      toast.success("Delivery scheduled! We'll see you soon.");
      onSuccess?.();
    } catch (error: any) {
      console.error("Error scheduling delivery:", error);
      if (error.message?.includes("Maximum of 2 deliveries")) {
        toast.error("This date is fully booked. Please select another date.");
      } else if (error.message?.includes("time slot is already booked")) {
        toast.error("This time slot was just booked. Please select a different time.");
      } else {
        toast.error("Failed to schedule delivery. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-card rounded-2xl shadow-soft border border-border p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            Schedule Your Delivery
          </h1>
          <p className="text-muted-foreground">
            Choose a date and time that works for you. Delivery and installation takes about 30-45 minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact fields for public (non-auth) scheduling */}
          {showContactFields && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={200}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const dateStr = format(date, "yyyy-MM-dd");
                      return (
                        date <= today ||
                        date.getDay() === 0 ||
                        date > new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000) ||
                        blackoutDates.includes(dateStr)
                      );
                    }}
                    modifiers={{
                      blackedOut: blackoutDates.map((d) => {
                        const [year, month, day] = d.split("-").map(Number);
                        return new Date(year, month - 1, day);
                      }),
                    }}
                    modifiersStyles={{
                      blackedOut: {
                        backgroundColor: "hsl(var(--destructive) / 0.2)",
                        color: "hsl(var(--destructive))",
                        textDecoration: "line-through",
                      },
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time Window *</Label>
              <Select
                value={selectedTime}
                onValueChange={setSelectedTime}
                disabled={!selectedDate || availability?.isFull}
              >
                <SelectTrigger id="time">
                  <SelectValue placeholder={
                    !selectedDate
                      ? "Select a date first"
                      : availability?.isFull
                        ? "Day fully booked"
                        : "Select a time window"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => {
                    const slotInfo = availability?.slots.find((s) => s.slot === time);
                    const isBooked = slotInfo && !slotInfo.available;
                    return (
                      <SelectItem
                        key={time}
                        value={time}
                        disabled={isBooked}
                        className={isBooked ? "text-muted-foreground" : ""}
                      >
                        {time} {isBooked && "(Booked)"}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {availability?.isBlackedOut && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {availability.blackoutReason
                    ? `Not available: ${availability.blackoutReason}`
                    : "This date is not available for deliveries."}
                </p>
              )}
              {!availability?.isBlackedOut && availability?.isFull && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  This date is fully booked. Please select another date.
                </p>
              )}
              {availabilityLoading && (
                <p className="text-sm text-muted-foreground">Checking availability...</p>
              )}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <MapPin className="h-5 w-5 text-primary" />
              Delivery Address
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                placeholder="123 Main Street"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={200}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Biloxi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  maxLength={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  placeholder="39530"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(228) 555-1234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={20}
                required
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Gate code, parking instructions, preferred hookup location, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Scheduling..." : "Confirm Delivery Schedule"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default DeliveryScheduleForm;
