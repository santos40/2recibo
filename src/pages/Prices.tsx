import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { defaultPlans, type PricingPlan } from "@/stores/pricingStore";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Prices = () => {
  const [plans, setPlans] = useState<Record<string, PricingPlan>>(defaultPlans);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadPricingPlans();
  }, []);

  const loadPricingPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("content")
        .eq("type", "pricing")
        .maybeSingle();

      if (error) {
        throw error;
      }
      
      if (data?.content) {
        const content = data.content as Record<string, unknown>;
        const typedContent: Record<string, PricingPlan> = {};
        
        Object.entries(content).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            const plan = value as any;
            if (
              typeof plan.name === 'string' &&
              typeof plan.price === 'string' &&
              typeof plan.receipts === 'number' &&
              Array.isArray(plan.features)
            ) {
              typedContent[key] = {
                name: plan.name,
                price: plan.price,
                receipts: plan.receipts,
                features: plan.features.map(f => String(f))
              };
            }
          }
        });

        if (Object.keys(typedContent).length > 0) {
          setPlans(typedContent);
        }
      }
    } catch (err: any) {
      toast({
        title: "Erro ao carregar planos",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handlePlanSelection = (planType: string) => {
    const selectedPlan = plans[planType];
    if (selectedPlan) {
      navigate("/payment", { 
        state: { 
          selectedPlan: planType,
          planDetails: selectedPlan 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold">Planos e Preços</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/register")}>
                Cadastrar
              </Button>
              <Button onClick={() => navigate("/register")}>
                Começar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-8 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(plans).map(([key, plan]) => (
            <Card key={key} className={key === "gold" ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>Ideal para seu negócio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">
                  R$ {plan.price}
                </div>
                <div className="text-lg mb-4 text-muted-foreground">
                  Até {plan.receipts} recibos
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handlePlanSelection(key)}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prices;