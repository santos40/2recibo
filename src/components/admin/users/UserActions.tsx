import { Button } from "@/components/ui/button";

interface UserActionsProps {
  onDelete: () => void;
}

export const UserActions = ({ onDelete }: UserActionsProps) => {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={onDelete}
    >
      Deletar
    </Button>
  );
};