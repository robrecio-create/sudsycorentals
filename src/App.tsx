import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./views/Index";
import Auth from "./views/Auth";
import CheckoutSuccess from "./views/CheckoutSuccess";
import AdminDashboard from "./views/AdminDashboard";
import Dashboard from "./views/Dashboard";
import LocationPage from "./views/LocationPage";
import AreasWeServe from "./views/AreasWeServe";
import Blog from "./views/Blog";
import BlogPost from "./views/BlogPost";
import Resources from "./views/Resources";
import LaundryCareCheatSheet from "./views/resources/LaundryCareCheatSheet";
import HookupChecklist from "./views/resources/HookupChecklist";
import ReviewRedirect from "./views/ReviewRedirect";
import ScheduleDelivery from "./views/ScheduleDelivery";
import TwentyDollarPromo from "./views/TwentyDollarPromo";
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsOfService from "./views/TermsOfService";
import WasherDryerRental from "./views/WasherDryerRental";
import ServiceCityPage from "./views/ServiceCityPage";
import ApplianceRentalService from "./views/ApplianceRentalService";
import FurnitureRentalService from "./views/FurnitureRentalService";
import ServiceEstablishment from "./views/ServiceEstablishment";
import NotFound from "./views/NotFound";

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
              <Route path="/washer-dryer-rental/:city" element={<ServiceCityPage />} />
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
