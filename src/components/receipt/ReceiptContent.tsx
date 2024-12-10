import { formatReceiptCurrency, formatDate } from "@/utils/formatters";
import { QRCodeSVG } from "qrcode.react";
import { ReceiptData } from "../ReceiptForm";
import { formatAmountInWords } from "@/utils/numberToWords";

interface ReceiptContentProps {
  data: ReceiptData;
  verificationUrl?: string;
  receiptId?: string;
}

export const ReceiptContent = ({ data, verificationUrl, receiptId }: ReceiptContentProps) => {
  const amount = parseFloat(data.amount.replace(/\./g, '').replace(',', '.')) || 0;
  const amountInWords = formatAmountInWords(data.amount);
  const isVoucher = data.type === "voucher";
  const hasAddress = data.address || data.city || data.state || data.zipCode;
  const documentType = data.payerDocument?.length > 14 ? "CNPJ" : "CPF";
  const siteUrl = "https://onlinerecibo.com.br";
  
  const protocol = receiptId 
    ? `${receiptId.slice(0, 3).toUpperCase()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}U`
    : null;

  const renderPaymentInfo = () => {
    if (data.paymentMethod === "pix" && data.pixKey) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Informações de Pagamento - PIX</h3>
          <p>Chave PIX: {data.pixKey}</p>
        </div>
      );
    }

    if (data.paymentMethod === "transfer" && data.bankName) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Informações Bancárias</h3>
          <p>Banco: {data.bankName}</p>
          <p>Tipo de Conta: {data.accountType === "checking" ? "Corrente" : "Poupança"}</p>
          {data.branchNumber && <p>Agência: {data.branchNumber}</p>}
          {data.accountNumber && <p>Conta: {data.accountNumber}</p>}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4 print:space-y-2">
      {/* Header Section with Logo, Company Info, and Verification QR */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200">
        {/* Left Column: Logo and Company Info */}
        <div className="flex items-start gap-4">
          {data.logo && (
            <img 
              src={data.logo} 
              alt="Logo" 
              className="max-h-16 object-contain"
            />
          )}
          <div className="space-y-1">
            <h2 className="font-heading font-semibold text-lg">
              {data.payee || "Nome do Emissor"}
            </h2>
            {data.payerDocument && (
              <p className="text-sm text-gray-600">
                {documentType}: {data.payerDocument}
              </p>
            )}
            {hasAddress && (
              <div className="text-sm text-gray-600">
                {data.address && <p>{data.address}</p>}
                <p>
                  {data.city && `${data.city}, `}
                  {data.state && `${data.state} `}
                  {data.zipCode && data.zipCode}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Verification QR Code and Protocol */}
        {verificationUrl && (
          <div className="flex flex-col items-center">
            <QRCodeSVG
              value={verificationUrl}
              size={80}
              className="mb-1"
            />
            <p className="text-xs text-gray-500 mb-1">
              Verifique a autenticidade
            </p>
            {protocol && (
              <p className="font-mono text-sm font-bold bg-gray-100 px-2 py-1 rounded">
                Protocolo: {protocol}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Receipt Title and Amount */}
      <div className="text-center">
        <h1 className="text-xl font-heading font-bold">
          {isVoucher ? "VALE" : "RECIBO DE PAGAMENTO"}
        </h1>
        <div className="text-2xl font-bold mt-2 text-primary">
          {formatReceiptCurrency(amount)}
        </div>
      </div>

      {/* Receipt Content */}
      <div className="space-y-4 print:space-y-2">
        <p className="leading-relaxed text-base">
          {isVoucher ? (
            <>
              Eu, <span className="font-semibold">{data.payer}</span>
              {data.payerDocument && (
                <span className="text-sm text-gray-600">
                  {" "}({documentType}: {data.payerDocument})
                </span>
              )},
              me comprometo a pagar a importância de {formatReceiptCurrency(amount)} ({amountInWords})
              para <span className="font-semibold">{data.payee}</span>
              {data.description && ` referente a ${data.description}`}.
            </>
          ) : (
            <>
              Recebi(emos) de <span className="font-semibold">{data.payer}</span>
              {data.payerDocument && (
                <span className="text-sm text-gray-600">
                  {" "}({documentType}: {data.payerDocument})
                </span>
              )},
              a importância de {formatReceiptCurrency(amount)} ({amountInWords})
              {data.description && ` referente a ${data.description}`}.
            </>
          )}
        </p>

        {renderPaymentInfo()}

        <div className="flex justify-between items-center mt-4">
          <p>
            Para maior clareza firmo(amos) o presente {isVoucher ? "vale" : "recibo"} para todos os fins.
          </p>
          <p>{formatDate(data.date)}</p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-300">
          <div className="text-center">
            {data.signature && (
              <div className="mb-2">
                <img 
                  src={data.signature} 
                  alt="Assinatura Digital" 
                  className="max-h-12 object-contain mx-auto"
                />
              </div>
            )}
            <p>_____________________________________________</p>
            <p className="mt-1">{isVoucher ? data.payer : data.payee}</p>
          </div>
        </div>
      </div>
    </div>
  );
};