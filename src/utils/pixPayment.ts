import { supabase } from "@/integrations/supabase/client";

export const generatePixPayment = async (amount: number, description: string) => {
  try {
    const correlationID = crypto.randomUUID();

    const response = await fetch('https://api.openpix.com.br/api/v1/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Q2xpZW50X0lkXzQ2MWJmZGQ3LTYwNzgtNDM2Ny1hMzVkLWE4OWE0OGQyZTEyMzpDbGllbnRfU2VjcmV0X0hGQU9DdGxWdVA5UGdrM0FBQkgxWW56MnRhNkFhb1NSVzRrS01TeFlJL009'
      },
      body: JSON.stringify({
        correlationID: correlationID,
        value: amount * 100, // Convert to cents
        comment: description,
        expiresIn: 2592000
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao gerar pagamento PIX');
    }

    const data = await response.json();

    if (!data.charge?.brCode) {
      throw new Error('Código PIX não encontrado na resposta');
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    return {
      qrCode: data.charge.brCode,
      copyPaste: data.charge.brCode,
      expiresAt: expirationDate.toISOString()
    };

  } catch (error: any) {
    console.error('Error generating PIX payment:', error);
    throw error;
  }
};