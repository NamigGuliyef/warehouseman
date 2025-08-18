
import { Mail, Phone, Linkedin, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Mail, href: "mailto:namiq@example.com", label: "Email" },
    { icon: Phone, href: "tel:+994501234567", label: "Telefon" },
    { icon: Linkedin, href: "https://linkedin.com/in/namiq", label: "LinkedIn" },
    { icon: MessageCircle, href: "https://wa.me/994501234567", label: "WhatsApp" },
    { icon: Instagram, href: "https://instagram.com/namiq", label: "Instagram" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-10 sm:mt-20">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-accent hover:bg-primary hover:text-primary-foreground 
                         rounded-lg transition-all duration-300 transform hover:scale-110 
                         hover:-translate-y-1 shadow-card hover:shadow-industrial group"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:industrial-float" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-muted-foreground">
            <p className="text-xs sm:text-sm px-4">
              © 2024 Namiq Quliyev. Bütün hüquqlar qorunur.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
