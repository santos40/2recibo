import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface LogoUploadProps {
  logoUrl: string | null;
  onProfileUpdate: () => void;
}

export const LogoUpload = ({ logoUrl, onProfileUpdate }: LogoUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error("Você precisa estar logado para fazer upload do logo");
      }

      const userId = session.user.id;

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-logo-${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('logos')
        .upload(fileName, file, { 
          upsert: true,
          contentType: file.type 
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      // Update profile with new logo URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          logo_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        throw new Error("Erro ao atualizar o perfil. Por favor, tente novamente.");
      }

      toast({
        title: "Logo atualizado",
        description: "Seu logo foi atualizado com sucesso!",
      });
      
      onProfileUpdate();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Erro ao atualizar logo",
        description: error.message || "Ocorreu um erro ao fazer upload do logo. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Logo</Label>
      {logoUrl && (
        <div className="mb-4">
          <img 
            src={logoUrl} 
            alt="Logo" 
            className="max-h-24 object-contain mx-auto"
          />
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          disabled={uploading}
          className="cursor-pointer"
        />
        {uploading && <Upload className="animate-spin h-4 w-4" />}
      </div>
      <p className="text-sm text-gray-500">
        Este logo será usado automaticamente nos seus recibos
      </p>
    </div>
  );
};