import { useState } from "react";
import { Menu, X, Shield, LogOut, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminRole } from "@/hooks/useAdminRole";
import { useAuth } from "@/contexts/AuthContext";
import logoImageImport from "@/assets/logo.png";

// Handle both Vite (string) and Astro (object with src property) image imports
const logoImage = typeof logoImageImport === 'string' 
  ? logoImageImport 
  : (logoImageImport as { src: string })?.src || logoImageImport;

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Pricing", href: "/#pricing" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Areas We Serve", href: "/areas-we-serve" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
  
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin } = useAdminRole();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="Sudsy Co. Rentals" 
              className="h-12 w-auto"
            />
            <div>
              <div className="font-display font-bold text-xl text-foreground leading-tight">
                SUDSY CO.
              </div>
              <p className="text-xs font-medium text-primary tracking-wider">WASHER AND DRYER RENTALS</p>
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
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <LayoutDashboard className="h-4 w-4" />
                    My Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="flex items-center gap-1.5"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <a href="/auth">
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </a>
            )}
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
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      My Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <a
                    href="/auth"
                    className="flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
