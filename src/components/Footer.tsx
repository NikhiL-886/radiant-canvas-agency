import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Contact from "./Contact";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { name: "Web Development", href: "#services" },
      { name: "Mobile Apps", href: "#services" },
      { name: "E-commerce", href: "#services" },
      { name: "Brand Identity", href: "#services" },
      { name: "SEO & Marketing", href: "#services" },
    ],
    Company: [
      { name: "About Us", href: "#about" },
      { name: "Our Work", href: "#portfolio" },
      { name: "Pricing", href: "#pricing" },
      { name: "Contact", href: "#contact" },
      { name: "Blog", href: "#blog" },
    ],
    Resources: [
      { name: "Case Studies", href: "#" },
      { name: "Free Tools", href: "#" },
      { name: "Design Resources", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "Support", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
  ];


  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@samtechdigital.com",
      action: "mailto:hello@samtechdigital.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Tech Street, Digital City, DC 12345",
      action: "#"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/src/assets/samtech-logo.png" 
                alt="Samtech Digital" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              We build digital experiences that drive results. From custom websites to mobile apps, 
              we're your trusted partner in digital transformation.
            </p>
          </div>

          

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-6 text-accent">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-accent transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        {/* <div className="glass rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-foreground/70 mb-6">
              Get the latest insights on web development, design trends, and digital marketing delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-secondary/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-accent to-primary-glow rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50">
          <div className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {currentYear} Samtech Digital. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 bg-secondary/30 rounded-lg flex items-center justify-center text-foreground/70 hover:text-accent hover:scale-110 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="text-center mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground/60">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;