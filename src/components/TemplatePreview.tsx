import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PreviewProps {
  template: string;
  onClick: () => void;
  isSelected?: boolean;
}

const colorSchemes = {
  blue: {
    primary: "bg-blue-500",
    secondary: "bg-blue-200",
    accent: "bg-blue-100",
  },
  green: {
    primary: "bg-green-500",
    secondary: "bg-green-200",
    accent: "bg-green-100",
  },
  purple: {
    primary: "bg-purple-500",
    secondary: "bg-purple-200",
    accent: "bg-purple-100",
  },
  blackwhite: {
    primary: "bg-black",
    secondary: "bg-gray-300",
    accent: "bg-gray-100",
  },
};

export const TemplatePreview = ({ template, onClick, isSelected }: PreviewProps) => {
  const [selectedColor, setSelectedColor] = useState<keyof typeof colorSchemes>("blue");

  const getTemplateStyles = (template: string) => {
    const styles = {
      modern: `border-2 ${colorSchemes[selectedColor].primary}`,
      classic: `border-2 ${colorSchemes[selectedColor].secondary}`,
      minimal: `border ${colorSchemes[selectedColor].accent}`,
    };
    return styles[template as keyof typeof styles] || styles.modern;
  };

  const getTemplateTitle = (template: string) => {
    const titles = {
      modern: "Moderno",
      classic: "Clássico",
      minimal: "Minimalista",
    };
    return titles[template as keyof typeof titles] || "Moderno";
  };

  return (
    <div className="space-y-4">
      <div 
        onClick={onClick}
        className={`cursor-pointer transition-all transform hover:scale-105 ${isSelected ? 'ring-2 ring-primary' : ''}`}
      >
        <Card className={`w-full h-48 ${getTemplateStyles(template)} relative overflow-hidden`}>
          <div className="p-4">
            <div className={`w-16 h-8 ${colorSchemes[selectedColor].primary} rounded mb-4`} />
            <div className="space-y-2">
              <div className={`w-3/4 h-4 ${colorSchemes[selectedColor].secondary} rounded`} />
              <div className={`w-1/2 h-4 ${colorSchemes[selectedColor].secondary} rounded`} />
              <div className={`w-2/3 h-4 ${colorSchemes[selectedColor].secondary} rounded`} />
            </div>
          </div>
          <div className={`absolute bottom-0 left-0 right-0 p-4 ${colorSchemes[selectedColor].accent} text-center`}>
            {getTemplateTitle(template)}
          </div>
        </Card>
      </div>
      
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant={selectedColor === "blue" ? "default" : "outline"}
          className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedColor("blue");
          }}
        />
        <Button
          size="sm"
          variant={selectedColor === "green" ? "default" : "outline"}
          className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedColor("green");
          }}
        />
        <Button
          size="sm"
          variant={selectedColor === "purple" ? "default" : "outline"}
          className="w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-600"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedColor("purple");
          }}
        />
        <Button
          size="sm"
          variant={selectedColor === "blackwhite" ? "default" : "outline"}
          className="w-8 h-8 rounded-full bg-black hover:bg-gray-800 border-2 border-gray-300"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedColor("blackwhite");
          }}
        />
      </div>
    </div>
  );
};