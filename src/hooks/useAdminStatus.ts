import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) {
          console.log("No session found");
          setIsAdmin(false);
          return;
        }

        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("id")
          .eq("id", session.user.id)
          .single();

        if (adminError) {
          console.error("Error checking admin status:", adminError);
          setIsAdmin(false);
          return;
        }

        setIsAdmin(!!adminData);
        console.log("Admin status:", !!adminData);
      } catch (error) {
        console.error("Error in checkAdminStatus:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  return { isAdmin, loading };
};