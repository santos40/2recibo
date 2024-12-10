import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { UserTable } from "./users/UserTable";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useUserManagement } from "@/hooks/useUserManagement";

export const AdminUsers = () => {
  const { toast } = useToast();
  const { isAdmin } = useAdminStatus();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      if (!isAdmin) {
        console.log("User is not admin, skipping fetch");
        return [];
      }

      try {
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select(`
            *,
            user_subscriptions (
              plan_type,
              active
            )
          `)
          .order('created_at', { ascending: true });

        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
          toast({
            title: "Erro ao carregar usuários",
            description: profilesError.message,
            variant: "destructive",
          });
          throw profilesError;
        }

        const { data: receiptsData, error: receiptsError } = await supabase
          .from("receipts")
          .select('user_id, id');

        if (receiptsError) {
          console.error("Error fetching receipts:", receiptsError);
          toast({
            title: "Erro ao carregar recibos",
            description: receiptsError.message,
            variant: "destructive",
          });
        }

        const receiptCountsByUser = receiptsData?.reduce((acc: {[key: string]: number}, receipt) => {
          acc[receipt.user_id] = (acc[receipt.user_id] || 0) + 1;
          return acc;
        }, {}) || {};

        const combinedUsers = (profilesData || []).map(profile => ({
          ...profile,
          subscription: profile.user_subscriptions?.[0] || null,
          receiptsCount: receiptCountsByUser[profile.id] || 0
        }));

        return combinedUsers;
      } catch (error: any) {
        console.error("Error in queryFn:", error);
        toast({
          title: "Erro ao carregar usuários",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
    },
    enabled: isAdmin,
  });

  const {
    loading,
    handleDelete,
    handleToggleActive,
    handleStatusChange,
    handlePlanChange,
  } = useUserManagement(isAdmin, refetch);

  if (!isAdmin) {
    return (
      <div className="text-center p-8 text-gray-500">
        Você não tem permissão para acessar esta página
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Usuários Cadastrados</h2>
      </div>

      <UserTable
        users={users}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
        onPlanChange={handlePlanChange}
        onStatusChange={handleStatusChange}
        loading={loading}
      />
    </div>
  );
};