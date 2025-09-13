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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center h-14 sm:h-16">
          {/* Logo solda */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-elegant transition-all duration-500 group-hover:scale-110">
              <span className="text-primary-foreground font-bold text-xs sm:text-sm">
                NQ
              </span>
            </div>
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Namiq Quliyev
            </span>
          </Link>

          {/* Desktop Navigation ortada */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-all duration-500 font-medium text-sm lg:text-base relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation sağda */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-primary/10 rounded-xl"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[300px] bg-background/95 backdrop-blur-lg border-l border-border/50"
            >
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
