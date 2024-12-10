import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, UserCircle, Crown, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import TopMenu from "./navigation/TopMenu";

interface NavbarProps {
  isAdmin: boolean;
  session: any;
}

const Navbar = ({ isAdmin, session }: NavbarProps) => {
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

  const NavLinks = () => (
    <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
      {session && (
        <>
          <Button
            variant="ghost"
            className="text-lg font-semibold text-white hover:bg-primary/90 w-full lg:w-auto justify-start lg:justify-center lg:hidden"
            onClick={() => navigate("/")}
          >
            Gerar Recibo
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-primary/90 w-full lg:w-auto justify-start lg:justify-center lg:hidden"
            onClick={() => navigate("/promissory")}
          >
            Promissórias
          </Button>
          {isAdmin && (
            <Button 
              variant="ghost" 
              className="text-white hover:bg-primary/90 w-full lg:w-auto justify-start lg:justify-center"
              onClick={() => navigate("/admin")}
            >
              Admin
            </Button>
          )}
        </>
      )}
    </div>
  );

  const AuthButtons = () => (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {session ? (
        <>
          <Button
            variant="ghost"
            className="flex items-center text-white hover:bg-primary/90 w-full lg:w-auto justify-start lg:justify-center"
            onClick={() => navigate("/dashboard")}
          >
            <UserCircle className="mr-2 h-5 w-5" />
            PERFIL
          </Button>
          <Button 
            variant="secondary" 
            className="bg-white text-primary hover:bg-gray-100 w-full lg:w-auto"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </>
      ) : (
        <>
          <Button 
            variant="ghost" 
            className="bg-orange-500 text-white hover:bg-orange-600 w-full lg:w-auto"
            onClick={() => navigate("/login")}
          >
            Entrar
          </Button>
          <Button
            variant="ghost"
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 w-full lg:w-auto"
            onClick={() => navigate("/admin-login")}
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="bg-primary">
      <div className="flex flex-col h-auto">
        <div className="flex h-16 items-center px-4 container mx-auto">
          <Button
            variant="ghost"
            className="text-xl font-bold text-white hover:bg-primary/90 mr-4 flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <Crown className="h-6 w-6 text-yellow-300" />
            <span className="hidden sm:inline">OnlineRecibo</span>
          </Button>

          {/* Desktop Navigation */}
          {session && <TopMenu />}
          
          <div className="hidden lg:flex ml-auto items-center">
            <AuthButtons />
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-6">
                  <NavLinks />
                  <div className="border-t pt-6">
                    <AuthButtons />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;