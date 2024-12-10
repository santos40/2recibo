import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { PricingPlan, defaultPlans } from "@/stores/pricingStore";
import { Json } from "@/integrations/supabase/types";
import { ApiSettingsCard, ApiSettings } from "./pricing/ApiSettingsCard";
import { PlanCard } from "./pricing/PlanCard";

export const AdminPricing = () => {
  const [settings, setSettings] = useState<Record<string, PricingPlan>>(defaultPlans);
  const [apiSettings, setApiSettings] = useState<ApiSettings>({
    api_enabled: false,
    api_requests_limit: 0,
    api_key_expiry_days: 30
  });
  const { toast } = useToast();

  useEffect(() => {
    loadPricingSettings();
  }, []);

  const loadPricingSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("content, api_enabled, api_requests_limit, api_key_expiry_days")
        .eq("type", "pricing")
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data?.content) {
        const content = data.content as unknown as Record<string, PricingPlan>;
        if (Object.keys(content).length > 0) {
          setSettings(content);
        }
      }

      if (data) {
        setApiSettings({
          api_enabled: data.api_enabled || false,
          api_requests_limit: data.api_requests_limit || 0,
          api_key_expiry_days: data.api_key_expiry_days || 30
        });
      }
    } catch (err: any) {
      toast({
        title: "Erro ao carregar configurações",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    try {
      const { data: existingData } = await supabase
        .from("admin_settings")
        .select("id")
        .eq("type", "pricing")
        .maybeSingle();

      let error;
      
      if (existingData) {
        const { error: updateError } = await supabase
          .from("admin_settings")
          .update({
            title: "Pricing Configuration",
            content: settings as unknown as Json,
            api_enabled: apiSettings.api_enabled,
            api_requests_limit: apiSettings.api_requests_limit,
            api_key_expiry_days: apiSettings.api_key_expiry_days,
            updated_at: new Date().toISOString()
          })
          .eq("type", "pricing");
        
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("admin_settings")
          .insert({
            type: "pricing",
            title: "Pricing Configuration",
            content: settings as unknown as Json,
            api_enabled: apiSettings.api_enabled,
            api_requests_limit: apiSettings.api_requests_limit,
            api_key_expiry_days: apiSettings.api_key_expiry_days
          });
        
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "Configurações salvas com sucesso",
      });
    } catch (err: any) {
      toast({
        title: "Erro ao salvar configurações",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const updatePlanField = (plan: string, field: keyof PricingPlan, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [plan]: { 
        ...prev[plan], 
        [field]: field === 'receipts' ? Number(value) : value 
      }
    }));
  };

  const updatePlanFeature = (plan: string, index: number, feature: string) => {
    const newFeatures = [...settings[plan].features];
    newFeatures[index] = feature;
    
    setSettings(prev => ({
      ...prev,
      [plan]: { ...prev[plan], features: newFeatures }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Preços e Planos</h2>
        <Button onClick={handleSave}>Salvar Alterações</Button>
      </div>

      <ApiSettingsCard 
        settings={apiSettings}
        onChange={setApiSettings}
      />

      <Separator className="my-6" />

      <div className="grid gap-6 md:grid-cols-3">
        {Object.entries(settings).map(([plan, data]) => (
          <PlanCard
            key={plan}
            plan={plan}
            data={data}
            onUpdate={updatePlanField}
            onFeatureUpdate={updatePlanFeature}
          />
        ))}
      </div>
    </div>
  );
};