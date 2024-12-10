import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DocumentFields } from "./fields/DocumentFields";
import { AmountField } from "./fields/AmountField";
import { AddressFields } from "./fields/AddressFields";
import { ReceiptData } from "../ReceiptForm";

interface BasicFieldsProps {
  formData: ReceiptData;
  onChange: (field: keyof ReceiptData, value: string) => void;
}

export const BasicFields = ({ formData, onChange }: BasicFieldsProps) => {
  return (
    <div className="space-y-4" role="group" aria-label="Informações básicas do recibo">
      <div>
        <Label htmlFor="type">Tipo de Documento</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => onChange("type", value)}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="service">Recibo de Serviço</SelectItem>
            <SelectItem value="payment">Recibo de Pagamento</SelectItem>
            <SelectItem value="rent">Recibo de Aluguel</SelectItem>
            <SelectItem value="sale">Recibo de Venda</SelectItem>
            <SelectItem value="donation">Recibo de Doação</SelectItem>
            <SelectItem value="promissory">Nota Promissória</SelectItem>
            <SelectItem value="voucher">Vale</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AmountField 
        amount={formData.amount} 
        onChange={onChange}
      />

      <DocumentFields
        payer={formData.payer}
        payerDocument={formData.payerDocument}
        onChange={onChange}
      />

      <div>
        <Label htmlFor="payee">Beneficiário</Label>
        <Input
          id="payee"
          value={formData.payee}
          onChange={(e) => onChange("payee", e.target.value)}
          placeholder="Nome do beneficiário"
          aria-required="true"
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Descrição do pagamento"
          aria-label="Descrição detalhada do pagamento"
        />
      </div>

      <AddressFields
        address={formData.address || ""}
        city={formData.city || ""}
        state={formData.state || ""}
        zipCode={formData.zipCode || ""}
        onChange={onChange}
      />

      <div>
        <Label htmlFor="date">Data</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => onChange("date", e.target.value)}
          aria-required="true"
        />
      </div>
    </div>
  );
};