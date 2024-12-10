import { useEffect, useState } from "react";
import { ReceiptForm, type ReceiptData } from "@/components/ReceiptForm";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import AuthComponent from "@/components/Auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { UpgradeDialog } from "@/components/dialogs/UpgradeDialog";
import { UserStatusBanner } from "@/components/banners/UserStatusBanner";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReceiptDisplay } from "@/components/receipt/ReceiptDisplay";
import { useIndexUserManagement } from "@/hooks/useIndexUserManagement";
import { useReceiptManagement } from "@/hooks/useReceiptManagement";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    console.log('📄 Index page mounted');
    const initializePage = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session loaded:', !!session);
      } catch (err) {
        console.error('Error initializing page:', err);
        setError('Failed to load page data');
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
    return () => {
      console.log('📄 Index page unmounted');
    };
  }, []);
  
  const { 
    session, 
    userLogo, 
    userStatus, 
    showUpgradeDialog, 
    setShowUpgradeDialog,
  } = useIndexUserManagement();

  const {
    receiptData,
    verificationUrl,
    handleFormSubmit
  } = useReceiptManagement({ 
    toast, 
    setShowUpgradeDialog 
  });

  useEffect(() => {
    console.log('👤 User status:', {
      isLoggedIn: !!session,
      userStatus,
      hasLogo: !!userLogo,
      showingUpgradeDialog: showUpgradeDialog
    });
  }, [session, userStatus, userLogo, showUpgradeDialog]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <UserStatusBanner status={userStatus} onPaymentClick={() => navigate('/payment')} />
        <PageHeader userLogo={userLogo} />

        {!session ? (
          <AuthComponent />
        ) : !receiptData ? (
          <ReceiptForm onSubmit={handleFormSubmit} />
        ) : (
          <ReceiptDisplay 
            data={receiptData} 
            verificationUrl={verificationUrl}
            isPending={userStatus === 'pending'}
            onNewReceipt={() => {
              console.log('🔄 Creating new receipt');
              window.location.reload();
            }}
            userId={session?.user?.id}
          />
        )}

        <UpgradeDialog 
          open={showUpgradeDialog} 
          onOpenChange={setShowUpgradeDialog}
          onUpgradeClick={() => navigate("/prices")}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default Index;