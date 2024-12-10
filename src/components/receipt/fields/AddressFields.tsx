import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressFieldsProps {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  onChange: (field: string, value: string) => void;
}

export const AddressFields = ({ address, city, state, zipCode, onChange }: AddressFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address">Endereço (opcional)</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Endereço"
            aria-label="Endereço completo"
          />
        </div>
        <div>
          <Label htmlFor="city">Cidade (opcional)</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Cidade"
            aria-label="Cidade"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="state">UF (opcional)</Label>
          <Input
            id="state"
            value={state}
            onChange={(e) => onChange("state", e.target.value)}
            placeholder="UF"
            maxLength={2}
            aria-label="Estado (UF)"
          />
        </div>
        <div>
          <Label htmlFor="zipCode">CEP (opcional)</Label>
          <Input
            id="zipCode"
            value={zipCode}
            onChange={(e) => onChange("zipCode", e.target.value)}
            placeholder="CEP"
            aria-label="CEP"
          />
        </div>
      </div>
    </div>
  );
};