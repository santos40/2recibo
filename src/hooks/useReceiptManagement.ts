import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ReceiptData } from "@/components/ReceiptForm";

interface UseReceiptManagementProps {
  toast: any;
  setShowUpgradeDialog: (show: boolean) => void;
}

export const useReceiptManagement = ({ toast, setShowUpgradeDialog }: UseReceiptManagementProps) => {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [verificationUrl, setVerificationUrl] = useState<string>("");

  const checkReceiptLimit = async (userId: string) => {
    const { count, error } = await supabase
      .from('receipts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) {
      console.error('Error checking receipt limit:', error);
      return false;
    }

    return count >= 4; // Trial limit of 4 receipts
  };

  const handleFormSubmit = async (data: ReceiptData) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para gerar um recibo.",
        variant: "destructive",
      });
      return;
    }

    const limitReached = await checkReceiptLimit(session.user.id);
    if (limitReached) {
      toast({
        title: "Limite de Recibos Atingido",
        description: "Você atingiu o limite de 4 recibos do período de teste. Ative sua conta para continuar gerando recibos.",
        variant: "destructive",
      });
      setShowUpgradeDialog(true);
      return;
    }

    const newReceiptId = crypto.randomUUID();
    const verificationUrl = `${window.location.origin}/verify/${newReceiptId}`;
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('signature_url')
      .eq('id', session.user.id)
      .maybeSingle();

    const dbData = {
      id: newReceiptId,
      user_id: session.user.id,
      type: data.type,
      amount: parseFloat(data.amount),
      payer: data.payer,
      payer_document: data.payerDocument,
      payee: data.payee,
      description: data.description,
      date: data.date,
      due_date: data.dueDate,
      template: data.template,
      payment_method: data.paymentMethod,
      pix_key: data.pixKey,
      bank_name: data.bankName,
      account_type: data.accountType,
      branch_number: data.branchNumber,
      account_number: data.accountNumber,
    };

    const { error } = await supabase
      .from('receipts')
      .insert(dbData);

    if (error) {
      toast({
        title: "Erro ao salvar recibo",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setVerificationUrl(verificationUrl);
    setReceiptData({ 
      ...data,
      signature: profile?.signature_url 
    });
    
    toast({
      title: "Recibo gerado com sucesso!",
      description: "QR code gerado para verificação futura.",
    });
  };

  return {
    receiptData,
    verificationUrl,
    handleFormSubmit
  };
};