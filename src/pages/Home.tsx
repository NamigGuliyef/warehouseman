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
  CheckCircle,
  Users,
  TrendingUp,
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
      features: ["WMS sistemi implementasiyası", "Inventar nəzarəti", "Proses optimizasiyası"]
    },
    {
      title: "Logistika Planlaşdırması",
      description: "Nəqliyyat marşrutları və daşıma proseslərinin təşkili",
      icon: Truck,
      features: ["Marşrut planlaşdırması", "Nəqliyyat koordinasiyası", "Xərc optimizasiyası"]
    },
    {
      title: "Data Analizi",
      description: "Anbar və logistika performansının analizi və hesabatları",
      icon: BarChart3,
      features: ["KPI hesabatları", "Trend analizi", "Performance monitorinqi"]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Professional gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/3 to-secondary/5"></div>

        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
            {/* Left side - Main content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Professional badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-8 border border-primary/20 font-semibold">
                <Package className="h-4 w-4" />
                <span>Professional Anbar Mütəxəssisi</span>
              </div>

              {/* Main title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                <span className="text-foreground">
                  {warehouseman.fullName}
                </span>
              </h1>

              {/* Subtitle */}
              <div className="mb-8">
                <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-4">
                  {warehouseman.position}
                </p>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {warehouseman.profBackground}
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-card/80 backdrop-blur border border-border/50 hover:shadow-card transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-xl font-bold text-foreground">
                        {stat.number}
                      </div>
                      <div className="text-xs font-medium text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg shadow-card hover:shadow-elegant transition-all duration-300"
                >
                  <Download className="mr-2 h-5 w-5" />
                  CV-ni yüklə
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Əlaqə saxla
                </Button>
              </div>
            </div>

            {/* Right side - Services cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-center lg:text-left mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                  Professional Xidmətlər
                </h3>
                <p className="text-muted-foreground">
                  Anbar və logistika sahəsində tam həllər
                </p>
              </div>

              {services.map((service, index) => (
                <Card key={index} className="bg-card border border-border hover:shadow-card transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {service.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          {service.description}
                        </p>
                        <div className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Professional Təcrübə
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Anbar və logistika sahəsində qazandığım təcrübə və uğurlu layihələrim
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {workExperienceList.map((job, index) => (
              <Card key={index} className="bg-card border border-border hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline">{job.period}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {job.position}
                  </CardTitle>
                  <CardDescription className="text-base font-semibold text-primary">
                    {job.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Bacarıqlar və İxtisaslar
            </h2>
            <p className="text-lg text-muted-foreground">
              Anbar və logistika sahəsində əsas kompetensiyalarım
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              "WMS Sistemləri",
              "SAP Logistics",
              "Excel Advanced",
              "Inventar İdarəetməsi",
              "Quality Control",
              "Team Leadership",
              "Process Optimization",
              "Data Analysis",
              "Supply Chain",
              "Forklift Operation",
              "Safety Management",
              "Cost Optimization"
            ].map((skill, index) => (
              <Card key={index} className="bg-card border border-border hover:shadow-card transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground">{skill}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Birgə İşləyək
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Anbar və logistika sahəsində professional həllər üçün mənimlə əlaqə saxlayın
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-lg p-4">
              <Mail className="h-5 w-5" />
              <span>quliyevnamiq8@gmail.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/10 rounded-lg p-4">
              <Phone className="h-5 w-5" />
              <span>+994 77 333 74 79</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold"
            >
              WhatsApp ilə yazın
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
            >
              LinkedIn Profili
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;