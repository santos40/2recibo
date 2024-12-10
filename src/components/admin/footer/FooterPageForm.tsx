import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FooterPage, FooterPageFormData } from "./types";

interface FooterPageFormProps {
  page?: FooterPage;
  onSave: (page: FooterPageFormData) => void;
  onCancel: () => void;
}

export const FooterPageForm = ({ page, onSave, onCancel }: FooterPageFormProps) => {
  const [formData, setFormData] = useState<FooterPageFormData>({
    title: page?.title || "",
    slug: page?.slug || "",
    content: page?.content || "",
    active: page?.active ?? true,
  });

  return (
    <Card className="mb-4">
      <CardContent className="pt-6 space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <Label>Slug</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>
        <div>
          <Label>Conteúdo</Label>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.active}
            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
          />
          <Label>Ativo</Label>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(formData)}>Salvar</Button>
        </div>
      </CardContent>
    </Card>
  );
};