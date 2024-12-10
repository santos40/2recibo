import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt, CreditCard, DollarSign, ArrowUpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";

interface StatsDisplayProps {
  planType: string | null;
  receiptCount: number;
  totalAmount: number;
  remainingReceipts: number;
}

export const StatsDisplay = ({ planType, receiptCount, totalAmount, remainingReceipts }: StatsDisplayProps) => {
  const navigate = useNavigate();
  const planLimits = {
    start: 5,
    gold: 15,
    supergold: 50
  };

  const getPlanLimit = (plan: string | null) => {
    return plan ? planLimits[plan as keyof typeof planLimits] || 0 : 0;
  };

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3 flex-1">
              <div className="rounded-lg bg-blue-100 p-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">Plano Ativo</p>
                <p className="text-xl font-bold truncate">
                  {planType ? planType.toUpperCase() : "Nenhum"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => navigate("/prices")}
            >
              <ArrowUpCircle className="h-4 w-4 mr-1" />
              Upgrade
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-green-100 p-2">
              <Receipt className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground">Recibos</p>
              <p className="text-xl font-bold">
                {remainingReceipts} / {getPlanLimit(planType)}
              </p>
              <p className="text-xs text-muted-foreground">
                {receiptCount} recibos criados
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-yellow-100 p-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <p className="text-xl font-bold truncate">
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};