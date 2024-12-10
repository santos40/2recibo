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
        <h1 style="color: #2563eb;">Ative sua conta no OnlineRecibo</h1>
        
        <p>Olá!</p>
        
        <p>Notamos que sua conta ainda está inativa. Para aproveitar todos os recursos do OnlineRecibo, incluindo:</p>
        
        <ul style="line-height: 1.6;">
          <li>✓ Recibos sem marca d'água</li>
          <li>✓ Acesso ilimitado ao histórico</li>
          <li>✓ Personalização com seu logo</li>
          <li>✓ Suporte prioritário</li>
        </ul>

        <p style="margin: 20px 0;">
          <a href="https://onlinerecibo.com.br/payment" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Ativar minha conta agora
          </a>
        </p>

        <p>Se precisar de ajuda, é só responder este email.</p>
        
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
        subject: "Ative sua conta no OnlineRecibo",
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