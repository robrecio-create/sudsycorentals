import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import ScrollToTop from "@/components/ScrollToTop";
import LanguageSync from "@/components/LanguageSync";
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
  <I18nextProvider i18n={i18n}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <LanguageSync />
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

                {/* Spanish routes — same components, language detected from URL */}
                <Route path="/es" element={<Index />} />
                <Route path="/es/auth" element={<Auth />} />
                <Route path="/es/checkout-success" element={<CheckoutSuccess />} />
                <Route path="/es/dashboard" element={<Dashboard />} />
                <Route path="/es/locations/:city" element={<LocationPage />} />
                <Route path="/es/areas-we-serve" element={<AreasWeServe />} />
                <Route path="/es/blog" element={<Blog />} />
                <Route path="/es/blog/:slug" element={<BlogPost />} />
                <Route path="/es/resources" element={<Resources />} />
                <Route path="/es/resources/laundry-care-cheat-sheet" element={<LaundryCareCheatSheet />} />
                <Route path="/es/resources/hookup-checklist" element={<HookupChecklist />} />
                <Route path="/es/schedule-delivery" element={<ScheduleDelivery />} />
                <Route path="/es/20-dollar-promo" element={<TwentyDollarPromo />} />
                <Route path="/es/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/es/terms-of-service" element={<TermsOfService />} />
                <Route path="/es/washer-and-dryer-rental" element={<WasherDryerRental />} />
                <Route path="/es/washer-dryer-rental/:city" element={<ServiceCityPage />} />
                <Route path="/es/appliance-rental-service" element={<ApplianceRentalService />} />
                <Route path="/es/furniture-rental-service" element={<FurnitureRentalService />} />
                <Route path="/es/services" element={<ServiceEstablishment />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </I18nextProvider>
);

export default App;
