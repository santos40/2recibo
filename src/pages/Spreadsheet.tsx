import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ReceiptsSpreadsheet } from "@/components/receipts/ReceiptsSpreadsheet";
import { useToast } from "@/components/ui/use-toast";

const SpreadsheetPage = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          window.location.href = "/";
          return;
        }

        const { data, error } = await supabase
          .from("receipts")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const receiptsWithVerification = data.map(receipt => ({
          ...receipt,
          verificationUrl: `/verify/${receipt.id}`
        }));

        setReceipts(receiptsWithVerification);
      } catch (error) {
        console.error("Error fetching receipts:", error);
        toast({
          title: "Erro ao carregar recibos",
          description: "Não foi possível carregar seus recibos. Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Planilha de Recibos</h1>
      <ReceiptsSpreadsheet receipts={receipts} />
    </div>
  );
};

export default SpreadsheetPage;