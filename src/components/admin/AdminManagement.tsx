import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AdminManagement = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, create the user in auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Add the user to admin_users table with ON CONFLICT DO NOTHING
        const { error: adminError } = await supabase
          .from("admin_users")
          .insert([{ id: authData.user.id }])
          .select()
          .single();

        if (adminError) throw adminError;

        toast({
          title: "Administrador criado com sucesso",
          description: "Um email de confirmação foi enviado para o novo administrador.",
        });

        // Clear the form
        setEmail("");
        setPassword("");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao criar administrador",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Adicionar Novo Administrador</h2>
      
      <form onSubmit={handleCreateAdmin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email do Administrador</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@exemplo.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha forte"
            required
            minLength={6}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar Administrador"}
        </Button>
      </form>
    </Card>
  );
};