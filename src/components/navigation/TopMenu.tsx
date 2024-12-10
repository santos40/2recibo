import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { FileText, Receipt, FileSignature, CreditCard, User, FileSpreadsheet, Calculator } from "lucide-react";

interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
  onClick: () => void;
}

interface NavigationItem {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

const TopMenu = () => {
  const navigate = useNavigate();

  const ListItem = ({ className, title, children, icon: Icon, onClick }: ListItemProps) => {
    return (
      <li onClick={onClick} className="list-none">
        <div
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
            className
          )}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onClick();
            }
          }}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </div>
      </li>
    );
  };

  const receiptItems: NavigationItem[] = [
    {
      title: "Gerar Recibo",
      description: "Crie recibos profissionais com verificação digital",
      icon: Receipt,
      path: "/"
    },
    {
      title: "Promissórias",
      description: "Gere notas promissórias com garantia",
      icon: FileSignature,
      path: "/promissory"
    },
    {
      title: "Gerenciar Recibos",
      description: "Visualize e gerencie todos os seus recibos",
      icon: FileSpreadsheet,
      path: "/receipts"
    }
  ];

  const quotationItems: NavigationItem[] = [
    {
      title: "Orçamento de Produtos",
      description: "Gere orçamentos para venda de produtos",
      icon: Calculator,
      path: "/quotations/products"
    },
    {
      title: "Orçamento de Serviços",
      description: "Gere orçamentos para prestação de serviços",
      icon: Calculator,
      path: "/quotations/services"
    }
  ];

  const accountItems: NavigationItem[] = [
    {
      title: "Dashboard",
      description: "Visualize seus recibos e estatísticas",
      icon: FileText,
      path: "/dashboard"
    },
    {
      title: "Perfil",
      description: "Gerencie suas informações e preferências",
      icon: User,
      path: "/dashboard"
    },
    {
      title: "Planos",
      description: "Conheça nossos planos e preços",
      icon: CreditCard,
      path: "/prices"
    }
  ];

  return (
    <NavigationMenu className="max-w-full w-full justify-start px-4 hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recibos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              {receiptItems.map((item) => (
                <ListItem
                  key={item.path}
                  title={item.title}
                  icon={item.icon}
                  onClick={() => navigate(item.path)}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Orçamentos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              {quotationItems.map((item) => (
                <ListItem
                  key={item.path}
                  title={item.title}
                  icon={item.icon}
                  onClick={() => navigate(item.path)}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Minha Conta</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              {accountItems.map((item) => (
                <ListItem
                  key={item.path}
                  title={item.title}
                  icon={item.icon}
                  onClick={() => navigate(item.path)}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default TopMenu;