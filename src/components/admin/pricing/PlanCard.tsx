import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PricingPlan } from "@/stores/pricingStore";

interface PlanCardProps {
  plan: string;
  data: PricingPlan;
  onUpdate: (plan: string, field: keyof PricingPlan, value: string | number) => void;
  onFeatureUpdate: (plan: string, index: number, feature: string) => void;
}

export const PlanCard = ({ plan, data, onUpdate, onFeatureUpdate }: PlanCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label>Nome do Plano</Label>
            <Input
              value={data.name}
              onChange={(e) => onUpdate(plan, "name", e.target.value)}
            />
          </div>

          <div>
            <Label>Preço Mensal (R$)</Label>
            <Input
              value={data.price}
              onChange={(e) => onUpdate(plan, "price", e.target.value)}
            />
          </div>

          <div>
            <Label>Limite de Recibos</Label>
            <Input
              type="number"
              value={data.receipts}
              onChange={(e) => onUpdate(plan, "receipts", parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label>Recursos</Label>
            {data.features.map((feature: string, index: number) => (
              <Input
                key={index}
                value={feature}
                onChange={(e) => onFeatureUpdate(plan, index, e.target.value)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};