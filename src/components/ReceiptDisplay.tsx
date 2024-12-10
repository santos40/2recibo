import { Receipt } from "@/components/Receipt";
import { Button } from "@/components/ui/button";

interface ReceiptDisplayProps {
  data: any;
  verificationUrl: string;
  isPending: boolean;
  onNewReceipt: () => void;
  userId?: string;
}

export const ReceiptDisplay = ({ 
  data, 
  verificationUrl, 
  isPending, 
  onNewReceipt,
  userId 
}: ReceiptDisplayProps) => {
  return (
    <div>
      <Receipt 
        data={data} 
        verificationUrl={verificationUrl}
        isPending={isPending}
        userId={userId}
      />
      <div className="mt-8 text-center">
        <Button
          variant="link"
          onClick={onNewReceipt}
          className="text-primary hover:underline"
        >
          Criar novo recibo
        </Button>
      </div>
    </div>
  );
};