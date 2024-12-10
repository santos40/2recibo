import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Prices from "@/pages/Prices";
import Receipts from "@/pages/Receipts";
import Promissory from "@/pages/Promissory";
import Payment from "@/pages/Payment";
import ProductQuotation from "@/pages/ProductQuotation";
import ServiceQuotation from "@/pages/ServiceQuotation";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useIndexUserManagement } from "@/hooks/useIndexUserManagement";
import { Skeleton } from "@/components/ui/skeleton";

const PageLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log(`📄 Page displayed: ${location.pathname}`);
    console.log('🔍 Current route details:', {
      path: location.pathname,
      search: location.search,
      hash: location.hash
    });
  }, [location]);

  return null;
}

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

function App() {
  const { isAdmin } = useAdminStatus();
  const { session } = useIndexUserManagement();

  useEffect(() => {
    console.log('👤 User session status:', session ? 'Logged in' : 'Not logged in');
    console.log('👑 Admin status:', isAdmin ? 'Is admin' : 'Not admin');
  }, [session, isAdmin]);

  return (
    <Router>
      <PageLogger />
      <Navbar isAdmin={isAdmin} session={session} />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/promissory" element={<Promissory />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/quotations/products" element={<ProductQuotation />} />
          <Route path="/quotations/services" element={<ServiceQuotation />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;