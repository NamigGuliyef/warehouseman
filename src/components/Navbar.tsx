
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Ana səhifə", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "İş Elanları", href: "/jobs" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95 border-b border-border shadow-card transition-all duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center shadow-card group-hover:shadow-elegant transition-all duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-sm sm:text-base">NQ</span>
            </div>
            <span className="font-bold text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
              Namiq Quliyev
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8 lg:space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-all duration-300 font-semibold text-sm lg:text-base relative group px-4 py-2"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[300px] bg-background/95 backdrop-blur-lg border-l border-border/50">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-base sm:text-lg font-medium text-foreground hover:text-primary transition-all duration-500 py-3 px-4 rounded-xl hover:bg-primary/5 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 group-hover:w-full"></span>
                    </span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
