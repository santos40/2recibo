import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { updateUserSubscription } from "@/services/subscriptionService";

export const useUserManagement = (isAdmin: boolean, refetchUsers: () => void) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (userId: string) => {
    if (!isAdmin) {
      toast({
        title: "Erro",
        description: "Você não tem permissão para realizar esta ação",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Delete user subscriptions
      const { error: subscriptionError } = await supabase
        .from("user_subscriptions")
        .delete()
        .eq("user_id", userId);

      if (subscriptionError) {
        console.error("Error deleting user subscriptions:", subscriptionError);
        throw subscriptionError;
      }

      // Delete user receipts
      const { error: receiptsError } = await supabase
        .from("receipts")
        .delete()
        .eq("user_id", userId);

      if (receiptsError) {
        console.error("Error deleting user receipts:", receiptsError);
        throw receiptsError;
      }

      // Delete user profile
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (profileError) {
        console.error("Error deleting user profile:", profileError);
        throw profileError;
      }

      toast({
        title: "Usuário deletado com sucesso",
      });
      
      refetchUsers();
    } catch (error: any) {
      toast({
        title: "Erro ao deletar usuário",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    if (!isAdmin) {
      toast({
        title: "Erro",
        description: "Você não tem permissão para realizar esta ação",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: !currentStatus })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: `Usuário ${!currentStatus ? "ativado" : "desativado"} com sucesso`,
      });
      refetchUsers();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar status do usuário",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, currentStatus: string) => {
    if (!isAdmin) {
      toast({
        title: "Erro",
        description: "Você não tem permissão para realizar esta ação",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ 
          status: currentStatus === 'active' ? 'pending' : 'active',
          is_active: currentStatus === 'pending'
        })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Status atualizado com sucesso",
      });
      refetchUsers();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = async (userId: string, plan: string) => {
    if (!isAdmin) {
      toast({
        title: "Erro",
        description: "Você não tem permissão para realizar esta ação",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await updateUserSubscription(userId, plan);
      
      toast({
        title: "Plano atualizado com sucesso",
      });
      
      refetchUsers();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar plano",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleDelete,
    handleToggleActive,
    handleStatusChange,
    handlePlanChange,
  };
};