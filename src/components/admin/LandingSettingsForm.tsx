import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HeroForm } from "./landing/HeroForm";
import { Feature, LandingContent } from "./landing/types";
import { FeaturesSection } from "./landing/FeaturesSection";
import { CTAForm } from "./landing/CTAForm";
import type { Json } from "@/integrations/supabase/types";

const defaultContent: LandingContent = {
  heroTitle: "Recibos Autenticados com QR Code",
  heroDescription: "Sistema completo para gerenciamento de recibos autenticados com verificação via QR Code.",
  heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  features: [
    {
      title: "Autenticação via QR Code",
      description: "Verifique a autenticidade dos recibos instantaneamente através do QR Code.",
      image: "https://images.unsplash.com/photo-1598291286794-d417e2685f85",
      icon: "QrCode"
    },
    {
      title: "Verificação Simples",
      description: "Processo fácil e rápido para verificar a autenticidade dos seus recibos.",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
      icon: "CheckCircle"
    },
    {
      title: "Segurança Garantida",
      description: "Sistema seguro e confiável para seus documentos importantes.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      icon: "Shield"
    },
    {
      title: "Recibos Profissionais",
      description: "Crie recibos com aparência profissional e autenticação digital.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      icon: "FileCheck"
    },
    {
      title: "Assinatura Digital",
      description: "Adicione sua assinatura digital para maior segurança e autenticidade.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      icon: "PenTool"
    },
    {
      title: "Histórico Verificável",
      description: "Mantenha um histórico completo e verificável de todos os seus recibos.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      icon: "History"
    }
  ],
  ctaTitle: "Assine já e tenha recibos autenticados",
  ctaDescription: "Comece agora a emitir recibos com autenticação via QR Code"
};

export const LandingSettingsForm = () => {
  const [content, setContent] = useState<LandingContent>(defaultContent);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data, error } = await supabase
      .from("admin_settings")
      .select("content")
      .eq("type", "landing")
      .single();

    if (error) {
      toast({
        title: "Erro ao carregar configurações",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (data?.content) {
      setContent(data.content as unknown as LandingContent);
    }
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("admin_settings")
      .upsert({
        type: "landing",
        title: "Landing Page Settings",
        content: content as unknown as Json
      });

    if (error) {
      toast({
        title: "Erro ao salvar configurações",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Configurações salvas com sucesso",
    });
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const addFeature = () => {
    setContent(prev => ({
      ...prev,
      features: [...prev.features, {
        title: "",
        description: "",
        image: "",
        icon: "Receipt"
      }]
    }));
  };

  const removeFeature = (index: number) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateHero = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações da Landing Page</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <HeroForm
          heroTitle={content.heroTitle}
          heroDescription={content.heroDescription}
          heroImage={content.heroImage}
          updateHero={updateHero}
        />

        <FeaturesSection
          features={content.features}
          updateFeature={updateFeature}
          addFeature={addFeature}
          removeFeature={removeFeature}
        />

        <CTAForm
          ctaTitle={content.ctaTitle}
          ctaDescription={content.ctaDescription}
          updateHero={updateHero}
        />

        <Button onClick={handleSave}>Salvar Alterações</Button>
      </CardContent>
    </Card>
  );
};