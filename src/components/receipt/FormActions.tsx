import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onPreview: () => void;
  formType: string;
}

export const FormActions = ({ onPreview, formType }: FormActionsProps) => {
  const getFormTitle = () => {
    switch (formType) {
      case "promissory":
        return "Nota Promissória";
      case "voucher":
        return "Vale";
      default:
        return "Recibo";
    }
  };

  return (
    <div className="flex gap-4">
      <Button 
        type="button" 
        variant="outline" 
        className="w-full"
        onClick={onPreview}
        aria-label="Visualizar recibo antes de gerar"
      >
        Visualizar Recibo
      </Button>
      <Button 
        type="submit" 
        className="w-full"
        aria-label={`Gerar ${getFormTitle()}`}
      >
        Gerar {getFormTitle()}
      </Button>
    </div>
  );
};