import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
}

export const HeroSection = ({ title, description, image }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")}
              className="bg-primary hover:bg-primary/90 font-semibold w-full sm:w-auto"
            >
              Explore Agora
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/prices")}
              className="border-primary text-primary hover:bg-primary/10 font-semibold w-full sm:w-auto"
            >
              Ver Preços
            </Button>
          </div>
        </div>
        <div className="relative mt-8 md:mt-0">
          <img
            src={image}
            alt="Sistema de Recibos Autenticados"
            className="rounded-lg shadow-2xl object-cover h-[300px] md:h-[400px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};