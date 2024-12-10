import { Button } from "@/components/ui/button";

interface UserStatusBannerProps {
  status: string;
  onPaymentClick: () => void;
}

export const UserStatusBanner = ({ status, onPaymentClick }: UserStatusBannerProps) => {
  if (status !== 'pending') return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
      <div className="flex">
        <div className="flex-1">
          <p className="text-sm text-yellow-700">
            Sua conta está pendente. Faça o pagamento para remover a marca d'água dos recibos.
          </p>
          <p className="mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPaymentClick}
            >
              Ir para pagamento
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};