import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BankAccountFields } from "./BankAccountFields";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethodFieldsProps {
  paymentMethod: string;
  pixKey?: string;
  bankName?: string;
  accountType?: string;
  branchNumber?: string;
  accountNumber?: string;
  onChange: (field: string, value: string) => void;
}

export const PaymentMethodFields = ({ 
  paymentMethod,
  pixKey,
  bankName,
  accountType,
  branchNumber,
  accountNumber,
  onChange 
}: PaymentMethodFieldsProps) => {
  if (paymentMethod === "pix") {
    return (
      <div>
        <Label htmlFor="pixKey">Chave PIX</Label>
        <Input
          id="pixKey"
          value={pixKey}
          onChange={(e) => onChange("pixKey", e.target.value)}
          placeholder="Email ou Telefone"
        />
      </div>
    );
  }

  if (paymentMethod === "transfer") {
    return (
      <div className="space-y-4">
        <div>
          <Label>Selecione o Banco</Label>
          <RadioGroup
            value={bankName}
            onValueChange={(value) => onChange("bankName", value)}
            className="grid grid-cols-2 gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Itaú" id="itau" />
              <Label htmlFor="itau">Itaú</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Santander" id="santander" />
              <Label htmlFor="santander">Santander</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Caixa Econômica" id="caixa" />
              <Label htmlFor="caixa">Caixa Econômica</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Banco do Brasil" id="bb" />
              <Label htmlFor="bb">Banco do Brasil</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Nubank" id="nubank" />
              <Label htmlFor="nubank">Nubank</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Sicredi" id="sicredi" />
              <Label htmlFor="sicredi">Sicredi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Bradesco" id="bradesco" />
              <Label htmlFor="bradesco">Bradesco</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Outro" id="other" />
              <Label htmlFor="other">Outro</Label>
            </div>
          </RadioGroup>
        </div>

        {bankName === "Outro" && (
          <div>
            <Label htmlFor="bankName">Nome do Banco</Label>
            <Input
              id="bankName"
              value={bankName}
              onChange={(e) => onChange("bankName", e.target.value)}
              placeholder="Digite o nome do banco"
            />
          </div>
        )}

        <BankAccountFields
          accountType={accountType || "checking"}
          branchNumber={branchNumber || ""}
          accountNumber={accountNumber || ""}
          onChange={onChange}
        />
      </div>
    );
  }

  return null;
};