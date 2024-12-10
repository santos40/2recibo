import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import SignaturePad from 'react-signature-canvas';
import { AudioInstructions } from "./AudioInstructions";

interface SignatureUploadProps {
  signatureUrl: string | null;
  onProfileUpdate: () => void;
}

export const SignatureUpload = ({ signatureUrl, onProfileUpdate }: SignatureUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const signaturePadRef = useRef<any>();

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSaveSignature = async () => {
    if (!signaturePadRef.current || signaturePadRef.current.isEmpty()) {
      toast({
        title: "Assinatura vazia",
        description: "Por favor, faça sua assinatura antes de salvar",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const dataUrl = signaturePadRef.current.toDataURL();
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      const fileName = `${session.user.id}-signature-${Date.now()}.png`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, blob, {
          contentType: 'image/png',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          signature_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      toast({
        title: "Assinatura salva",
        description: "Sua assinatura foi salva com sucesso!",
      });
      
      onProfileUpdate();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar assinatura",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label>Assinatura Digital</Label>
        <AudioInstructions />
      </div>
      
      {signatureUrl && (
        <div className="mb-4">
          <img 
            src={signatureUrl} 
            alt="Assinatura" 
            className="max-h-24 object-contain mx-auto"
          />
        </div>
      )}
      <div className="border rounded-lg p-2 bg-white">
        <SignaturePad
          ref={signaturePadRef}
          canvasProps={{
            className: "signature-canvas w-full h-40 border border-gray-200 rounded",
          }}
          penColor="rgb(0, 0, 238)"
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={handleClear}
          className="flex-1"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Limpar
        </Button>
        <Button 
          onClick={handleSaveSignature} 
          disabled={uploading}
          className="flex-1"
        >
          {uploading ? (
            <Upload className="animate-spin h-4 w-4 mr-2" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Salvar Assinatura
        </Button>
      </div>
      <p className="text-sm text-gray-500">
        Faça sua assinatura usando o mouse ou touch no campo acima
      </p>
    </div>
  );
};