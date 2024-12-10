import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PromissoryFieldsProps {
  interestRate: string;
  paymentLocation: string;
  emissionDate: string;
  onChange: (field: string, value: string) => void;
}

export const PromissoryFields = ({
  interestRate,
  paymentLocation,
  emissionDate,
  onChange,
}: PromissoryFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="interestRate">Taxa de Juros (%)</Label>
        <Input
          id="interestRate"
          type="number"
          step="0.01"
          value={interestRate}
          onChange={(e) => onChange("interestRate", e.target.value)}
          placeholder="0,00"
        />
      </div>

      <div>
        <Label htmlFor="paymentLocation">Local de Pagamento</Label>
        <Input
          id="paymentLocation"
          value={paymentLocation}
          onChange={(e) => onChange("paymentLocation", e.target.value)}
          placeholder="Cidade onde será realizado o pagamento"
        />
      </div>

      <div>
        <Label htmlFor="emissionDate">Data de Emissão</Label>
        <Input
          id="emissionDate"
          type="date"
          value={emissionDate}
          onChange={(e) => onChange("emissionDate", e.target.value)}
        />
      </div>
    </div>
  );
};