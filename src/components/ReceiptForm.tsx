import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ReceiptTemplate, type TemplateConfig } from "./ReceiptTemplate";
import { BasicFields } from "./receipt/BasicFields";
import { PaymentSection } from "./receipt/PaymentSection";
import { PromissorySection } from "./receipt/PromissorySection";
import { FormActions } from "./receipt/FormActions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Receipt } from "./Receipt";

export type ReceiptData = {
  type: string;
  amount: string;
  payer: string;
  payerDocument: string;
  payee: string;
  description: string;
  date: string;
  dueDate: string;
  template: string;
  logo?: string;
  paymentMethod: string;
  pixKey?: string;
  bankName?: string;
  accountType?: string;
  branchNumber?: string;
  accountNumber?: string;
  guarantorName?: string;
  guarantorDocument?: string;
  guarantorAddress?: string;
  interestRate?: string;
  paymentLocation?: string;
  emissionDate?: string;
  signature?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  companyName?: string; // Added this line
  companyInfo?: string;
  websiteUrl?: string;
  socialMediaLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
};

interface ReceiptFormProps {
  onSubmit: (data: ReceiptData) => void;
}

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const ReceiptForm = ({ onSubmit }: ReceiptFormProps) => {
  const { toast } = useToast();
  const [userLogo, setUserLogo] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const currentDate = getCurrentDate();
  
  const [formData, setFormData] = useState<ReceiptData>({
    type: "service",
    amount: "",
    payer: "",
    payerDocument: "",
    payee: "",
    description: "",
    date: currentDate,
    dueDate: currentDate,
    template: "modern",
    paymentMethod: "pix",
    pixKey: "",
    bankName: "",
    accountType: "checking",
    branchNumber: "",
    accountNumber: "",
    guarantorName: "",
    guarantorDocument: "",
    guarantorAddress: "",
    interestRate: "",
    paymentLocation: "",
    emissionDate: currentDate,
    signature: "",
  });

  useEffect(() => {
    fetchUserLogo();
  }, []);

  const fetchUserLogo = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('logo_url')
      .eq('id', session.user.id)
      .single();

    if (profile?.logo_url) {
      setUserLogo(profile.logo_url);
      setFormData(prev => ({ ...prev, logo: profile.logo_url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.payer || !formData.payee) {
      toast({
        title: "Erro no formulário",
        description: "Por favor preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const dataToSubmit = {
      ...formData,
      date: formData.date || currentDate,
      dueDate: formData.dueDate || currentDate,
      emissionDate: formData.emissionDate || currentDate,
    };

    onSubmit(dataToSubmit);
  };

  const handleChange = (field: keyof ReceiptData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTemplateChange = (config: TemplateConfig) => {
    const logoToUse = config.logo || userLogo;
    setFormData((prev) => ({
      ...prev,
      template: config.template,
      logo: logoToUse,
    }));
  };

  return (
    <>
      <Card className="p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ReceiptTemplate 
            onChange={handleTemplateChange} 
            initialLogo={userLogo}
            showLogoMessage={!!userLogo}
          />
          
          <BasicFields
            formData={formData}
            onChange={handleChange}
          />

          {formData.type === "promissory" && (
            <PromissorySection
              formData={formData}
              onChange={handleChange}
            />
          )}

          <PaymentSection
            formData={formData}
            onChange={handleChange}
          />

          <FormActions 
            onPreview={() => setShowPreview(true)}
            formType={formData.type}
          />
        </form>
      </Card>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Prévia do Recibo</DialogTitle>
          </DialogHeader>
          <Receipt 
            data={formData}
            isPending={true}
          />
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(false)}
            >
              Voltar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
