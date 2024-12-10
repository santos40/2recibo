import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AdminSettings, LandingImages, AdminSettingsResponse, RegistrationSettings } from "@/types/adminSettings";
import { Json } from "@/integrations/supabase/types";
import { ImageSettingsForm } from "./ImageSettingsForm";
import { FormFieldsSettings } from "./FormFieldsSettings";

export const AdminForms = () => {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [registrationImage, setRegistrationImage] = useState("");
  const [landingImages, setLandingImages] = useState<LandingImages>({
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    featureImages: {
      reports: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
      rent: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      salary: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
      sales: "https://images.unsplash.com/photo-1556742031-c6961e8560b0"
    }
  });
  const { toast } = useToast();

  useEffect(() => {
    loadFormSettings();
    loadImages();
  }, []);

  const loadFormSettings = async () => {
    const { data, error } = await supabase
      .from("admin_settings")
      .select("*")
      .eq("type", "forms")
      .single();

    if (error && error.code !== "PGRST116") {
      toast({
        title: "Erro ao carregar configurações",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (data?.content) {
      setSettings(data.content as AdminSettings);
    }
  };

  const loadImages = async () => {
    const { data: registrationData } = await supabase
      .from("admin_settings")
      .select("content")
      .eq("type", "registration")
      .single();

    const { data: landingData } = await supabase
      .from("admin_settings")
      .select("content")
      .eq("type", "landing")
      .single();

    if (registrationData?.content && typeof registrationData.content === 'object') {
      const regSettings = registrationData.content as unknown as RegistrationSettings;
      if ('imageUrl' in regSettings) {
        setRegistrationImage(regSettings.imageUrl);
      }
    }

    if (landingData?.content && typeof landingData.content === 'object') {
      const landingSettings = landingData.content as unknown as LandingImages;
      if ('heroImage' in landingSettings && 'featureImages' in landingSettings) {
        setLandingImages(landingSettings);
      }
    }
  };

  const handleSave = async () => {
    const { error: formsError } = await supabase
      .from("admin_settings")
      .upsert({
        type: "forms",
        title: "Form Fields Configuration",
        content: settings
      });

    const registrationSettings: RegistrationSettings = { imageUrl: registrationImage };

    const { error: settingsError } = await supabase
      .from("admin_settings")
      .upsert([
        {
          type: "registration",
          title: "Registration Page Settings",
          content: registrationSettings as unknown as Json
        },
        {
          type: "landing",
          title: "Landing Page Settings",
          content: landingImages as unknown as Json
        }
      ]);

    if (formsError || settingsError) {
      toast({
        title: "Erro ao salvar configurações",
        description: formsError?.message || settingsError?.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Configurações salvas com sucesso",
    });
  };

  const updateFormFields = (formType: string, fields: string) => {
    setSettings((prev) => prev ? ({
      ...prev,
      [formType]: { fields: fields.split(",").map((f) => f.trim()) }
    }) : null);
  };

  const updateLandingImage = (key: string, subKey: string | null, value: string) => {
    setLandingImages(prev => {
      if (subKey) {
        return {
          ...prev,
          featureImages: {
            ...prev.featureImages,
            [subKey]: value
          }
        };
      }
      return {
        ...prev,
        [key]: value
      };
    });
  };

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Configuração de Formulários e Imagens</h2>
        <Button onClick={handleSave}>Salvar Alterações</Button>
      </div>

      <ImageSettingsForm
        registrationImage={registrationImage}
        setRegistrationImage={setRegistrationImage}
        landingImages={landingImages}
        updateLandingImage={updateLandingImage}
      />

      <FormFieldsSettings
        settings={settings}
        updateFormFields={updateFormFields}
      />
    </div>
  );
};