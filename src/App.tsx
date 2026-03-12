import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import LocationPage from "./pages/LocationPage";
import AreasWeServe from "./pages/AreasWeServe";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import LaundryCareCheatSheet from "./pages/resources/LaundryCareCheatSheet";
import HookupChecklist from "./pages/resources/HookupChecklist";
import ReviewRedirect from "./pages/ReviewRedirect";
import ScheduleDelivery from "./pages/ScheduleDelivery";
import TwentyDollarPromo from "./pages/TwentyDollarPromo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import WasherDryerRental from "./pages/WasherDryerRental";
import ApplianceRentalService from "./pages/ApplianceRentalService";
import FurnitureRentalService from "./pages/FurnitureRentalService";
import ServiceEstablishment from "./pages/ServiceEstablishment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/locations/:city" element={<LocationPage />} />
              <Route path="/areas-we-serve" element={<AreasWeServe />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/laundry-care-cheat-sheet" element={<LaundryCareCheatSheet />} />
              <Route path="/resources/hookup-checklist" element={<HookupChecklist />} />
              <Route path="/schedule-delivery" element={<ScheduleDelivery />} />
              <Route path="/review" element={<ReviewRedirect />} />
              <Route path="/20-dollar-promo" element={<TwentyDollarPromo />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/washer-and-dryer-rental" element={<WasherDryerRental />} />
              <Route path="/appliance-rental-service" element={<ApplianceRentalService />} />
              <Route path="/furniture-rental-service" element={<FurnitureRentalService />} />
              <Route path="/services" element={<ServiceEstablishment />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
