import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log("OpenPix Webhook function started")

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    console.log('Webhook received:', JSON.stringify(body))

    // Verificar se é uma transação PIX confirmada
    if (body.event === 'CHARGE_COMPLETED') {
      const correlationID = body.charge.correlationID
      
      // Buscar o usuário pelo correlationID (que salvamos ao criar o pagamento)
      const { data: receipt, error: receiptError } = await supabaseClient
        .from('receipts')
        .select('user_id')
        .eq('id', correlationID)
        .single()

      if (receiptError) {
        console.error('Error fetching receipt:', receiptError)
        throw receiptError
      }

      if (!receipt?.user_id) {
        throw new Error('User ID not found for correlation ID: ' + correlationID)
      }

      // Atualizar o status do usuário para ativo
      const { error: profileError } = await supabaseClient
        .from('profiles')
        .update({ 
          status: 'active',
          is_active: true 
        })
        .eq('id', receipt.user_id)

      if (profileError) {
        console.error('Error updating profile:', profileError)
        throw profileError
      }

      // Criar ou atualizar a assinatura do usuário
      const { error: subscriptionError } = await supabaseClient
        .from('user_subscriptions')
        .upsert({
          user_id: receipt.user_id,
          plan_type: 'premium',
          active: true,
          updated_at: new Date().toISOString()
        })

      if (subscriptionError) {
        console.error('Error updating subscription:', subscriptionError)
        throw subscriptionError
      }

      console.log('User activated successfully:', receipt.user_id)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})