import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

interface Receipt {
  id: string;
  created_at: string;
  payer: string;
  description: string;
  phone?: string;
  amount: string | number;
}

interface ClientsTableProps {
  receipts: Receipt[];
}

export const ClientsTable = ({ receipts }: ClientsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell>{receipt.payer}</TableCell>
                  <TableCell>{receipt.description}</TableCell>
                  <TableCell>
                    {new Date(receipt.created_at).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>{receipt.phone || "Não informado"}</TableCell>
                  <TableCell>{formatCurrency(receipt.amount)}</TableCell>
                </TableRow>
              ))}
              {receipts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Nenhum cliente encontrado
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