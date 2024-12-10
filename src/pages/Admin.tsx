import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminPricing } from "@/components/admin/AdminPricing";
import { AdminFooterPages } from "@/components/admin/AdminFooterPages";
import { AdminForms } from "@/components/admin/AdminForms";
import { AdminManagement } from "@/components/admin/AdminManagement";
import { Users, Receipt, CreditCard, FileText, Settings, Activity, TrendingUp, Layout } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { LandingSettingsForm } from "@/components/admin/LandingSettingsForm";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "users";

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      try {
        const [usersResponse, receiptsResponse, subscriptionsResponse, activeUsersResponse] = await Promise.all([
          supabase.from("profiles").select("*", { count: "exact" }),
          supabase.from("receipts").select("*", { count: "exact" }),
          supabase.from("user_subscriptions").select("*").eq("active", true),
          supabase.from("profiles").select("*", { count: "exact" }).eq("is_active", true),
        ]);

        if (usersResponse.error) throw usersResponse.error;
        if (receiptsResponse.error) throw receiptsResponse.error;
        if (subscriptionsResponse.error) throw subscriptionsResponse.error;
        if (activeUsersResponse.error) throw activeUsersResponse.error;

        return {
          totalUsers: usersResponse.count || 0,
          totalReceipts: receiptsResponse.count || 0,
          activeSubscriptions: subscriptionsResponse.data?.length || 0,
          activeUsers: activeUsersResponse.count || 0,
        };
      } catch (error: any) {
        toast({
          title: "Erro ao carregar estatísticas",
          description: error.message,
          variant: "destructive",
        });
        return {
          totalUsers: 0,
          totalReceipts: 0,
          activeSubscriptions: 0,
          activeUsers: 0,
        };
      }
    },
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin-login");
        return;
      }

      const { data: adminData, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", session.user.id)
        .single();

      if (error || !adminData) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta página",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAdminStatus();
  }, [navigate]);

  if (statsLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                <p className="text-xs text-muted-foreground">Total de usuários registrados</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.activeUsers || 0}</div>
                <p className="text-xs text-muted-foreground">Usuários com status ativo</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recibos Gerados</CardTitle>
                <Receipt className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalReceipts || 0}</div>
                <p className="text-xs text-muted-foreground">Total de recibos emitidos</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assinaturas Ativas</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.activeSubscriptions || 0}</div>
                <p className="text-xs text-muted-foreground">Planos atualmente ativos</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <Tabs defaultValue={defaultTab} className="space-y-4">
              <TabsList className="w-full justify-start bg-gray-100 p-1">
                <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Users className="h-4 w-4" />
                  Usuários
                </TabsTrigger>
                <TabsTrigger value="pricing" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <CreditCard className="h-4 w-4" />
                  Preços e Planos
                </TabsTrigger>
                <TabsTrigger value="footer" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <FileText className="h-4 w-4" />
                  Páginas do Footer
                </TabsTrigger>
                <TabsTrigger value="forms" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Receipt className="h-4 w-4" />
                  Formulários
                </TabsTrigger>
                <TabsTrigger value="landing" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Layout className="h-4 w-4" />
                  Landing Page
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Settings className="h-4 w-4" />
                  Gerenciar Admins
                </TabsTrigger>
              </TabsList>

              <TabsContent value="users">
                <AdminUsers />
              </TabsContent>

              <TabsContent value="pricing">
                <AdminPricing />
              </TabsContent>

              <TabsContent value="footer">
                <AdminFooterPages />
              </TabsContent>

              <TabsContent value="forms">
                <AdminForms />
              </TabsContent>

              <TabsContent value="landing">
                <LandingSettingsForm />
              </TabsContent>

              <TabsContent value="admin">
                <AdminManagement />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
