import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, Loader2, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Mississippi Gulf Coast zip codes we serve
const SERVICE_ZIPS = new Set([
  // Ocean Springs
  "39564", "39565",
  // Biloxi
  "39530", "39531", "39532", "39533", "39534", "39535", "39540", "39541",
  // Gulfport
  "39501", "39502", "39503", "39505", "39506", "39507",
  // D'Iberville
  "39540",
  // Gautier
  "39553",
  // Pascagoula
  "39567", "39568", "39569", "39581",
  // Moss Point
  "39562", "39563",
  // Long Beach
  "39560",
  // Pass Christian
  "39571",
]);

interface FormData {
  zip: string;
  name: string;
  phone: string;
  email: string;
}

const CheckAvailability = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isSpanish = i18n.language === "es";

  const [step, setStep] = useState<"zip" | "contact" | "success">("zip");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    zip: "",
    name: "",
    phone: "",
    email: "",
  });
  const [zipError, setZipError] = useState("");

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const zip = formData.zip.trim();
    
    if (!/^\d{5}$/.test(zip)) {
      setZipError(isSpanish ? "Ingrese un código postal válido de 5 dígitos" : "Please enter a valid 5-digit zip code");
      return;
    }

    if (SERVICE_ZIPS.has(zip)) {
      setZipError("");
      setStep("contact");
    } else {
      setZipError(
        isSpanish
          ? "Lo sentimos, aún no servimos en su área. ¡Llámenos al (228) 338-3455 para más información!"
          : "Sorry, we don't serve your area yet. Call us at (228) 338-3455 to learn more!"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        inquiry_type: "availability_check",
        message: `Zip code: ${formData.zip}`,
        status: "new",
      });

      if (error) throw error;

      setStep("success");
      toast({
        title: isSpanish ? "¡Gracias!" : "Thank you!",
        description: isSpanish
          ? "Nos pondremos en contacto pronto."
          : "We'll be in touch soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: isSpanish ? "Error" : "Error",
        description: isSpanish
          ? "No se pudo enviar. Inténtelo de nuevo."
          : "Failed to submit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-primary/20">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-display flex items-center justify-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          {isSpanish ? "Verificar Disponibilidad" : "Check Availability"}
        </CardTitle>
        <CardDescription>
          {step === "zip" && (isSpanish 
            ? "Ingrese su código postal para ver si servimos en su área"
            : "Enter your zip code to see if we serve your area"
          )}
          {step === "contact" && (isSpanish
            ? "¡Buenas noticias! Servimos en su área. Deje sus datos para comenzar."
            : "Great news! We serve your area. Leave your info to get started."
          )}
          {step === "success" && (isSpanish
            ? "¡Gracias por su interés!"
            : "Thank you for your interest!"
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {step === "zip" && (
          <form onSubmit={handleZipCheck} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zip">{isSpanish ? "Código Postal" : "Zip Code"}</Label>
              <Input
                id="zip"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                placeholder="39564"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value.replace(/\D/g, "") })}
                className={zipError ? "border-destructive" : ""}
              />
              {zipError && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  {zipError.includes("(228)") && <Phone className="h-3 w-3" />}
                  {zipError}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {isSpanish ? "Verificar" : "Check"}
            </Button>
          </form>
        )}

        {step === "contact" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-4 p-2 bg-green-50 rounded-md">
              <CheckCircle className="h-4 w-4" />
              {isSpanish
                ? `¡Servimos en el código postal ${formData.zip}!`
                : `We serve zip code ${formData.zip}!`
              }
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{isSpanish ? "Nombre" : "Name"}</Label>
              <Input
                id="name"
                type="text"
                required
                placeholder={isSpanish ? "Juan García" : "John Smith"}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{isSpanish ? "Teléfono" : "Phone"}</Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="(228) 555-1234"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{isSpanish ? "Correo Electrónico" : "Email"}</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("zip")}
                className="flex-1"
              >
                {isSpanish ? "Atrás" : "Back"}
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSpanish ? "Enviar" : "Submit"}
              </Button>
            </div>
          </form>
        )}

        {step === "success" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <p className="text-muted-foreground">
              {isSpanish
                ? "Nos pondremos en contacto dentro de 24 horas para programar su entrega gratuita."
                : "We'll contact you within 24 hours to schedule your free delivery."
              }
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setStep("zip");
                setFormData({ zip: "", name: "", phone: "", email: "" });
              }}
            >
              {isSpanish ? "Verificar Otro Código Postal" : "Check Another Zip Code"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckAvailability;
