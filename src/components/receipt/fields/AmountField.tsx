import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AmountFieldProps {
  amount: string;
  onChange: (field: string, value: string) => void;
}

export const AmountField = ({ amount, onChange }: AmountFieldProps) => {
  const formatCurrency = (value: string) => {
    let numbers = value.replace(/\D/g, '');
    numbers = numbers.padStart(3, '0');
    const amount = parseFloat(numbers) / 100;
    return amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div>
      <Label htmlFor="amount">Valor</Label>
      <Input
        id="amount"
        type="text"
        inputMode="numeric"
        value={amount}
        onChange={(e) => onChange("amount", formatCurrency(e.target.value))}
        placeholder="R$ 0,00"
        aria-required="true"
        aria-label="Valor do recibo"
      />
    </div>
  );
};