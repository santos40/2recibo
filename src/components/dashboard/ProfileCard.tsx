import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LogoUpload } from "./profile/LogoUpload";
import { SignatureUpload } from "./profile/SignatureUpload";
import { ProfileForm } from "./profile/ProfileForm";
import { ProfileInfo } from "./profile/ProfileInfo";
import { CompanyInfoAudio } from "./profile/CompanyInfoAudio";

interface ProfileData {
  name: string | null;
  phone: string | null;
  email: string | null;
  logo_url?: string | null;
  signature_url?: string | null;
  company_name?: string | null;
  company_info?: string | null;
  website_url?: string | null;
  social_media_links?: any;
}

export const ProfileCard = ({ profile, activePlan, onProfileUpdate }: {
  profile: ProfileData | null;
  activePlan: string | null;
  onProfileUpdate: () => void;
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile?.name || "",
    phone: profile?.phone || "",
    email: profile?.email || "",
    companyName: profile?.company_name || "",
    companyInfo: profile?.company_info || "",
    websiteUrl: profile?.website_url || "",
    socialMediaLinks: profile?.social_media_links || {
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  });

  const handleEditSubmit = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        name: editForm.name,
        phone: editForm.phone,
        email: editForm.email,
        company_name: editForm.companyName,
        company_info: editForm.companyInfo,
        website_url: editForm.websiteUrl,
        social_media_links: editForm.socialMediaLinks,
      })
      .eq("id", session.user.id);

    if (error) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso!",
    });
    setIsEditing(false);
    onProfileUpdate();
  };

  // Update form data when profile changes or when entering edit mode
  const handleEditClick = () => {
    setEditForm({
      name: profile?.name || "",
      phone: profile?.phone || "",
      email: profile?.email || "",
      companyName: profile?.company_name || "",
      companyInfo: profile?.company_info || "",
      websiteUrl: profile?.website_url || "",
      socialMediaLinks: profile?.social_media_links || {
        facebook: "",
        instagram: "",
        linkedin: "",
      },
    });
    setIsEditing(true);
  };

  const handleFormChange = (newData: typeof editForm) => {
    setEditForm(newData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Perfil</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => isEditing ? setIsEditing(false) : handleEditClick()}
          >
            {isEditing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <CompanyInfoAudio />
          
          <LogoUpload 
            logoUrl={profile?.logo_url} 
            onProfileUpdate={onProfileUpdate} 
          />

          <SignatureUpload
            signatureUrl={profile?.signature_url}
            onProfileUpdate={onProfileUpdate}
          />

          {isEditing ? (
            <ProfileForm
              data={editForm}
              onChange={handleFormChange}
              onSubmit={handleEditSubmit}
            />
          ) : (
            <ProfileInfo
              name={profile?.name}
              phone={profile?.phone}
              email={profile?.email}
              activePlan={activePlan}
              companyName={profile?.company_name}
              companyInfo={profile?.company_info}
              websiteUrl={profile?.website_url}
              socialMediaLinks={profile?.social_media_links}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};