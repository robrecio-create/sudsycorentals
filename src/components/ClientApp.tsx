import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface ClientAppProps {
  children: ReactNode;
}

const ClientApp = ({ children }: ClientAppProps) => (
  <I18nextProvider i18n={i18n}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              {children}
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </I18nextProvider>
);

export default ClientApp;
