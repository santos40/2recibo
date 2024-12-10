import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLocation, Navigate } from "react-router-dom";
import { PricingPlan } from "@/stores/pricingStore";
import { generatePixPayment } from "@/utils/pixPayment";
import { QRCodeSVG } from "qrcode.react";
import { Loader2 } from "lucide-react";

interface LocationState {
  selectedPlan: string;
  planDetails: PricingPlan;
}

const Payment = () => {
  const { toast } = useToast();
  const location = useLocation();
  const state = location.state as LocationState;
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<{
    qrCode: string;
    copyPaste: string;
    expiresAt: string;
  } | null>(null);

  if (!state?.selectedPlan || !state?.planDetails) {
    return <Navigate to="/prices" replace />;
  }

  const handleGeneratePixPayment = async () => {
    try {
      setLoading(true);
      const amount = parseFloat(state.planDetails.price);
      const description = `Assinatura ${state.planDetails.name}`;
      
      const pixResponse = await generatePixPayment(amount, description);
      setPixData(pixResponse);
      
      toast({
        title: "QR Code PIX gerado",
        description: "Escaneie o QR Code ou copie o código PIX para realizar o pagamento.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar pagamento",
        description: "Não foi possível gerar o QR Code PIX. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Código PIX copiado para a área de transferência.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-2">Pagamento do Plano</h1>
      <div className="text-center text-muted-foreground mb-8">
        <p className="font-semibold">{state.planDetails.name}</p>
        <p className="text-xl">R$ {state.planDetails.price}</p>
      </div>
      
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Pagar com PIX</h2>
          
          {!pixData ? (
            <Button
              onClick={handleGeneratePixPayment}
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando PIX...
                </>
              ) : (
                'Gerar QR Code PIX'
              )}
            </Button>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <QRCodeSVG value={pixData.qrCode} size={200} />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Código PIX:</p>
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 p-2 rounded flex-1 break-all">
                    {pixData.copyPaste}
                  </code>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(pixData.copyPaste)}
                  >
                    Copiar
                  </Button>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Este QR Code expira em: {new Date(pixData.expiresAt).toLocaleString()}
              </p>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleGeneratePixPayment}
              >
                Gerar novo código
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Payment;