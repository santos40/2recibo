import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/utils/formatters";

interface ReceiptsChartProps {
  data: {
    month: string;
    total: number;
  }[];
}

export const ReceiptsChart = ({ data }: ReceiptsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução de Recibos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => {
                  if (typeof value === 'number') {
                    const formatted = formatCurrency(value);
                    return formatted.replace('R$', '').trim();
                  }
                  return '';
                }}
              />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  
                  const value = payload[0].value;
                  if (value === undefined || value === null) return null;

                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Mês
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].payload.month}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Total
                          </span>
                          <span className="font-bold">
                            {formatCurrency(Number(value))}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};