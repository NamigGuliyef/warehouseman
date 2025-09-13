import React, { useEffect, useState } from "react";
import {
  Download,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Award,
  Briefcase,
  Code,
  User,
  Truck,
  Package,
  BarChart3,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Hero3D from "@/components/Hero3D";
import WarehouseAnimation from "@/components/WarehouseAnimation";

// WarehousemanDTO type
type WarehousemanDTO = {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  profBackground?: string;
  technologyFocus?: string;
  experienceYears?: string;
  managedProducts?: string;
  solvedLogistics?: string;
  efficiencyRate?: string;
};

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/namig-guliyev/" },
  { name: "WhatsApp", url: "https://wa.me/994559533073" },
  { name: "Github", url: "https://github.com/NamigGuliyef" },
];

// WorkExperienceDTO type
type WorkExperienceDTO = {
  company: string;
  position: string;
  period: string;
  description: string;
  location: string;
  warehousemanId: string;
};

// Skill tipini əlavə et
type SkillDTO = {
  id: string;
  name: string;
  level: string;
  category: string;
};

type CertificateDTO = {
  id: string;
  name: string;
  date: string;
  issuer: string;
  image: string;
};

const Home = () => {
  // State for warehouseman profile
  const [profile, setProfile] = useState<WarehousemanDTO | null>(null);

  // State for work experiences
  const [workExperience, setWorkExperience] = useState<WorkExperienceDTO[]>([]);

  const [skills, setSkills] = useState<SkillDTO[]>([]);

  const [certificates, setCertificates] = useState<CertificateDTO[]>([]);

  useEffect(() => {
    // Fetch warehouseman profile from API
    fetch("http://localhost:3000/portfolio/dashboard/warehouseman")
      .then((res) => res.json())
      .then((data) => {
        console.log("API-dən gələn:", data);
        if (Array.isArray(data)) {
          setProfile(data[0]);
        } else {
          setProfile(data);
        }
      })
      .catch(() => setProfile(null));

    // Fetch work experiences from API
    fetch("http://localhost:3000/portfolio/dashboard/work-experience")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWorkExperience(data);
        } else if (data) {
          setWorkExperience([data]);
        }
      })
      .catch(() => setWorkExperience([]));

    // Bacarıqları backend-dən al
    fetch("http://localhost:3000/portfolio/dashboard/skills")
      .then((res) => res.json())
      .then((data) => setSkills(Array.isArray(data) ? data : []))
      .catch(() => setSkills([]));

    // Sertifikatları backend-dən al
    fetch("http://localhost:3000/portfolio/dashboard/certificates")
      .then((res) => res.json())
      .then((data) => setCertificates(Array.isArray(data) ? data : []))
      .catch(() => setCertificates([]));
  }, []);

  // Fallback data if API not loaded
  const defaultProfile: WarehousemanDTO = {
    fullName: "Namiq Quliyev",
    position: "Anbar və Logistika Mütəxəssisi",
    email: "namiq@example.com",
    phone: "+994 50 123 45 67",
    profBackground:
      "Anbar və logistika sahəsində 7+ il təcrübəyə malik peşəkar mütəxəssisəm. Müxtəlif ölçülü şirkətlərdə anbar əməliyyatlarının idarə edilməsi, inventar nəzarəti və logistika proseslərinin optimallaşdırılması sahəsində geniş təcrübəm var.",
    technologyFocus:
      "Texnologiyadan istifadə edərək anbar proseslərini avtomatlaşdırmaq və effektivliyi artırmaq mənim əsas maraqlarımdır. Data analizi və müasir anbar idarəetməsi sistemləri ilə işləməkdə ixtisaslaşmışam.",
    experienceYears: "7+",
    managedProducts: "50K+",
    solvedLogistics: "500+",
    efficiencyRate: "95%",
  };

  const warehouseman = profile || defaultProfile;

  // Fallback work experience if API not loaded
  const defaultWorkExperience: WorkExperienceDTO[] = [
    {
      company: "ABC Logistics",
      position: "Anbar müdiri",
      period: "2020-2024",
      description:
        "Anbar əməliyyatlarının idarə edilməsi, inventar nəzarəti və komanda rəhbərliyi",
      location: "Bakı",
      warehousemanId: "1",
    },
    {
      company: "XYZ Supply Chain",
      position: "Anbar operatoru",
      period: "2018-2020",
      description:
        "Məhsul qəbulu, saxlanması və göndərilməsi proseslərinin həyata keçirilməsi",
      location: "Bakı",
      warehousemanId: "1",
    },
    {
      company: "Global Trade LLC",
      position: "Logistika mütəxəssisi",
      period: "2016-2018",
      description:
        "Daşıma proseslərinin planlaşdırılması və nəqliyyat marşrutlarının optimallaşdırılması",
      location: "Bakı",
      warehousemanId: "1",
    },
  ];

  const workExperienceList = workExperience.length > 0 ? workExperience : defaultWorkExperience;

  // const skills = [
  //   "Anbar İdarəetməsi Sistemləri (WMS)",
  //   "Microsoft Excel (İrəliləmiş)",
  //   "SAP Logistics",
  //   "Inventar Nəzarəti",
  //   "Barcode/QR kod sistemləri",
  //   "SQL Əsasları",
  //   "Python (Əsasları)",
  //   "Data Analysis",
  //   "Logistika Planlaşdırması",
  // ];

  const certificatesData = [
    {
      name: "Anbar İdarəetməsi Sertifikatı",
      date: "2023",
      issuer: "International Logistics Institute",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Microsoft Excel Expert",
      date: "2022",
      issuer: "Microsoft",
      image:
        "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "SAP Logistics Fundamentals",
      date: "2021",
      issuer: "SAP Education",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Forklift Operator License",
      date: "2020",
      issuer: "Safety Training Institute",
      image:
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const stats = [
    {
      icon: Clock,
      number: warehouseman.experienceYears || "7+",
      label: "İl Təcrübə",
      description: "Anbar və logistika sahəsində",
    },
    {
      icon: Package,
      number: warehouseman.managedProducts || "50K+",
      label: "İdarə olunan məhsul",
      description: "Aylıq orta göstərici",
    },
    {
      icon: Truck,
      number: warehouseman.solvedLogistics || "500+",
      label: "Həll edilmiş logistik məsələ",
      description: "Müxtəlif çətinlik səviyyəsində",
    },
    {
      icon: BarChart3,
      number: warehouseman.efficiencyRate || "95%",
      label: "Effektivlik dərəcəsi",
      description: "Anbar proseslərində",
    },
  ];

  const services = [
    {
      title: "Anbar İdarəetməsi",
      description: "Professional anbar sistemləri qurulması və optimizasiyası",
      icon: Package,
    },
    {
      title: "Logistika Planlaşdırması",
      description: "Nəqliyyat marşrutları və daşıma proseslərinin təşkili",
      icon: Truck,
    },
    {
      title: "Inventar Nəzarəti",
      description: "Stok idarəetməsi və inventar hesabatları sistemi",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10"></div>

        {/* Elegant pattern overlay */}
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Ccircle cx='40' cy='40' r='40'/%3E%3C/g%3E%3C/g%3E%3E/svg%3E")`,
          }}
        ></div>

        <Hero3D />

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[90vh] sm:min-h-screen py-10 sm:py-20">
            {/* Left side - Main content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Professional badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 sm:mb-6 border border-primary/30 text-xs sm:text-sm elegant-float">
                <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-semibold">Professional Anbardar</span>
              </div>

              {/* Main title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent sophisticated-pulse">
                  {warehouseman.fullName}
                </span>
                
              </h1>

              {/* Subtitle with elegant styling */}
              <div className="mb-4 sm:mb-6">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-secondary mb-2">
                  {warehouseman.position}
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0">
                  {warehouseman.profBackground}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 px-4 lg:px-0">
                <Button
                  size="lg"
                  className="btn-elegant text-base sm:text-lg px-8 py-4 group w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
                  CV-ni yüklə
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base sm:text-lg px-8 py-4 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-500 w-full sm:w-auto rounded-xl border-border/50"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Əlaqə saxla
                </Button>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 px-4 lg:px-0">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 sm:p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30 shadow-soft hover:shadow-elegant transition-all duration-500 elegant-float"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-3" />
                    <div className="text-lg sm:text-2xl font-bold text-foreground">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Services cards */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <div className="text-center lg:text-left mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Xidmətlərim
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Professional anbar və logistika həlləri
                </p>
              </div>

              {services.map((service, index) => (
                <Card key={index} className="card-modern group cursor-pointer">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="p-3 sm:p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-soft">
                        <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3">
                          {service.title}
                        </h4>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* CTA Card */}
              <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 shadow-elegant rounded-2xl sophisticated-pulse">
                <CardContent className="p-6 sm:p-8 text-center">
                  <h4 className="text-lg sm:text-xl font-bold mb-3">
                    Layihəniz var?
                  </h4>
                  <p className="mb-6 opacity-90 text-sm sm:text-base leading-relaxed">
                    Anbar və logistika məsələlərinizdə kömək edək
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 py-3 shadow-soft"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    İndi əlaqə saxla
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center space-y-2 text-muted-foreground">
            <span className="text-xs sm:text-sm">Aşağı davam edin</span>
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-muted-foreground rounded-full flex justify-center">
              <div className="w-1 h-2 sm:h-3 bg-muted-foreground rounded-full animate-bounce mt-1 sm:mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse Animation Section */}
      <section className="py-10 sm:py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Bölmə başlığı */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Professional Anbar Prosesləri
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Real vaxt rejimində anbar əməliyyatları - nəqliyyat vasitələrinin
              gəlişi, malların boşaldılması və rəflərə sistemli yığımı
            </p>
          </div>

          {/* Animasiyalı anbar səhnəsi */}
          <div className="max-w-6xl mx-auto">
            <WarehouseAnimation />
          </div>

          {/* Proses məlumatları */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Card className="card-modern border-l-4 border-l-primary elegant-float">
              <CardContent className="p-6 sm:p-8 text-center">
                <Truck className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-base sm:text-lg mb-3">
                  Nəqliyyat Qəbulu
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Müxtəlif ölçülü nəqliyyat vasitələrinin düzgün vaxtda və
                  effektiv qəbulu
                </p>
              </CardContent>
            </Card>

            <Card className="card-modern border-l-4 border-l-secondary elegant-float" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 sm:p-8 text-center">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold text-base sm:text-lg mb-3">
                  İşçi Koordinasiyası
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Təcrübəli işçi komandası ilə malların təhlükəsiz və sürətli
                  boşaldılması
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d border-l-4 border-l-orange-500">
              <CardContent className="p-4 sm:p-6 text-center">
                <Package className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  Sistemli Saxlama
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Malların rəflərə düzgün yerləşdirilməsi və inventar
                  idarəetməsi
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA bölməsi */}
          <div className="mt-12 sm:mt-16 text-center">
            <Card className="inline-block bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 shadow-glow max-w-4xl mx-auto">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Anbar proseslərinizi optimallaşdırmaq istəyirsiniz?
                </h3>
                <p className="text-base sm:text-lg mb-6 opacity-90">
                  {warehouseman.profBackground}
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 px-6 sm:px-8 py-3 text-base sm:text-lg"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Məsləhət üçün əlaqə saxlayın
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dekorativ elementlər */}
        <div className="absolute top-10 left-10 opacity-10 hidden lg:block">
          <Package className="h-20 w-20 text-primary" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 hidden lg:block">
          <Truck className="h-24 w-24 text-secondary" />
        </div>
      </section>

      {/* Navigation Menu */}
      <section className="py-6 sm:py-8 bg-card border-b border-border sticky top-16 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {[
              { icon: User, text: "Haqqımda", id: "about" },
              { icon: Briefcase, text: "İş yerlərim", id: "experience" },
              { icon: Code, text: "Bacarıqlar", id: "skills" },
              { icon: Award, text: "Sertifikatlar", id: "certificates" },
              { icon: Mail, text: "Əlaqə", id: "contact" },
            ].map((item) => (
              <Button
                key={item.id}
                variant="outline"
                onClick={() =>
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center space-x-1 sm:space-x-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4 py-2"
              >
                <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{item.text}</span>
                <span className="sm:hidden">{item.text.split(" ")[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Enhanced Design */}
      <section
        id="about"
        className="py-20 bg-background relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
              <User className="h-4 w-4" />
              <span className="font-semibold text-sm">Şəxsi məlumat</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Haqqımda
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main about content */}
              <div className="lg:col-span-2">
                <Card className="h-full bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-2 h-16 bg-gradient-to-b from-primary to-secondary rounded-full flex-shrink-0 mt-2"></div>
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-3">
                            Professional Background
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {warehouseman.profBackground}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-2 h-16 bg-gradient-to-b from-secondary to-accent rounded-full flex-shrink-0 mt-2"></div>
                        <div>
                          <h3 className="text-xl font-bold text-secondary mb-3">
                            Texnoloji Fokus
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {warehouseman.technologyFocus}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar info */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-4 text-primary flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Əsas Sahələr
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">
                          Anbar İdarəetməsi
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span className="text-sm font-medium">
                          Logistika Planlaşdırması
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                        <span className="text-sm font-medium">
                          Data Analizi
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-4 text-secondary flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Nailiyyətlər
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Anbar Effektivliyi</span>
                        <span className="font-bold">
                          {warehouseman.efficiencyRate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Təcrübə</span>
                        <span className="font-bold">
                          {warehouseman.experienceYears} il
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Layihələr</span>
                        <span className="font-bold">50+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience - Enhanced Timeline Design */}
      <section
        id="experience"
        className="py-20 bg-gradient-to-br from-accent/30 to-secondary/20 relative"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-secondary rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-accent rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6 border border-secondary/20">
              <Briefcase className="h-4 w-4" />
              <span className="font-semibold text-sm">Karyera yolu</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              İş Təcrübəm
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block"></div>

              <div className="space-y-12">
                {workExperienceList.map((job, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full border-4 border-background shadow-lg hidden md:block z-10"></div>

                    <div className="md:ml-20">
                      <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-2 hover:border-primary/50">
                        <CardHeader className="relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                              <div>
                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                                  {job.position}
                                </CardTitle>
                                <CardDescription className="text-lg font-semibold text-foreground mt-2 flex items-center">
                                  <Briefcase className="h-4 w-4 mr-2 text-primary" />
                                  {job.company}
                                </CardDescription>
                              </div>
                              <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
                                <Badge
                                  variant="default"
                                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0"
                                >
                                  <Calendar className="mr-1 h-3 w-3" />
                                  {job.period}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="border-secondary/50 text-secondary"
                                >
                                  <MapPin className="mr-1 h-3 w-3" />
                                  {job.location}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="relative">
                          <div className="flex items-start space-x-4">
                            <div className="w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full flex-shrink-0"></div>
                            <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                              {job.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Modern Grid Design */}
      <section
        id="skills"
        className="py-20 bg-background relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6 border border-accent/20">
              <Code className="h-4 w-4" />
              <span className="font-semibold text-sm">Texniki bilik</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Bacarıqlarım
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional anbar və logistika sahəsində istifadə etdiyim
              texnologiyalar və sistemlər
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-6 gap-4 h-full">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-primary rounded"></div>
                  ))}
                </div>
              </div>

              <Card className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.length > 0 ? (
                      skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                          <Badge
                            variant="secondary"
                            className="relative w-full p-4 text-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-primary/20 group-hover:border-primary/50 font-medium"
                          >
                            <span className="relative z-10">{skill.name}</span>
                            {/* <span className="ml-2 text-xs text-muted-foreground">
                              ({skill.category} / {skill.level})
                            </span> */}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 text-center text-muted-foreground">
                        Bacarıq tapılmadı.
                      </div>
                    )}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 border border-primary/20 rounded-full opacity-50"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 border border-secondary/20 rounded-lg rotate-45 opacity-50"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section - Modern Gallery Design */}
      <section
        id="certificates"
        className="py-20 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 relative"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-primary rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-secondary rounded-lg rotate-12"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-accent rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
              <Award className="h-4 w-4" />
              <span className="font-semibold text-sm">
                Peşəkar sertifikatlar
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Sertifikatlarım
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Peşəkar inkişafım üçün əldə etdiyim beynəlxalq sertifikatlar və
              lisenziyalar
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {certificates.length > 0 ? (
              certificates.map((cert, index) => (
                <Card
                  key={cert.id || index}
                  className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-card to-card/80 border-2 hover:border-primary/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="relative p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <Badge
                          variant="outline"
                          className="border-primary/50 text-primary font-semibold"
                        >
                          {cert.date}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {cert.name}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-secondary">
                        {cert.issuer}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <div className="col-span-4 text-center text-muted-foreground">
                Sertifikat tapılmadı.
              </div>
            )}
          </div>

          {/* Call to action */}
          <div className="mt-16 text-center">
            <Card className="inline-block bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                  <Award className="h-6 w-6 mr-2" />
                  Daha çox öyrənmək istəyirsiniz?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Peşəkar sertifikatlarım və təcrübəm haqqında ətraflı məlumat
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Əlaqə saxlayın
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-10 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 text-foreground">
            Əlaqə
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="card-3d">
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm sm:text-base">
                          Email
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {warehouseman.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm sm:text-base">
                          Telefon
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {warehouseman.phone}
                        </p>
                      </div>
                    </div>
                  </div>

<div className="space-y-4">
  <h3 className="text-lg sm:text-xl font-semibold">
    Sosial şəbəkələr
  </h3>
  <div className="flex flex-wrap gap-2 sm:gap-4">
    {socialLinks.map((social) => (
      <Button
        key={social.name}
        variant="outline"
        size="sm"
        className="text-xs sm:text-sm"
        asChild
      >
        <a href={social.url} target="_blank" rel="noopener noreferrer">
          {social.name}
        </a>
      </Button>
    ))}
  </div>
</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
