import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { UserPlanSelect } from "./UserPlanSelect";
import { UserData } from "./types";
import { 
  Trash2, 
  Receipt, 
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface UserTableProps {
  users: UserData[];
  onDelete: (userId: string) => void;
  onToggleActive: (userId: string, currentStatus: boolean) => void;
  onPlanChange: (userId: string, plan: string) => void;
  onStatusChange: (userId: string, status: string) => void;
  loading?: boolean;
}

export const UserTable = ({ 
  users, 
  onDelete, 
  onToggleActive, 
  onPlanChange,
  onStatusChange,
  loading = false
}: UserTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="text-center p-8 text-gray-500">
        Nenhum usuário encontrado
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Recibos Gerados</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentPageData().map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name || "Não informado"}</TableCell>
                <TableCell>{user.email || "Não informado"}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === 'active' ? 'success' : 'secondary'}
                    className="cursor-pointer"
                    onClick={() => onStatusChange(user.id, user.status)}
                  >
                    {user.status === 'active' ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Ativo
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Pendente
                      </div>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.is_active}
                    onCheckedChange={() => onToggleActive(user.id, user.is_active)}
                  />
                </TableCell>
                <TableCell>
                  <UserPlanSelect
                    currentPlan={user.subscription?.plan_type || "start"}
                    onChange={(plan) => onPlanChange(user.id, plan)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                    {user.receiptsCount || 0}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.subscription?.active ? "success" : "destructive"}>
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      {user.subscription?.active ? "Pago" : "Não Pago"}
                    </div>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};