import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface QuotationItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface QuotationFormProps {
  type: 'products' | 'services';
}

export const QuotationForm = ({ type }: QuotationFormProps) => {
  const { toast } = useToast();
  const [clientName, setClientName] = useState("");
  const [clientDocument, setClientDocument] = useState("");
  const [items, setItems] = useState<QuotationItem[]>([{
    description: "",
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0
  }]);
  const [notes, setNotes] = useState("");

  const handleAddItem = () => {
    setItems([...items, {
      description: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0
    }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof QuotationItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      totalPrice: field === 'quantity' || field === 'unitPrice' 
        ? Number(field === 'quantity' ? value : newItems[index].quantity) * 
          Number(field === 'unitPrice' ? value : newItems[index].unitPrice)
        : newItems[index].totalPrice
    };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para gerar orçamentos",
          variant: "destructive",
        });
        return;
      }

      const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

      const { data: quotation, error: quotationError } = await supabase
        .from('quotations')
        .insert({
          user_id: session.user.id,
          type,
          client_name: clientName,
          client_document: clientDocument,
          total_amount: totalAmount,
          notes,
        })
        .select()
        .single();

      if (quotationError) throw quotationError;

      const quotationItems = items.map(item => ({
        quotation_id: quotation.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.totalPrice,
      }));

      const { error: itemsError } = await supabase
        .from('quotation_items')
        .insert(quotationItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Sucesso",
        description: "Orçamento gerado com sucesso!",
      });

      // Reset form
      setClientName("");
      setClientDocument("");
      setItems([{
        description: "",
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0
      }]);
      setNotes("");

    } catch (error: any) {
      toast({
        title: "Erro ao gerar orçamento",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="clientName">Nome do Cliente</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="clientDocument">Documento (CPF/CNPJ)</Label>
            <Input
              id="clientDocument"
              value={clientDocument}
              onChange={(e) => setClientDocument(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Itens do Orçamento</Label>
          {items.map((item, index) => (
            <div key={index} className="grid gap-4 p-4 border rounded-lg">
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Quantidade</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Preço Unitário</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Total</Label>
                  <Input
                    type="number"
                    value={item.totalPrice}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
              </div>
              {items.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveItem(index)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remover Item
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddItem}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
        </div>

        <div>
          <Label htmlFor="notes">Observações</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Gerar Orçamento
        </Button>
      </form>
    </Card>
  );
};