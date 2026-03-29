import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

// Rate limiting constants
const RATE_LIMIT_KEY = "contact_form_submissions";
const MAX_SUBMISSIONS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Rate limiting helper functions
const getSubmissionHistory = (): number[] => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (!stored) return [];
    return JSON.parse(stored).filter(
      (timestamp: number) => Date.now() - timestamp < RATE_LIMIT_WINDOW_MS
    );
  } catch {
    return [];
  }
};

const recordSubmission = (): void => {
  const history = getSubmissionHistory();
  history.push(Date.now());
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(history));
};

const isRateLimited = (): boolean => {
  return getSubmissionHistory().length >= MAX_SUBMISSIONS;
};

type InquiryType = "general" | "repair" | "pickup" | "";
type ApplianceType = "washer" | "dryer" | "";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const Contact = () => {
  const { t } = useTranslation();
  const [inquiryType, setInquiryType] = useState<InquiryType>("");
  const [appliance, setAppliance] = useState<ApplianceType>("");
  const [problemDescription, setProblemDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Honeypot field - bots will fill this, humans won't see it
  const [honeypot, setHoneypot] = useState("");

  // Track form render time to detect bots submitting too quickly
  const formLoadTime = useRef<number>(Date.now());
  const MIN_SUBMISSION_TIME_MS = 3000; // Minimum 3 seconds to submit

  const needsScheduling = inquiryType === "repair" || inquiryType === "pickup";
  const isRepair = inquiryType === "repair";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot detection: Check honeypot field
    if (honeypot) {
      // Silently reject - bot detected
      console.warn("Bot submission detected via honeypot");
      toast.success(t("contact.toast.success"));
      return;
    }

    // Bot detection: Check if form was submitted too quickly
    const submissionTime = Date.now() - formLoadTime.current;
    if (submissionTime < MIN_SUBMISSION_TIME_MS) {
      console.warn("Bot submission detected via timing");
      toast.success(t("contact.toast.success"));
      return;
    }

    // Rate limiting check
    if (isRateLimited()) {
      toast.error(t("contact.toast.rateLimited"));
      return;
    }

    // Basic validation
    if (!name.trim() || !email.trim() || !phone.trim() || !inquiryType) {
      toast.error(t("contact.toast.fillRequired"));
      return;
    }

    if (isRepair && (!appliance || !problemDescription.trim())) {
      toast.error(t("contact.toast.selectAppliance"));
      return;
    }

    if (needsScheduling && (!selectedDate || !selectedTime)) {
      toast.error(t("contact.toast.selectDateTime"));
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        inquiry_type: inquiryType,
        message: inquiryType === "general" ? message.trim() || null : null,
        appliance: isRepair ? appliance || null : null,
        problem_description: isRepair ? problemDescription.trim() || null : null,
        preferred_date: needsScheduling && selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
        preferred_time: needsScheduling ? selectedTime || null : null,
      };

      const { error } = await supabase.from("contact_submissions").insert(submissionData);

      if (error) throw error;

      // Record successful submission for rate limiting
      recordSubmission();

      // Reset form load time for potential next submission
      formLoadTime.current = Date.now();

      // Send email notification (fire and forget - don't block success)
      supabase.functions.invoke("send-contact-notification", {
        body: submissionData,
      }).catch((err) => {
        console.error("Failed to send email notification:", err);
      });

      toast.success(t("contact.toast.success"));

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setInquiryType("");
      setAppliance("");
      setProblemDescription("");
      setSelectedDate(undefined);
      setSelectedTime("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("contact.toast.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            {t("contact.badge")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-background rounded-2xl p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.phone")}</h3>
                  <a
                    href="tel:+12283383455"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (228) 338-3455
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-2xl p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.email")}</h3>
                  <a
                    href="mailto:info@sudsycorentals.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    info@sudsycorentals.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-2xl p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.serviceArea")}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {t("contact.serviceAreaDesc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-soft">
              <iframe
                title="Sudsy Co. Rentals — Ocean Springs, MS"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110192.8!2d-88.954512!3d30.4252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x889c09a5b59a1951%3A0xc1671a5aedbddbe1!2sSudsy+Co.+Washer+and+Dryer+Rentals!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-background rounded-2xl p-8 shadow-soft space-y-6"
              autoComplete="off"
            >
              {/* Honeypot field - hidden from users, bots will fill it */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  opacity: 0,
                  height: 0,
                  overflow: 'hidden'
                }}
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.form.name")}</Label>
                  <Input
                    id="name"
                    placeholder={t("contact.form.namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.form.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("contact.form.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("contact.form.phonePlaceholder")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={20}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("contact.form.inquiryType")}</Label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "general", label: t("contact.form.general") },
                      { value: "repair", label: t("contact.form.repair") },
                      { value: "pickup", label: t("contact.form.pickup") },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setInquiryType(option.value as InquiryType);
                          setAppliance("");
                          setProblemDescription("");
                          setSelectedDate(undefined);
                          setSelectedTime("");
                        }}
                        className={cn(
                          "px-4 py-2 rounded-lg border-2 font-medium transition-all",
                          inquiryType === option.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary/50"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Repair-specific fields */}
              {isRepair && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="appliance">{t("contact.form.appliance")}</Label>
                    <Select
                      value={appliance}
                      onValueChange={(value: ApplianceType) => setAppliance(value)}
                    >
                      <SelectTrigger id="appliance">
                        <SelectValue placeholder={t("contact.form.selectAppliance")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="washer">{t("contact.form.washer")}</SelectItem>
                        <SelectItem value="dryer">{t("contact.form.dryer")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problem">{t("contact.form.describeProblem")}</Label>
                    <Textarea
                      id="problem"
                      placeholder={t("contact.form.problemPlaceholder")}
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      maxLength={1000}
                      rows={4}
                    />
                  </div>
                </motion.div>
              )}

              {/* Date and Time selection for repair/pickup */}
              {needsScheduling && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <Label>{t("contact.form.preferredDate")}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : t("contact.form.selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) =>
                            date < new Date() || date.getDay() === 0
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">{t("contact.form.preferredTime")}</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder={t("contact.form.selectTime")} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {/* General message */}
              {inquiryType === "general" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    placeholder={t("contact.form.messagePlaceholder")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={1000}
                    rows={4}
                  />
                </motion.div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  t("contact.form.submitting")
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {t("contact.form.submit")}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
