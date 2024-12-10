import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProfileFormData {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  companyInfo: string;
  websiteUrl: string;
  socialMediaLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface ProfileFormProps {
  data: ProfileFormData;
  onChange: (data: ProfileFormData) => void;
  onSubmit: () => void;
}

export const ProfileForm = ({ data, onChange, onSubmit }: ProfileFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) =>
            onChange({ ...data, name: e.target.value })
          }
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) =>
            onChange({ ...data, phone: e.target.value })
          }
          placeholder="Seu telefone"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={data.email}
          onChange={(e) =>
            onChange({ ...data, email: e.target.value })
          }
          placeholder="Seu email"
        />
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-medium mb-4">Informações da Empresa</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName">Nome da Empresa</Label>
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e) =>
                onChange({ ...data, companyName: e.target.value })
              }
              placeholder="Nome da sua empresa"
            />
          </div>

          <div>
            <Label htmlFor="companyInfo">Informações Adicionais</Label>
            <Textarea
              id="companyInfo"
              value={data.companyInfo}
              onChange={(e) =>
                onChange({ ...data, companyInfo: e.target.value })
              }
              placeholder="Informações adicionais sobre sua empresa"
            />
          </div>

          <div>
            <Label htmlFor="websiteUrl">Website</Label>
            <Input
              id="websiteUrl"
              value={data.websiteUrl}
              onChange={(e) =>
                onChange({ ...data, websiteUrl: e.target.value })
              }
              placeholder="https://www.seusite.com.br"
            />
          </div>

          <div className="space-y-4">
            <Label>Redes Sociais</Label>
            <Input
              placeholder="Facebook URL"
              value={data.socialMediaLinks?.facebook || ""}
              onChange={(e) =>
                onChange({
                  ...data,
                  socialMediaLinks: {
                    ...data.socialMediaLinks,
                    facebook: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Instagram URL"
              value={data.socialMediaLinks?.instagram || ""}
              onChange={(e) =>
                onChange({
                  ...data,
                  socialMediaLinks: {
                    ...data.socialMediaLinks,
                    instagram: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="LinkedIn URL"
              value={data.socialMediaLinks?.linkedin || ""}
              onChange={(e) =>
                onChange({
                  ...data,
                  socialMediaLinks: {
                    ...data.socialMediaLinks,
                    linkedin: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <Button onClick={onSubmit} className="w-full">
        Salvar Alterações
      </Button>
    </div>
  );
};