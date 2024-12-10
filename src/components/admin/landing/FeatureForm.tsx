import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Feature } from "./types";

interface FeatureFormProps {
  feature: Feature;
  index: number;
  updateFeature: (index: number, field: keyof Feature, value: string) => void;
  removeFeature: (index: number) => void;
}

export const FeatureForm = ({
  feature,
  index,
  updateFeature,
  removeFeature
}: FeatureFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Título da Feature</Label>
        <Input
          value={feature.title}
          onChange={(e) => updateFeature(index, "title", e.target.value)}
        />
      </div>

      <div>
        <Label>Descrição da Feature</Label>
        <Textarea
          value={feature.description}
          onChange={(e) => updateFeature(index, "description", e.target.value)}
        />
      </div>

      <div>
        <Label>Imagem da Feature (URL)</Label>
        <Input
          value={feature.image}
          onChange={(e) => updateFeature(index, "image", e.target.value)}
        />
      </div>

      <div>
        <Label>Ícone da Feature</Label>
        <Input
          value={feature.icon}
          onChange={(e) => updateFeature(index, "icon", e.target.value)}
        />
      </div>

      <Button 
        onClick={() => removeFeature(index)}
        variant="destructive"
        size="sm"
      >
        Remover Feature
      </Button>
    </div>
  );
};