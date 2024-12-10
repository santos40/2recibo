import { FeatureCard } from "./FeatureCard";
import { Feature } from "@/components/admin/landing/types";

interface FeaturesSectionProps {
  features: Feature[];
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Nossas Funcionalidades
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};