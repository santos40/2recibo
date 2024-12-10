import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

export const useIndexUserManagement = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [userLogo, setUserLogo] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string>("pending");
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [pricingPlans, setPricingPlans] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) {
        loadUserProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) {
        loadUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("logo_url, status")
      .eq("id", userId)
      .single();

    if (profile) {
      setUserLogo(profile.logo_url);
      setUserStatus(profile.status);
    }
  };

  return {
    session,
    userLogo,
    userStatus,
    showUpgradeDialog,
    setShowUpgradeDialog,
    pricingPlans
  };
};