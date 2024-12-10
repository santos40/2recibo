import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandingImages } from "@/types/adminSettings";

interface ImageSettingsFormProps {
  registrationImage: string;
  setRegistrationImage: (url: string) => void;
  landingImages: LandingImages;
  updateLandingImage: (key: string, subKey: string | null, value: string) => void;
}

export const ImageSettingsForm = ({
  registrationImage,
  setRegistrationImage,
  landingImages,
  updateLandingImage
}: ImageSettingsFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagens do Sistema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Imagem da Página de Registro</Label>
          <Input
            value={registrationImage}
            onChange={(e) => setRegistrationImage(e.target.value)}
            placeholder="URL da imagem (ex: https://images.unsplash.com/...)"
          />
          <p className="text-sm text-gray-500">
            Insira a URL da imagem que será exibida na página de registro
          </p>
        </div>

        <div className="space-y-4">
          <Label>Imagem Principal da Landing Page</Label>
          <Input
            value={landingImages.heroImage}
            onChange={(e) => updateLandingImage('heroImage', null, e.target.value)}
            placeholder="URL da imagem principal"
          />
        </div>

        <div className="space-y-4">
          <Label>Imagens das Features</Label>
          {Object.entries(landingImages.featureImages).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">{key}</Label>
              <Input
                value={value}
                onChange={(e) => updateLandingImage('featureImages', key, e.target.value)}
                placeholder={`URL da imagem de ${key}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};