import { QuotationForm } from "@/components/quotation/QuotationForm";

const ProductQuotation = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Orçamento de Produtos</h1>
      <QuotationForm type="products" />
    </div>
  );
};

export default ProductQuotation;