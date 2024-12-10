import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  Database,
  LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AdminNavbarProps {
  session: any;
}

const AdminNavbar = ({ session }: AdminNavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado da sua conta",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar desconectar",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="text-xl font-bold text-white hover:bg-gray-800 mr-4 flex items-center gap-2"
            onClick={() => navigate("/admin")}
          >
            <LayoutDashboard className="h-6 w-6" />
            Painel Admin
          </Button>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-800 flex items-center gap-2"
                onClick={() => navigate("/admin")}
              >
                <Database className="h-4 w-4" />
                Dashboard
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-800 flex items-center gap-2"
                onClick={() => navigate("/admin?tab=users")}
              >
                <Users className="h-4 w-4" />
                Usuários
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-800 flex items-center gap-2"
                onClick={() => navigate("/admin?tab=footer")}
              >
                <FileText className="h-4 w-4" />
                Páginas
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-800 flex items-center gap-2"
                onClick={() => navigate("/admin?tab=settings")}
              >
                <Settings className="h-4 w-4" />
                Configurações
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-gray-800 flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;