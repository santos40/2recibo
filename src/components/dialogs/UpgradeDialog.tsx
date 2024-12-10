import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgradeClick: () => void;
}

export const UpgradeDialog = ({ open, onOpenChange, onUpgradeClick }: UpgradeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ative sua Conta</DialogTitle>
          <DialogDescription>
            Você atingiu o limite de recibos do período de teste. 
            Para continuar gerando recibos, ative sua conta agora.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onUpgradeClick}>
            ATIVAR SUA CONTA
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};