import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FeatureForm } from "./FeatureForm";
import { Feature } from "./types";

interface FeaturesSectionProps {
  features: Feature[];
  updateFeature: (index: number, field: keyof Feature, value: string) => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;
}

export const FeaturesSection = ({
  features,
  updateFeature,
  addFeature,
  removeFeature,
}: FeaturesSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Features</Label>
        <Button onClick={addFeature} variant="outline" size="sm">
          Adicionar Feature
        </Button>
      </div>
      {features.map((feature, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <FeatureForm
              feature={feature}
              index={index}
              updateFeature={updateFeature}
              removeFeature={removeFeature}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};