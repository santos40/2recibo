import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface TrialBannerProps {
  isLanding?: boolean;
  activePlan?: string | null;
}

export const TrialBanner = ({ isLanding, activePlan }: TrialBannerProps) => {
  const navigate = useNavigate();

  if (!isLanding && activePlan) {
    return (
      <div className="bg-green-500 text-white py-2 px-4 text-center animate-fade-in">
        <p className="font-semibold">
          CONTA ATIVA - Plano {activePlan.toUpperCase()}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-primary text-white py-3 px-4 text-center relative overflow-hidden">
      <div className="relative z-10">
        <p className="font-semibold text-lg mb-2">
          GERE 4 RECIBOS GRÁTIS - TESTE NOSSA FERRAMENTA
        </p>
        {isLanding && (
          <Button 
            variant="secondary" 
            onClick={() => navigate("/register")}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Começar Agora
          </Button>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary animate-pulse" />
    </div>
  );
};