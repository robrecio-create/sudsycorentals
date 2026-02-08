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

        const { data, error } = await supabase
          .from("delivery_schedules")
          .select("time_window")
          .eq("scheduled_date", dateStr)
          .neq("status", "cancelled");

        if (error) throw error;

        const bookedSlots = data?.map((d) => d.time_window) || [];
        const totalDeliveries = bookedSlots.length;

        const slots: SlotAvailability[] = TIME_SLOTS.map((slot) => ({
          slot,
          available: !bookedSlots.includes(slot),
        }));

        setAvailability({
          date: dateStr,
          totalDeliveries,
          isFull: totalDeliveries >= 2,
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
