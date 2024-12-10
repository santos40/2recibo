import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ReceiptsCard } from "@/components/dashboard/ReceiptsCard";
import { MonthlyStats } from "@/components/dashboard/MonthlyStats";
import { ReceiptsChart } from "@/components/dashboard/ReceiptsChart";
import { ClientsTable } from "@/components/receipts/ClientsTable";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

const ReceiptsPage = () => {
  const { toast } = useToast();

  const { data: receipts = [] } = useQuery({
    queryKey: ["receipts"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data } = await supabase
        .from("receipts")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      return data || [];
    }
  });

  const monthlyTotals = receipts.reduce((acc: any[], receipt: any) => {
    const date = new Date(receipt.created_at);
    const monthYear = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    
    const existingMonth = acc.find(m => m.month === monthYear);
    if (existingMonth) {
      existingMonth.total += Number(receipt.amount);
      existingMonth.count += 1;
    } else {
      acc.push({
        month: monthYear,
        total: Number(receipt.amount),
        count: 1
      });
    }
    return acc;
  }, []);

  const chartData = monthlyTotals.map(({ month, total }) => ({
    month,
    total
  })).reverse();

  return (
    <div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Recibos</h1>
      
      <div className="grid gap-4 sm:gap-6">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          <MonthlyStats monthlyTotals={monthlyTotals} />
          <ReceiptsChart data={chartData} />
        </div>

        <ClientsTable receipts={receipts} />
        <ReceiptsCard receipts={receipts} />
      </div>
    </div>
  );
};

export default ReceiptsPage;