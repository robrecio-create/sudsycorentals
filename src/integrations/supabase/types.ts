export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          appliance: string | null
          created_at: string
          email: string
          id: string
          inquiry_type: string
          message: string | null
          name: string
          notification_sent: boolean
          phone: string
          preferred_date: string | null
          preferred_time: string | null
          problem_description: string | null
          status: string
          updated_at: string
        }
        Insert: {
          appliance?: string | null
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          message?: string | null
          name: string
          notification_sent?: boolean
          phone: string
          preferred_date?: string | null
          preferred_time?: string | null
          problem_description?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          appliance?: string | null
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          message?: string | null
          name?: string
          notification_sent?: boolean
          phone?: string
          preferred_date?: string | null
          preferred_time?: string | null
          problem_description?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          apartment_name: string | null
          apartment_number: string | null
          city: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string
          state: string | null
          street_address: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          apartment_name?: string | null
          apartment_number?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone: string
          state?: string | null
          street_address?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          apartment_name?: string | null
          apartment_number?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string
          state?: string | null
          street_address?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      delivery_blackout_dates: {
        Row: {
          blackout_date: string
          created_at: string
          created_by: string | null
          id: string
          reason: string | null
        }
        Insert: {
          blackout_date: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string | null
        }
        Update: {
          blackout_date?: string
          created_at?: string
          created_by?: string | null
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      delivery_schedules: {
        Row: {
          city: string
          created_at: string
          customer_email: string | null
          customer_name: string | null
          id: string
          notes: string | null
          phone: string
          scheduled_date: string
          status: string
          street_address: string
          time_window: string
          updated_at: string
          user_id: string | null
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          notes?: string | null
          phone: string
          scheduled_date: string
          status?: string
          street_address: string
          time_window: string
          updated_at?: string
          user_id?: string | null
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          notes?: string | null
          phone?: string
          scheduled_date?: string
          status?: string
          street_address?: string
          time_window?: string
          updated_at?: string
          user_id?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      machines: {
        Row: {
          brand: string
          created_at: string
          customer: string | null
          customer_id: string | null
          customer_location: string | null
          date_purchased: string | null
          id: string
          in_house_id: string | null
          location: string | null
          model_number: string | null
          notes: string | null
          photos_link: string | null
          purchase_cost: number | null
          purchase_from: string | null
          sale_price: number | null
          serial_number: string | null
          sold_date: string | null
          status: string
          tested: boolean | null
          type: string
          updated_at: string
        }
        Insert: {
          brand: string
          created_at?: string
          customer?: string | null
          customer_id?: string | null
          customer_location?: string | null
          date_purchased?: string | null
          id?: string
          in_house_id?: string | null
          location?: string | null
          model_number?: string | null
          notes?: string | null
          photos_link?: string | null
          purchase_cost?: number | null
          purchase_from?: string | null
          sale_price?: number | null
          serial_number?: string | null
          sold_date?: string | null
          status?: string
          tested?: boolean | null
          type: string
          updated_at?: string
        }
        Update: {
          brand?: string
          created_at?: string
          customer?: string | null
          customer_id?: string | null
          customer_location?: string | null
          date_purchased?: string | null
          id?: string
          in_house_id?: string | null
          location?: string | null
          model_number?: string | null
          notes?: string | null
          photos_link?: string | null
          purchase_cost?: number | null
          purchase_from?: string | null
          sale_price?: number | null
          serial_number?: string | null
          sold_date?: string | null
          status?: string
          tested?: boolean | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "machines_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_history: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          machine_id: string
          monthly_rate: number | null
          notes: string | null
          rental_end_date: string | null
          rental_start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          machine_id: string
          monthly_rate?: number | null
          notes?: string | null
          rental_end_date?: string | null
          rental_start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          machine_id?: string
          monthly_rate?: number | null
          notes?: string | null
          rental_end_date?: string | null
          rental_start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_history_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_history_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      book_delivery_slot: {
        Args: {
          p_city: string
          p_customer_email?: string
          p_customer_name?: string
          p_notes?: string
          p_phone: string
          p_scheduled_date: string
          p_street_address: string
          p_time_window: string
          p_user_id: string
          p_zip_code: string
        }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
