import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { TemplatePreview } from "./TemplatePreview";

export interface TemplateConfig {
  template: string;
  logo?: string;
}

interface ReceiptTemplateProps {
  onChange: (config: TemplateConfig) => void;
  initialLogo?: string | null;
  showLogoMessage?: boolean;
}

export const ReceiptTemplate = ({ onChange, initialLogo, showLogoMessage }: ReceiptTemplateProps) => {
  const [template, setTemplate] = useState<string>("modern");
  const [logo, setLogo] = useState<string | undefined>(initialLogo);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  useEffect(() => {
    setLogo(initialLogo);
  }, [initialLogo]);

  const handleTemplateChange = (newTemplate: string) => {
    setTemplate(newTemplate);
    onChange({ template: newTemplate, logo });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
        setLogo(file.name);
        onChange({ template, logo: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold mb-4">Escolha o Template</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <TemplatePreview
            template="modern"
            onClick={() => handleTemplateChange("modern")}
            isSelected={template === "modern"}
          />
          <TemplatePreview
            template="classic"
            onClick={() => handleTemplateChange("classic")}
            isSelected={template === "classic"}
          />
          <TemplatePreview
            template="minimal"
            onClick={() => handleTemplateChange("minimal")}
            isSelected={template === "minimal"}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo" className="text-lg font-semibold">Logo da Empresa</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="cursor-pointer"
        />
        {showLogoMessage && (
          <p className="text-sm text-gray-500">
            Você já tem um logo salvo no seu perfil. Não é necessário fazer upload novamente, 
            a menos que deseje usar um logo diferente para este recibo.
          </p>
        )}
        {previewLogo && (
          <div className="mt-2">
            <img
              src={previewLogo}
              alt="Preview do logo"
              className="max-h-20 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};