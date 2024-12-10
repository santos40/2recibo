import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Receipt } from "@/components/Receipt";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from "lucide-react";
import type { ReceiptData } from "@/components/ReceiptForm";

interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

const transformReceiptData = async (data: any): Promise<ReceiptData> => {
  // Fetch user profile separately
  const { data: profile } = await supabase
    .from('profiles')
    .select('signature_url, logo_url, company_name, company_info, website_url, social_media_links')
    .eq('id', data.user_id)
    .single();

  // Ensure social media links are properly typed
  const socialMediaLinks: SocialMediaLinks = profile?.social_media_links as SocialMediaLinks || {};

  return {
    type: data.type,
    amount: data.amount.toString(),
    payer: data.payer,
    payerDocument: data.payer_document || "",
    payee: data.payee,
    description: data.description || "",
    date: data.date,
    dueDate: data.due_date || "",
    template: data.template,
    logo: profile?.logo_url || "",
    signature: profile?.signature_url || "",
    paymentMethod: data.payment_method,
    pixKey: data.pix_key,
    bankName: data.bank_name,
    accountType: data.account_type,
    branchNumber: data.branch_number,
    accountNumber: data.account_number,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zip_code,
    companyName: profile?.company_name,
    companyInfo: profile?.company_info,
    websiteUrl: profile?.website_url,
    socialMediaLinks,
  };
};

const Verify = () => {
  const { id } = useParams();

  const { data: receipt, isLoading, error } = useQuery({
    queryKey: ['receipt', id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID do recibo não fornecido");
      }

      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Erro ao buscar recibo:", error);
        throw error;
      }

      if (!data) {
        throw new Error("Recibo não encontrado");
      }

      return transformReceiptData(data);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </Card>
        </div>
      </div>
    );
  }

  if (error || !receipt) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Recibo não encontrado</h1>
            <p className="text-gray-600">
              Não foi possível encontrar o recibo solicitado. Verifique se o link está correto.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const verificationUrl = `${window.location.origin}/verify/${id}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">Recibo Verificado</h1>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 text-lg">
              Este é um recibo autêntico gerado em nossa plataforma.
            </p>
            <p className="text-gray-500">
              Verificado por{" "}
              <a 
                href="https://onlinerecibo.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                onlinerecibo.com.br
              </a>
            </p>
          </div>
        </Card>
        <Receipt 
          data={receipt} 
          verificationUrl={verificationUrl}
        />
      </div>
    </div>
  );
};

export default Verify;