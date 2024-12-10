import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) throw signInError;

      if (!signInData.user) {
        throw new Error("Erro ao fazer login");
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", signInData.user.id)
        .maybeSingle();

      if (adminError) {
        console.error("Admin check error:", adminError);
        await supabase.auth.signOut();
        throw new Error("Erro ao verificar permissões de administrador");
      }

      if (!adminData) {
        await supabase.auth.signOut();
        throw new Error("Acesso não autorizado. Apenas administradores podem entrar aqui.");
      }

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo",
      });
      
      navigate("/admin");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Ocorreu um erro ao tentar fazer login",
        variant: "destructive",
      });
      
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-primary/10 rounded-full">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-gray-500 text-center">
            Acesso restrito a administradores
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="bg-white"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="text-center">
          <Button
            variant="link"
            className="text-sm text-gray-500"
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Voltar para login de usuário
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;