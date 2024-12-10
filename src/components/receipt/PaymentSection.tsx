import { PaymentMethodFields } from "../payment/PaymentMethodFields";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReceiptData } from "../ReceiptForm";

interface PaymentSectionProps {
  formData: ReceiptData;
  onChange: (field: keyof ReceiptData, value: string) => void;
}

export const PaymentSection = ({ formData, onChange }: PaymentSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
        <Select
          value={formData.paymentMethod}
          onValueChange={(value) => onChange("paymentMethod", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a forma de pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pix">PIX</SelectItem>
            <SelectItem value="transfer">Transferência Bancária</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PaymentMethodFields
        paymentMethod={formData.paymentMethod}
        pixKey={formData.pixKey}
        bankName={formData.bankName}
        accountType={formData.accountType}
        branchNumber={formData.branchNumber}
        accountNumber={formData.accountNumber}
        onChange={onChange}
      />
    </div>
  );
};