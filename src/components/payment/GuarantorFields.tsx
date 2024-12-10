import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GuarantorFieldsProps {
  guarantorName: string;
  guarantorDocument: string;
  guarantorAddress: string;
  onChange: (field: string, value: string) => void;
}

export const GuarantorFields = ({
  guarantorName,
  guarantorDocument,
  guarantorAddress,
  onChange,
}: GuarantorFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="guarantorName">Nome do Avalista</Label>
        <Input
          id="guarantorName"
          value={guarantorName}
          onChange={(e) => onChange("guarantorName", e.target.value)}
          placeholder="Nome completo do avalista"
        />
      </div>

      <div>
        <Label htmlFor="guarantorDocument">CPF/CNPJ do Avalista</Label>
        <Input
          id="guarantorDocument"
          value={guarantorDocument}
          onChange={(e) => onChange("guarantorDocument", e.target.value)}
          placeholder="CPF ou CNPJ do avalista"
        />
      </div>

      <div>
        <Label htmlFor="guarantorAddress">Endereço do Avalista</Label>
        <Input
          id="guarantorAddress"
          value={guarantorAddress}
          onChange={(e) => onChange("guarantorAddress", e.target.value)}
          placeholder="Endereço completo do avalista"
        />
      </div>
    </div>
  );
};