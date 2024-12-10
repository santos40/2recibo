import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface HeroFormProps {
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  updateHero: (field: string, value: string) => void;
}

export const HeroForm = ({
  heroTitle,
  heroDescription,
  heroImage,
  updateHero
}: HeroFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Título Principal</Label>
        <Input
          value={heroTitle}
          onChange={(e) => updateHero("heroTitle", e.target.value)}
        />
      </div>

      <div>
        <Label>Descrição Principal</Label>
        <Textarea
          value={heroDescription}
          onChange={(e) => updateHero("heroDescription", e.target.value)}
        />
      </div>

      <div>
        <Label>Imagem Principal (URL)</Label>
        <Input
          value={heroImage}
          onChange={(e) => updateHero("heroImage", e.target.value)}
        />
      </div>
    </div>
  );
};