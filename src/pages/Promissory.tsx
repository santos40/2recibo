import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Promissory = () => {
  const [receipts, setReceipts] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPromissoryNotes();
  }, []);

  const fetchPromissoryNotes = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const { data, error } = await supabase
      .from("receipts")
      .select("*")
      .eq("user_id", session.session.user.id)
      .eq("type", "promissory")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar promissórias",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setReceipts(data || []);
  };

  const handleNewPromissory = () => {
    navigate("/?type=promissory");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Promissórias</h1>
        <Button onClick={handleNewPromissory}>Nova Promissória</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Pagador</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receipts.map((receipt: any) => (
              <TableRow key={receipt.id}>
                <TableCell>
                  {new Date(receipt.date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>{receipt.payer}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(receipt.amount)}
                </TableCell>
                <TableCell>
                  {receipt.due_date
                    ? new Date(receipt.due_date).toLocaleDateString("pt-BR")
                    : "-"}
                </TableCell>
                <TableCell>
                  {new Date(receipt.due_date) > new Date()
                    ? "Em aberto"
                    : "Vencida"}
                </TableCell>
              </TableRow>
            ))}
            {receipts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Nenhuma promissória encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Promissory;