
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Briefcase, Award, FileText, BookOpen, Users } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Ana Səhifə", href: "/", icon: null },
    { name: "Blog", href: "/blog", icon: null },
    { name: "İş Elanları", href: "/jobs", icon: null },
    { name: "Dashboard", href: "/dashboard", icon: null },
    { name: "Profil", href: "/profile", icon: <User className="w-4 h-4" /> },
    { name: "İş Təcrübəsi", href: "/experience", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Bacarıqlar", href: "/skills", icon: <Award className="w-4 h-4" /> },
    { name: "Sertifikatlar", href: "/certificates", icon: <FileText className="w-4 h-4" /> },
    { name: "Blog İdarəetməsi", href: "/blog-management", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Vakansiya İdarəetməsi", href: "/vacancy-management", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">W</span>
            </div>
            <span className="font-semibold text-lg">Warehouseman.az</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.name} to={item.href}>
                <Button variant="ghost" className="text-sm">
                  {item.name}
                </Button>
              </Link>
            ))}
            {/* Admin Menu */}
            <div className="relative group">
              <Button variant="ghost" className="text-sm">
                Admin
              </Button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-popover border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navItems.slice(4).map((item) => (
                  <Link key={item.name} to={item.href} className="flex items-center px-3 py-2 text-sm hover:bg-accent">
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu aç</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-2 py-2 text-sm font-medium hover:bg-accent rounded-md"
                    >
                      {item.icon}
                      <span className={item.icon ? "ml-2" : ""}>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
