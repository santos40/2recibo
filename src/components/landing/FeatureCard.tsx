import { LucideIcon } from "lucide-react";
import { iconMap } from "@/utils/iconMap";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export const FeatureCard = ({ title, description, image, icon }: FeatureCardProps) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] as LucideIcon;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover rounded-lg"
        loading="lazy"
      />
    </div>
  );
};