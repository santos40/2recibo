import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Bem-vindo ao OnlineRecibo!</h1>
        
        <p>Olá! Estamos muito felizes em ter você conosco.</p>
        
        <h2 style="color: #374151;">Como criar seus recibos:</h2>
        
        <ol style="line-height: 1.6;">
          <li>Faça login em sua conta em <a href="https://onlinerecibo.com.br">onlinerecibo.com.br</a></li>
          <li>Na página inicial, clique em "Gerar Recibo"</li>
          <li>Preencha os dados do recibo:
            <ul>
              <li>Valor do recibo</li>
              <li>Nome do pagador</li>
              <li>Nome do beneficiário</li>
              <li>Descrição do serviço/produto</li>
              <li>Data do recibo</li>
            </ul>
          </li>
          <li>Escolha o método de pagamento (PIX ou transferência bancária)</li>
          <li>Clique em "Gerar Recibo"</li>
          <li>Pronto! Seu recibo será gerado com QR Code para verificação</li>
        </ol>

        <p>Recursos disponíveis:</p>
        <ul style="line-height: 1.6;">
          <li>✓ Recibos com QR Code de verificação</li>
          <li>✓ Notas promissórias</li>
          <li>✓ Histórico de recibos</li>
          <li>✓ Personalização com seu logo</li>
        </ul>

        <p style="margin-top: 20px;">Precisa de ajuda? Entre em contato conosco respondendo este email.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Atenciosamente,<br>
            Equipe OnlineRecibo
          </p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "OnlineRecibo <info@onlinerecibo.com.br>",
        to: [email],
        subject: "Bem-vindo ao OnlineRecibo - Como criar seus recibos",
        html: emailContent,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);