import { supabase } from "@/integrations/supabase/client";

export const updateUserSubscription = async (userId: string, plan: string) => {
  const { data: existingSubscription, error: fetchError } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) throw fetchError;

  // Update or insert subscription
  const operation = existingSubscription
    ? supabase
        .from("user_subscriptions")
        .update({
          plan_type: plan,
          active: true,
          updated_at: new Date().toISOString()
        })
        .eq("user_id", userId)
    : supabase
        .from("user_subscriptions")
        .insert({
          user_id: userId,
          plan_type: plan,
          active: true
        });

  const { error: subscriptionError } = await operation;
  if (subscriptionError) throw subscriptionError;

  // Update user profile status
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ 
      is_active: true,
      status: 'active'
    })
    .eq("id", userId);

  if (profileError) throw profileError;
};