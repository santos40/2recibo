import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CTASectionProps {
  title: string;
  description: string;
}

export const CTASection = ({ title, description }: CTASectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-xl text-white/90 mb-8">
          {description}
        </p>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => navigate("/register")}
          className="bg-white text-primary hover:bg-gray-100 font-semibold"
        >
          Começar Gratuitamente
        </Button>
      </div>
    </section>
  );
};