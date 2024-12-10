import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";
import { FooterPage, FooterPageFormData } from "./footer/types";
import { FooterPageForm } from "./footer/FooterPageForm";
import { FooterPageCard } from "./footer/FooterPageCard";

export const AdminFooterPages = () => {
  const [pages, setPages] = useState<FooterPage[]>([]);
  const [editingPage, setEditingPage] = useState<FooterPage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from("footer_pages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar páginas",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSave = async (formData: FooterPageFormData) => {
    try {
      if (editingPage) {
        const { error } = await supabase
          .from("footer_pages")
          .update(formData)
          .eq("id", editingPage.id);

        if (error) throw error;
        toast({ title: "Página atualizada com sucesso" });
      } else {
        const { error } = await supabase
          .from("footer_pages")
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Página criada com sucesso" });
      }

      setEditingPage(null);
      setIsCreating(false);
      loadPages();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar página",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("footer_pages")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Página deletada com sucesso" });
      loadPages();
    } catch (error: any) {
      toast({
        title: "Erro ao deletar página",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("footer_pages")
        .update({ active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Status atualizado com sucesso" });
      loadPages();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingPage(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Páginas do Footer</h2>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Nova Página
        </Button>
      </div>

      {(isCreating || editingPage) && (
        <FooterPageForm
          page={editingPage || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <div className="grid gap-4">
        {pages.map((page) => (
          <FooterPageCard
            key={page.id}
            page={page}
            onEdit={setEditingPage}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
          />
        ))}
      </div>
    </div>
  );
};