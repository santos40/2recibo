import { GuarantorFields } from "../payment/GuarantorFields";
import { PromissoryFields } from "../payment/PromissoryFields";
import { ReceiptData } from "../ReceiptForm";

interface PromissorySectionProps {
  formData: ReceiptData;
  onChange: (field: keyof ReceiptData, value: string) => void;
}

export const PromissorySection = ({ formData, onChange }: PromissorySectionProps) => {
  return (
    <>
      <GuarantorFields
        guarantorName={formData.guarantorName || ""}
        guarantorDocument={formData.guarantorDocument || ""}
        guarantorAddress={formData.guarantorAddress || ""}
        onChange={onChange}
      />
      <PromissoryFields
        interestRate={formData.interestRate || ""}
        paymentLocation={formData.paymentLocation || ""}
        emissionDate={formData.emissionDate || ""}
        onChange={onChange}
      />
    </>
  );
};