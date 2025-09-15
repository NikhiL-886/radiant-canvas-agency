import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    const handler = () => setAuthOpen(true);
    window.addEventListener("openAuthModal", handler);
    return () => window.removeEventListener("openAuthModal", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass backdrop-blur-xl py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => {
            if (user && (user.admin === true || user.Admin === true)) {
              window.location.href = '/admin';
            }
          }}>
            <img 
              src="/assets/samtech-logo.png" 
              alt="Samtech Digital" 
              className="h-auto w-40"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-accent transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to='/form'>
              <Button
                className="bg-gradient-to-r from-accent to-primary-glow hover:scale-105 transition-transform duration-300 animate-glow"
              >
                Request a Demo
              </Button>
            </Link>
            {!user ? (
              <Button
                className="glass border border-white/30 text-white/90 backdrop-blur-lg px-6 py-2 rounded-lg shadow-lg"
                onClick={() => setAuthOpen(true)}
              >
                Login / Register
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-white/80 px-4">Welcome, {user.username || user.email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white/90 border-white/30"
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
  <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthSuccess={setUser} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24}/>}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass rounded-lg p-4 animate-slide-up">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-accent transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link to='/form'>
                <Button
                  className="bg-gradient-to-r from-accent to-primary-glow hover:scale-105 transition-transform duration-300 animate-glow w-full"              
                >
                  Request a Demo
                </Button>
              </Link>
              {!user ? (
                <Button
                  className="glass border border-white/30 text-white/90 backdrop-blur-lg px-6 py-2 rounded-lg shadow-lg w-full"
                  onClick={() => {
                    setAuthOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login / Register
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <span className="text-white/80 px-4 text-center">Welcome, {user.username || user.email}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white/90 border-white/30 w-full"
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      setUser(null);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;