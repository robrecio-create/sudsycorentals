import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Pricing", href: "#pricing" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "FAQ", href: "#faq" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shadow-md">
              <span className="text-2xl">🧺</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground leading-tight">
                SUDSY CO.
              </h1>
              <p className="text-xs font-medium text-primary tracking-wider">RENTALS</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>


          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-border/50 mt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
