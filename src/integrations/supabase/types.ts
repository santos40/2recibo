export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_settings: {
        Row: {
          api_enabled: boolean | null
          api_key_expiry_days: number | null
          api_requests_limit: number | null
          content: Json
          created_at: string
          id: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          api_enabled?: boolean | null
          api_key_expiry_days?: number | null
          api_requests_limit?: number | null
          content?: Json
          created_at?: string
          id?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          api_enabled?: boolean | null
          api_key_expiry_days?: number | null
          api_requests_limit?: number | null
          content?: Json
          created_at?: string
          id?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          listing_type: string | null
          name: string
          parent_id: string | null
          parent_show_real_estate_fields: boolean | null
          show_real_estate_fields: boolean | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          listing_type?: string | null
          name: string
          parent_id?: string | null
          parent_show_real_estate_fields?: boolean | null
          show_real_estate_fields?: boolean | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          listing_type?: string | null
          name?: string
          parent_id?: string | null
          parent_show_real_estate_fields?: boolean | null
          show_real_estate_fields?: boolean | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      condo_api_keys: {
        Row: {
          api_key: string
          condo_id: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          last_checked_at: string | null
          status: string | null
        }
        Insert: {
          api_key: string
          condo_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_checked_at?: string | null
          status?: string | null
        }
        Update: {
          api_key?: string
          condo_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_checked_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      custom_banks: {
        Row: {
          created_at: string
          id: string
          imageurl: string
          name: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          imageurl: string
          name: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          imageurl?: string
          name?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      device_events: {
        Row: {
          created_at: string
          device_id: string | null
          event_data: Json | null
          event_type: string
          id: string
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
        }
        Update: {
          created_at?: string
          device_id?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_events_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      device_screenshots: {
        Row: {
          created_at: string
          device_id: string | null
          id: string
          screenshot_url: string
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          id?: string
          screenshot_url: string
        }
        Update: {
          created_at?: string
          device_id?: string | null
          id?: string
          screenshot_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_screenshots_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      devices: {
        Row: {
          ai_chat_enabled: boolean | null
          alarm_enabled: boolean | null
          battery_level: number | null
          camera_enabled: boolean | null
          created_at: string
          device_token: string | null
          id: string
          is_monitoring: boolean | null
          is_online: boolean | null
          last_location_lat: number | null
          last_location_lng: number | null
          last_screenshot_url: string | null
          last_seen: string | null
          monitoring_enabled: boolean | null
          name: string
          paired_device_id: string | null
          remote_activation_enabled: boolean | null
          remote_activation_requested_at: string | null
          screen_share_url: string | null
          screen_sharing_enabled: boolean | null
          user_id: string
        }
        Insert: {
          ai_chat_enabled?: boolean | null
          alarm_enabled?: boolean | null
          battery_level?: number | null
          camera_enabled?: boolean | null
          created_at?: string
          device_token?: string | null
          id?: string
          is_monitoring?: boolean | null
          is_online?: boolean | null
          last_location_lat?: number | null
          last_location_lng?: number | null
          last_screenshot_url?: string | null
          last_seen?: string | null
          monitoring_enabled?: boolean | null
          name: string
          paired_device_id?: string | null
          remote_activation_enabled?: boolean | null
          remote_activation_requested_at?: string | null
          screen_share_url?: string | null
          screen_sharing_enabled?: boolean | null
          user_id: string
        }
        Update: {
          ai_chat_enabled?: boolean | null
          alarm_enabled?: boolean | null
          battery_level?: number | null
          camera_enabled?: boolean | null
          created_at?: string
          device_token?: string | null
          id?: string
          is_monitoring?: boolean | null
          is_online?: boolean | null
          last_location_lat?: number | null
          last_location_lng?: number | null
          last_screenshot_url?: string | null
          last_seen?: string | null
          monitoring_enabled?: boolean | null
          name?: string
          paired_device_id?: string | null
          remote_activation_enabled?: boolean | null
          remote_activation_requested_at?: string | null
          screen_share_url?: string | null
          screen_sharing_enabled?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "devices_paired_device_id_fkey"
            columns: ["paired_device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      fake_deposits: {
        Row: {
          amount: number
          bank_name: string
          clicked_at: string | null
          created_at: string | null
          device_id: string
          id: string
          location_received: boolean | null
          location_requested: boolean | null
          sender_name: string
        }
        Insert: {
          amount: number
          bank_name: string
          clicked_at?: string | null
          created_at?: string | null
          device_id: string
          id?: string
          location_received?: boolean | null
          location_requested?: boolean | null
          sender_name: string
        }
        Update: {
          amount?: number
          bank_name?: string
          clicked_at?: string | null
          created_at?: string | null
          device_id?: string
          id?: string
          location_received?: boolean | null
          location_requested?: boolean | null
          sender_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "fake_deposits_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      footer_pages: {
        Row: {
          active: boolean | null
          category: string | null
          content: string | null
          created_at: string
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          built_area: number | null
          category_id: string
          city: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          images: Json | null
          price: number | null
          state_id: string
          status: string | null
          suites: number | null
          title: string
          total_area: number | null
          updated_at: string
          user_id: string
          vehicle_brand: string | null
          vehicle_fuel_type: string | null
          vehicle_year: number | null
          views: number | null
          whatsapp_number: string | null
          youtube_url: string | null
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          built_area?: number | null
          category_id: string
          city?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: Json | null
          price?: number | null
          state_id: string
          status?: string | null
          suites?: number | null
          title: string
          total_area?: number | null
          updated_at?: string
          user_id: string
          vehicle_brand?: string | null
          vehicle_fuel_type?: string | null
          vehicle_year?: number | null
          views?: number | null
          whatsapp_number?: string | null
          youtube_url?: string | null
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          built_area?: number | null
          category_id?: string
          city?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: Json | null
          price?: number | null
          state_id?: string
          status?: string | null
          suites?: number | null
          title?: string
          total_area?: number | null
          updated_at?: string
          user_id?: string
          vehicle_brand?: string | null
          vehicle_fuel_type?: string | null
          vehicle_year?: number | null
          views?: number | null
          whatsapp_number?: string | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      location_history: {
        Row: {
          device_id: string
          id: string
          latitude: number
          longitude: number
          timestamp: string
        }
        Insert: {
          device_id: string
          id?: string
          latitude: number
          longitude: number
          timestamp?: string
        }
        Update: {
          device_id?: string
          id?: string
          latitude?: number
          longitude?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_history_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_info: string | null
          company_name: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string | null
          phone: string | null
          signature_url: string | null
          social_media_links: Json | null
          status: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          company_info?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          id: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string | null
          phone?: string | null
          signature_url?: string | null
          social_media_links?: Json | null
          status?: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          company_info?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string | null
          phone?: string | null
          signature_url?: string | null
          social_media_links?: Json | null
          status?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      quotation_items: {
        Row: {
          created_at: string
          description: string
          id: string
          quantity: number
          quotation_id: string
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          quantity?: number
          quotation_id: string
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          quantity?: number
          quotation_id?: string
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quotation_items_quotation_id_fkey"
            columns: ["quotation_id"]
            isOneToOne: false
            referencedRelation: "quotations"
            referencedColumns: ["id"]
          },
        ]
      }
      quotations: {
        Row: {
          client_document: string | null
          client_name: string
          company_info: Json | null
          created_at: string
          id: string
          notes: string | null
          status: string | null
          total_amount: number
          type: string
          user_id: string
          validity_days: number | null
        }
        Insert: {
          client_document?: string | null
          client_name: string
          company_info?: Json | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: string | null
          total_amount?: number
          type: string
          user_id: string
          validity_days?: number | null
        }
        Update: {
          client_document?: string | null
          client_name?: string
          company_info?: Json | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: string | null
          total_amount?: number
          type?: string
          user_id?: string
          validity_days?: number | null
        }
        Relationships: []
      }
      receipts: {
        Row: {
          account_number: string | null
          account_type: string | null
          address: string | null
          amount: number
          bank_name: string | null
          branch_number: string | null
          city: string | null
          created_at: string
          date: string
          description: string | null
          due_date: string | null
          emission_date: string | null
          guarantor_address: string | null
          guarantor_document: string | null
          guarantor_name: string | null
          id: string
          interest_rate: number | null
          logo: string | null
          payee: string
          payer: string
          payer_document: string | null
          payment_location: string | null
          payment_method: string
          pix_key: string | null
          state: string | null
          template: string
          type: string
          user_id: string
          zip_code: string | null
        }
        Insert: {
          account_number?: string | null
          account_type?: string | null
          address?: string | null
          amount: number
          bank_name?: string | null
          branch_number?: string | null
          city?: string | null
          created_at?: string
          date: string
          description?: string | null
          due_date?: string | null
          emission_date?: string | null
          guarantor_address?: string | null
          guarantor_document?: string | null
          guarantor_name?: string | null
          id?: string
          interest_rate?: number | null
          logo?: string | null
          payee: string
          payer: string
          payer_document?: string | null
          payment_location?: string | null
          payment_method: string
          pix_key?: string | null
          state?: string | null
          template: string
          type: string
          user_id: string
          zip_code?: string | null
        }
        Update: {
          account_number?: string | null
          account_type?: string | null
          address?: string | null
          amount?: number
          bank_name?: string | null
          branch_number?: string | null
          city?: string | null
          created_at?: string
          date?: string
          description?: string | null
          due_date?: string | null
          emission_date?: string | null
          guarantor_address?: string | null
          guarantor_document?: string | null
          guarantor_name?: string | null
          id?: string
          interest_rate?: number | null
          logo?: string | null
          payee?: string
          payer?: string
          payer_document?: string | null
          payment_location?: string | null
          payment_method?: string
          pix_key?: string | null
          state?: string | null
          template?: string
          type?: string
          user_id?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      states: {
        Row: {
          abbreviation: string
          active: boolean | null
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          abbreviation: string
          active?: boolean | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          abbreviation?: string
          active?: boolean | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      tracking_schedules: {
        Row: {
          created_at: string
          device_id: string
          end_time: string
          id: string
          interval_seconds: number
          is_active: boolean | null
          start_time: string
        }
        Insert: {
          created_at?: string
          device_id: string
          end_time: string
          id?: string
          interval_seconds?: number
          is_active?: boolean | null
          start_time: string
        }
        Update: {
          created_at?: string
          device_id?: string
          end_time?: string
          id?: string
          interval_seconds?: number
          is_active?: boolean | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracking_schedules_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          active: boolean | null
          created_at: string
          id: string
          plan_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id?: string
          plan_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: string
          plan_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_contacts: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
