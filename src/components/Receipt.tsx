import { ReceiptData } from "./ReceiptForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PrinterIcon, Mail, Share2 } from "lucide-react";
import { ReceiptContent } from "./receipt/ReceiptContent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

interface ReceiptProps {
  data: ReceiptData;
  verificationUrl?: string;
  isPending?: boolean;
  userId?: string;
}

export const Receipt = ({ data, verificationUrl, isPending, userId }: ReceiptProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<{
    logo_url: string | null;
    signature_url: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('logo_url, signature_url')
        .eq('id', userId)
        .single();
      
      if (profile) {
        setProfileData({
          logo_url: profile.logo_url,
          signature_url: profile.signature_url
        });
      }
    };

    fetchProfileData();
  }, [userId]);

  const handlePrint = () => {
    window.print();
  };

  const handleEmailShare = () => {
    if (!verificationUrl) {
      toast({
        title: "Erro ao compartilhar",
        description: "URL de verificação não disponível",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`Recibo - ${data.payee}`);
    const body = encodeURIComponent(
      `Segue o recibo no valor de ${data.amount}\n\n` +
      `Você pode verificar a autenticidade do recibo através do link:\n${verificationUrl}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleWhatsAppShare = () => {
    if (!verificationUrl) {
      toast({
        title: "Erro ao compartilhar",
        description: "URL de verificação não disponível",
        variant: "destructive",
      });
      return;
    }

    const text = encodeURIComponent(
      `Recibo - ${data.payee}\n` +
      `Valor: ${data.amount}\n\n` +
      `Verifique a autenticidade do recibo:\n${verificationUrl}`
    );
    window.open(`https://wa.me/?text=${text}`);
  };

  // Merge profile data with receipt data, prioritizing profile data
  const receiptDataWithProfile = {
    ...data,
    logo: profileData?.logo_url || data.logo || "",
    signature: profileData?.signature_url || data.signature || ""
  };

  return (
    <div className="receipt-container max-w-2xl mx-auto mt-8">
      <Card className="p-8 receipt-shadow print:shadow-none relative">
        <ReceiptContent data={receiptDataWithProfile} verificationUrl={verificationUrl} />

        <div className="mt-8 pt-4 border-t border-gray-300 print:hidden">
          <p className="text-center text-gray-600 mb-4">Compartilhe esse Documento</p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleEmailShare}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleWhatsAppShare}
            >
              <Share2 className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center print:hidden">
        <Button onClick={handlePrint} className="print-button">
          <PrinterIcon className="mr-2 h-4 w-4" />
          Imprimir / Salvar PDF
        </Button>
      </div>
    </div>
  );
};