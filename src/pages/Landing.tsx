import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TrialBanner } from "@/components/banners/TrialBanner";
import { LandingContent } from "@/components/admin/landing/types";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { CTASection } from "@/components/landing/CTASection";
import { Skeleton } from "@/components/ui/skeleton";

const defaultContent: LandingContent = {
  heroTitle: "Recibos Autenticados com QR Code",
  heroDescription: "Sistema completo para gerenciamento de recibos autenticados com verificação via QR Code.",
  heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  features: [
    {
      title: "Autenticação via QR Code",
      description: "Verifique a autenticidade dos recibos instantaneamente através do QR Code.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      icon: "QrCode"
    },
    {
      title: "Verificação Autenticada",
      description: "Garanta a autenticidade dos seus recibos com nossa tecnologia avançada de verificação QR Code.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      icon: "Shield"
    },
    {
      title: "Segurança Garantida",
      description: "Sistema seguro e confiável para seus documentos importantes.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      icon: "Shield"
    },
    {
      title: "Recibos Profissionais",
      description: "Crie recibos com aparência profissional e autenticação digital.",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07",
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

const Landing = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<LandingContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🏠 Landing page mounted');
    const initializePage = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          loadLandingContent(),
          checkAuthStatus()
        ]);
      } catch (err) {
        console.error('Error initializing landing page:', err);
        setError('Failed to load page content');
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
    return () => {
      console.log('🏠 Landing page unmounted');
    };
  }, []);

  const checkAuthStatus = async () => {
    console.log('🔒 Checking auth status...');
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      console.log('✅ User is authenticated, redirecting to dashboard');
      navigate('/dashboard');
    } else {
      console.log('❌ No active session found');
    }
  };

  const loadLandingContent = async () => {
    console.log('📝 Loading landing content...');
    const { data, error } = await supabase
      .from("admin_settings")
      .select("content")
      .eq("type", "landing")
      .single();

    if (error) {
      console.error("❌ Error loading landing content:", error);
      throw error;
    }

    if (data?.content) {
      console.log('✅ Landing content loaded successfully');
      setContent(data.content as unknown as LandingContent);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
        <TrialBanner isLanding />
        <div className="container mx-auto px-4 py-12 space-y-8">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
        <TrialBanner isLanding />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Failed to Load Content</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <TrialBanner isLanding />
      
      <HeroSection 
        title={content.heroTitle}
        description={content.heroDescription}
        image={content.heroImage}
      />

      <FeaturesSection features={content.features} />

      <CTASection 
        title={content.ctaTitle}
        description={content.ctaDescription}
      />
    </div>
  );
};

export default Landing;