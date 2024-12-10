import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BankAccountFieldsProps {
  accountType: string;
  branchNumber: string;
  accountNumber: string;
  onChange: (field: string, value: string) => void;
}

export const BankAccountFields = ({ 
  accountType, 
  branchNumber,
  accountNumber, 
  onChange 
}: BankAccountFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Tipo de Conta</Label>
        <RadioGroup
          value={accountType}
          onValueChange={(value) => onChange("accountType", value)}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="checking" id="checking" />
            <Label htmlFor="checking">Corrente</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="savings" id="savings" />
            <Label htmlFor="savings">Poupança</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="branchNumber">Agência</Label>
        <Input
          type="text"
          id="branchNumber"
          value={branchNumber}
          onChange={(e) => onChange("branchNumber", e.target.value)}
          placeholder="Digite o número da agência"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="accountNumber">Número da Conta</Label>
        <Input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => onChange("accountNumber", e.target.value)}
          placeholder="Digite o número da conta"
          className="mt-1"
        />
      </div>
    </div>
  );
};