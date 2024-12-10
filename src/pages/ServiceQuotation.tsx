import { QuotationForm } from "@/components/quotation/QuotationForm";

const ServiceQuotation = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Orçamento de Serviços</h1>
      <QuotationForm type="services" />
    </div>
  );
};

export default ServiceQuotation;