import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface SlotAvailability {
  slot: string;
  available: boolean;
}

interface DayAvailability {
  date: string;
  totalDeliveries: number;
  isFull: boolean;
  isBlackedOut: boolean;
  blackoutReason?: string;
  slots: SlotAvailability[];
}

const TIME_SLOTS = [
  "Morning (8AM-12PM)",
  "Afternoon (12PM-4PM)",
  "Evening (4PM-7PM)",
];

export function useDeliveryAvailability(selectedDate: Date | undefined) {
  const [availability, setAvailability] = useState<DayAvailability | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) {
      setAvailability(null);
      return;
    }

    const checkAvailability = async () => {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");

        // Check for blackout dates and existing deliveries in parallel
        const [blackoutResult, deliveriesResult] = await Promise.all([
          supabase
            .from("delivery_blackout_dates")
            .select("reason")
            .eq("blackout_date", dateStr)
            .maybeSingle(),
          supabase
            .from("delivery_schedules")
            .select("time_window")
            .eq("scheduled_date", dateStr)
            .neq("status", "cancelled"),
        ]);

        if (blackoutResult.error) throw blackoutResult.error;
        if (deliveriesResult.error) throw deliveriesResult.error;

        const isBlackedOut = !!blackoutResult.data;
        const blackoutReason = blackoutResult.data?.reason;

        const bookedSlots = deliveriesResult.data?.map((d) => d.time_window) || [];
        const totalDeliveries = bookedSlots.length;

        const slots: SlotAvailability[] = TIME_SLOTS.map((slot) => ({
          slot,
          available: !bookedSlots.includes(slot) && !isBlackedOut,
        }));

        setAvailability({
          date: dateStr,
          totalDeliveries,
          isFull: totalDeliveries >= 2 || isBlackedOut,
          isBlackedOut,
          blackoutReason,
          slots,
        });
      } catch (error) {
        console.error("Error checking availability:", error);
        setAvailability(null);
      } finally {
        setLoading(false);
      }
    };

    checkAvailability();
  }, [selectedDate]);

  return { availability, loading };
}

// Hook to fetch all blackout dates for calendar display
export function useBlackoutDates() {
  const [blackoutDates, setBlackoutDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlackoutDates = async () => {
      try {
        const { data, error } = await supabase
          .from("delivery_blackout_dates")
          .select("blackout_date");

        if (error) throw error;

        setBlackoutDates(data?.map((d) => d.blackout_date) || []);
      } catch (error) {
        console.error("Error fetching blackout dates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlackoutDates();
  }, []);

  return { blackoutDates, loading };
}
