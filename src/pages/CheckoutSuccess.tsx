import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, CalendarIcon, Truck, MapPin, ArrowLeft } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const timeSlots = [
  "Morning (8AM-12PM)",
  "Afternoon (12PM-4PM)",
  "Evening (4PM-7PM)",
];

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { checkSubscription, user, subscription } = useAuth();
  const scheduleOnly = searchParams.get("schedule") === "true";
  const [step, setStep] = useState<"success" | "schedule">(scheduleOnly ? "schedule" : "success");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Refresh subscription status after successful checkout (only if not schedule-only mode)
    if (!scheduleOnly) {
      checkSubscription();
    }
  }, [scheduleOnly]);

  // Redirect non-subscribed users if they're trying to schedule directly
  useEffect(() => {
    if (scheduleOnly && !subscription.subscribed && user) {
      toast.error("You need an active subscription to schedule a delivery");
      navigate("/dashboard");
    }
  }, [scheduleOnly, subscription.subscribed, user, navigate]);

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !address.trim() || !city.trim() || !zipCode.trim() || !phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to schedule a delivery");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("delivery_schedules").insert({
        user_id: user.id,
        scheduled_date: format(selectedDate, "yyyy-MM-dd"),
        time_window: selectedTime,
        street_address: address.trim(),
        city: city.trim(),
        zip_code: zipCode.trim(),
        phone: phone.trim(),
        notes: notes.trim() || null,
        customer_name: user.user_metadata?.full_name || user.email?.split("@")[0] || null,
        customer_email: user.email || null,
      });

      if (error) {
        throw error;
      }

      toast.success("Delivery scheduled! We'll see you soon.");
      navigate("/");
    } catch (error) {
      console.error("Error scheduling delivery:", error);
      toast.error("Failed to schedule delivery. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "success") {
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
            Your rental subscription is now active. Let's schedule your delivery and installation!
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => setStep("schedule")}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Truck className="mr-2 h-5 w-5" />
              Schedule Delivery & Installation
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
              size="lg"
            >
              I'll Schedule Later
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
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

          <form onSubmit={handleScheduleSubmit} className="space-y-6">
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
                        // Disable past dates, Sundays, and dates more than 30 days out
                        return (
                          date < today ||
                          date.getDay() === 0 ||
                          date > new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
                        );
                      }}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time Window *</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select a time window" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => scheduleOnly ? navigate("/dashboard") : setStep("success")}
              >
                {scheduleOnly ? (
                  <>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </>
                ) : (
                  "Back"
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
