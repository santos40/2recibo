import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2 } from "lucide-react";
import { FooterPage } from "./types";

interface FooterPageCardProps {
  page: FooterPage;
  onEdit: (page: FooterPage) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, currentStatus: boolean) => void;
}

export const FooterPageCard = ({ 
  page, 
  onEdit, 
  onDelete, 
  onToggleActive 
}: FooterPageCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{page.title}</h3>
            <p className="text-sm text-gray-500">/{page.slug}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={page.active}
              onCheckedChange={() => onToggleActive(page.id, page.active)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(page)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(page.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};