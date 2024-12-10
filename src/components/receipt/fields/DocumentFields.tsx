import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

interface DocumentFieldsProps {
  payer: string;
  payerDocument: string;
  onChange: (field: string, value: string) => void;
}

export const DocumentFields = ({ payer, payerDocument, onChange }: DocumentFieldsProps) => {
  const [documentType, setDocumentType] = useState<"cpf" | "cnpj">("cpf");

  const formatDocument = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (documentType === "cpf") {
      const cpf = cleanValue.slice(0, 11);
      if (cpf.length <= 3) return cpf;
      if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2');
      if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else {
      const cnpj = cleanValue.slice(0, 14);
      if (cnpj.length <= 2) return cnpj;
      if (cnpj.length <= 5) return cnpj.replace(/(\d{2})(\d{0,3})/, '$1.$2');
      if (cnpj.length <= 8) return cnpj.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
      if (cnpj.length <= 12) return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
      return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="payer">Pagador</Label>
        <Input
          id="payer"
          value={payer}
          onChange={(e) => onChange("payer", e.target.value)}
          placeholder="Nome do pagador"
          aria-required="true"
        />
      </div>

      <div className="space-y-2">
        <Label>Tipo de Documento do Pagador</Label>
        <RadioGroup
          defaultValue="cpf"
          className="flex items-center space-x-4"
          onValueChange={(value) => setDocumentType(value as "cpf" | "cnpj")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cpf" id="cpf" />
            <Label htmlFor="cpf">CPF</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cnpj" id="cnpj" />
            <Label htmlFor="cnpj">CNPJ</Label>
          </div>
        </RadioGroup>
        <Input
          id="payerDocument"
          value={payerDocument}
          onChange={(e) => onChange("payerDocument", formatDocument(e.target.value))}
          placeholder={documentType === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"}
          maxLength={documentType === "cpf" ? 14 : 18}
          aria-label={`${documentType.toUpperCase()} do pagador`}
        />
      </div>
    </div>
  );
};