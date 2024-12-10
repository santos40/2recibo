import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

export interface ApiSettings {
  api_enabled: boolean;
  api_requests_limit: number;
  api_key_expiry_days: number;
}

interface ApiSettingsCardProps {
  settings: ApiSettings;
  onChange: (settings: ApiSettings) => void;
}

export const ApiSettingsCard = ({ settings, onChange }: ApiSettingsCardProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Configurações da API</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="api-enabled">Habilitar API</Label>
            <Switch
              id="api-enabled"
              checked={settings.api_enabled}
              onCheckedChange={(checked) => 
                onChange({ ...settings, api_enabled: checked })
              }
            />
          </div>

          <div>
            <Label htmlFor="api-requests">Limite de Requisições (por mês)</Label>
            <Input
              id="api-requests"
              type="number"
              value={settings.api_requests_limit}
              onChange={(e) => 
                onChange({ 
                  ...settings, 
                  api_requests_limit: parseInt(e.target.value) || 0 
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="api-expiry">Validade da Chave API (dias)</Label>
            <Input
              id="api-expiry"
              type="number"
              value={settings.api_key_expiry_days}
              onChange={(e) => 
                onChange({ 
                  ...settings, 
                  api_key_expiry_days: parseInt(e.target.value) || 30 
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};