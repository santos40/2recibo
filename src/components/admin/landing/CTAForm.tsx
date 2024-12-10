import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CTAFormProps {
  ctaTitle: string;
  ctaDescription: string;
  updateHero: (field: string, value: string) => void;
}

export const CTAForm = ({ ctaTitle, ctaDescription, updateHero }: CTAFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Título CTA</Label>
        <Input
          value={ctaTitle}
          onChange={(e) => updateHero("ctaTitle", e.target.value)}
        />
      </div>

      <div>
        <Label>Descrição CTA</Label>
        <Textarea
          value={ctaDescription}
          onChange={(e) => updateHero("ctaDescription", e.target.value)}
        />
      </div>
    </div>
  );
};