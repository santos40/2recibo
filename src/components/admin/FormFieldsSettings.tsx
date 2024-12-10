import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { AdminSettings } from "@/types/adminSettings";

interface FormFieldsSettingsProps {
  settings: AdminSettings;
  updateFormFields: (formType: string, fields: string) => void;
}

export const FormFieldsSettings = ({
  settings,
  updateFormFields
}: FormFieldsSettingsProps) => {
  return (
    <div className="grid gap-6">
      {Object.entries(settings).map(([formType, data]) => (
        <Card key={formType}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="capitalize">{formType}</Label>
                <Textarea
                  value={data.fields.join(", ")}
                  onChange={(e) => updateFormFields(formType, e.target.value)}
                  placeholder="Digite os campos separados por vírgula"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separe os campos por vírgula
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};