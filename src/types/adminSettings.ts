import { Json } from "@/integrations/supabase/types";

export interface AdminSettings {
  [key: string]: {
    fields: string[];
  };
}

export interface LandingImages {
  heroImage: string;
  featureImages: {
    [key: string]: string;
  };
}

export interface AdminSettingsResponse {
  content: Json;
}

export interface RegistrationSettings {
  imageUrl: string;
}