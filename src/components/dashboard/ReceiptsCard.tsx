import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";

interface Receipt {
  id: string;
  created_at: string;
  type: string;
  amount: number;
}

export const ReceiptsCard = ({ receipts }: { receipts: Receipt[] }) => {
  const navigate = useNavigate();

  const formatReceiptType = (type: string) => {
    const types: { [key: string]: string } = {
      service: "Recibo de Serviço",
      payment: "Recibo de Pagamento",
      rent: "Recibo de Aluguel",
      sale: "Recibo de Venda",
      donation: "Recibo de Doação",
      promissory: "Nota Promissória",
      voucher: "Vale"
    };
    return types[type] || type;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recibos Gerados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell>
                    {new Date(receipt.created_at).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>{formatReceiptType(receipt.type)}</TableCell>
                  <TableCell>
                    {formatCurrency(receipt.amount)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/verify/${receipt.id}`)}
                    >
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {receipts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Nenhum recibo encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};