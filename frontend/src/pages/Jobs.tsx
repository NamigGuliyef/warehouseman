import { MapPin, Calendar, Building, Briefcase, ExternalLink, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Jobs = () => {
  const jobListings = [
    {
      id: 1,
      company: "Bravo Supermarket",
      position: "Anbardar",
      city: "Bakı",
      deadline: "2024-07-10",
      type: "Tam ştat",
      salary: "800-1200 AZN",
      description: "Anbar əməliyyatlarının həyata keçirilməsi, məhsul qəbulu və göndərilməsi",
      requirements: ["2+ il təcrübə", "Forklift sürücülük vəsiqəsi", "Excel bilikləri"],
      link: "https://bravo.az/careers/warehouse-operator",
      postedDate: "2024-01-15",
      urgent: false
    },
    {
      id: 2,
      company: "Port Baku Logistics",
      position: "Anbar müdiri",
      city: "Bakı",
      deadline: "2024-07-15",
      type: "Tam ştat",
      salary: "1500-2000 AZN",
      description: "Anbar komandası rəhbərliyi, inventar planlaşdırması və KPI izləməsi",
      requirements: ["5+ il rəhbərlik təcrübəsi", "WMS sistemi bilikləri", "İngilis dili"],
      link: "https://portbaku.az/careers/warehouse-manager",
      postedDate: "2024-01-12",
      urgent: true
    },
    {
      id: 3,
      company: "ASCO Group",
      position: "Logistika koordinatoru",
      city: "Sumqayıt",
      deadline: "2024-07-20",
      type: "Tam ştat", 
      salary: "1000-1400 AZN",
      description: "Nəqliyyat planlaşdırması, marşrut optimallaşdırması və tədarükçü əlaqələri",
      requirements: ["Logistika sahəsində təcrübə", "Sürücülük vəsiqəsi", "SAP bilikləri"],
      link: "https://asco.az/careers/logistics-coordinator",
      postedDate: "2024-01-10",
      urgent: false
    },
    {
      id: 4,
      company: "Azerbaijan Airlines",
      position: "Kargo anbar əməkdaşı",
      city: "Bakı",
      deadline: "2024-07-25",
      type: "Vardiya",
      salary: "700-900 AZN",
      description: "Hava kargo yükləmə/boşaltma, beynəlxalq göndəriş prosedurları",
      requirements: ["Fiziki güc", "İngilis dili əsasları", "Həftəsonu işləmək"],
      link: "https://azal.az/careers/cargo-warehouse",
      postedDate: "2024-01-08",
      urgent: false
    },
    {
      id: 5,
      company: "Pasha Holding",
      position: "İnventar analitiki",
      city: "Bakı", 
      deadline: "2024-08-01",
      type: "Tam ştat",
      salary: "1200-1600 AZN",
      description: "Stok analizi, tədarük planlaşdırması və inventar optimallaşdırması",
      requirements: ["Data analizi təcrübəsi", "Excel/SQL", "Universitat təhsili"],
      link: "https://pasha.az/careers/inventory-analyst", 
      postedDate: "2024-01-05",
      urgent: true
    },
    {
      id: 6,
      company: "Global Express",
      position: "Anbar operatoru",
      city: "Gəncə",
      deadline: "2024-07-30",
      type: "Tam ştat",
      salary: "600-800 AZN", 
      description: "Paket qəbulu, çeşidləmə və göndərmə əməliyyatları",
      requirements: ["Orta təhsil", "Fiziki hazırlıq", "Komanda işi"],
      link: "https://globalexpress.az/careers/warehouse-operator",
      postedDate: "2024-01-03",
      urgent: false
    }
  ];

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineColor = (daysLeft: number) => {
    if (daysLeft <= 3) return "destructive";
    if (daysLeft <= 7) return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            İş Elanları
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Anbar və logistika sahəsində aktual vakansiyalar və karyera imkanları
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 mb-12">
        <Card className="card-3d">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <CardTitle>Filterlər</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">Bütün şəhərlər</Button>
              <Button variant="outline" size="sm">Bakı</Button>
              <Button variant="outline" size="sm">Sumqayıt</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {jobListings.map((job) => {
            const daysLeft = getDaysLeft(job.deadline);
            return (
              <Card key={job.id} className="card-3d group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{job.type}</Badge>
                      {job.urgent && (
                        <Badge variant="destructive" className="warehouse-pulse">
                          Təcili
                        </Badge>
                      )}
                    </div>
                    <Badge variant={getDeadlineColor(daysLeft)}>
                      {daysLeft > 0 ? `${daysLeft} gün qalıb` : "Vaxt bitib"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {job.position}
                      </CardTitle>
                      <CardDescription className="text-base font-semibold text-foreground">
                        {job.company}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.city}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Son tarix: {new Date(job.deadline).toLocaleDateString('az-AZ')}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">İş təsviri:</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Tələblər:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-xs text-muted-foreground">
                        Elan tarixi: {new Date(job.postedDate).toLocaleDateString('az-AZ')}
                      </div>
                      <Button 
                        className="btn-industrial"
                        onClick={() => window.open(job.link, '_blank')}
                      >
                        Ətraflı bax
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="btn-industrial">
            Daha çox vakansiya yüklə
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Cəmi {jobListings.length} vakansiya göstərilir
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jobs;