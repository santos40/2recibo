import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface MonthlyStatsProps {
  monthlyTotals: {
    month: string;
    total: number;
    count: number;
  }[];
}

export const MonthlyStats = ({ monthlyTotals }: MonthlyStatsProps) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Calculate totals
    const totalSum = monthlyTotals.reduce((sum, month) => sum + month.total, 0);
    const totalReceipts = monthlyTotals.reduce((sum, month) => sum + month.count, 0);

    const html = `
      <html>
        <head>
          <title>Relatório de Faturamento Mensal</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .monthly-item { 
              display: flex; 
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .total {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #000;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Relatório de Faturamento Mensal</h1>
            <p>Data de impressão: ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          ${monthlyTotals.map(month => `
            <div class="monthly-item">
              <div>
                <span>${month.month}</span>
                <span style="margin-left: 10px; color: #666;">(${month.count} recibos)</span>
              </div>
              <span>${formatCurrency(month.total)}</span>
            </div>
          `).join('')}
          <div class="total">
            <div class="monthly-item">
              <div>Total Geral (${totalReceipts} recibos)</div>
              <span>${formatCurrency(totalSum)}</span>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Totais Mensais</CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrint}
          className="print:hidden"
        >
          <PrinterIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monthlyTotals.map((month) => (
            <div key={month.month} className="flex justify-between items-center border-b pb-2">
              <div>
                <span className="font-medium">{month.month}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({month.count} recibos)
                </span>
              </div>
              <span className="font-bold text-primary">
                {formatCurrency(month.total)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};