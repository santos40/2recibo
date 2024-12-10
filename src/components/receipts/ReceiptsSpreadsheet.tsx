import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface Receipt {
  id: string;
  date: string;
  type: string;
  amount: number;
  payer: string;
  payee: string;
  description?: string;
  verificationUrl?: string;
}

interface ReceiptsSpreadsheetProps {
  receipts: Receipt[];
}

export const ReceiptsSpreadsheet = ({ receipts }: ReceiptsSpreadsheetProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReceipts = receipts.filter((receipt) =>
    Object.values(receipt).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getProtocol = (id: string) => {
    return `${id.slice(0, 3).toUpperCase()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}U`;
  };

  const exportToCSV = () => {
    const headers = ["Data", "Protocolo", "Tipo", "Valor", "Pagador", "Beneficiário", "Descrição", "Link de Verificação"];
    const csvContent = [
      headers.join(","),
      ...filteredReceipts.map((receipt) => [
        new Date(receipt.date).toLocaleDateString("pt-BR"),
        getProtocol(receipt.id),
        receipt.type,
        receipt.amount,
        receipt.payer,
        receipt.payee,
        receipt.description || "",
        receipt.verificationUrl || "",
      ].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "recibos.csv";
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar recibos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Protocolo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Pagador</TableHead>
              <TableHead>Beneficiário</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Verificação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReceipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>
                  {new Date(receipt.date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                    {getProtocol(receipt.id)}
                  </span>
                </TableCell>
                <TableCell>{receipt.type}</TableCell>
                <TableCell>{formatCurrency(receipt.amount)}</TableCell>
                <TableCell>{receipt.payer}</TableCell>
                <TableCell>{receipt.payee}</TableCell>
                <TableCell>{receipt.description}</TableCell>
                <TableCell>
                  {receipt.verificationUrl && (
                    <a
                      href={receipt.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Verificar
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};