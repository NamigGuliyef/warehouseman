import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Building,
  Briefcase,
  ExternalLink,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobListing {
  id: number;
  company: string;
  position: string;
  city: string;
  deadline: string;
  work_schedule?: string;
  salary: string;
  description: string;
  requirements: string[] | string;
  link: string;
  createdAt: string;
  priority?: string;
  status?: string;
}

const Jobs = () => {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(false);

  // Şəhər filteri üçün state
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Backenddən vakansiyaları gətir
  const fetchJobs = async (city?: string) => {
    setLoading(true);
    let url = "https://warehouseman-az-back.vercel.app/portfolio/dashboard/vacancies";
    if (city && city !== "") {
      url += `?city=${encodeURIComponent(city)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    // requirements massiv və ya string ola bilər, massivə çevir
    const jobs = Array.isArray(data)
      ? data.map((job) => ({
        ...job,
        requirements: Array.isArray(job.requirements)
          ? job.requirements
          : typeof job.requirements === "string"
            ? job.requirements.split(",").map((s) => s.trim())
            : [],
      }))
      : [];
    setJobListings(jobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCityFilter = (city: string) => {
    setSelectedCity(city);
    if (city === "") {
      fetchJobs();
    } else {
      fetchJobs(city);
    }
  };

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

  // Mövcud şəhərləri filter üçün çıxar
  const uniqueCities = Array.from(new Set(jobListings.map((job) => job.city)));

  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            İş Elanları
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Anbar və logistika sahəsində aktual vakansiyalar və karyera
            imkanları
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
              <Button
                variant={selectedCity === "" ? "default" : "outline"}
                size="sm"
                onClick={() => handleCityFilter("")}
              >
                Bütün şəhərlər
              </Button>
              {uniqueCities.map((city) => (
                <Button
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCityFilter(city)}
                >
                  {city}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {loading ? (
            <div className="col-span-2 text-center text-lg">Yüklənir...</div>
          ) : jobListings.length === 0 ? (
            <div className="col-span-2 text-center text-lg">
              Vakansiya tapılmadı
            </div>
          ) : (
            jobListings.map((job) => {
              const daysLeft = getDaysLeft(job.deadline);
              return (
                <Card
                  key={job.id}
                  className="card-3d group flex flex-col min-h-[500px]"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2 flex-wrap gap-2">
                        <Badge variant="outline">{job.work_schedule}</Badge>

                        {/* {job.priority && (
                          <Badge
                            variant="destructive"
                            className="warehouse-pulse"
                          >
                            Təcili
                          </Badge>
                        )} */}

                        {/* Prioritet */}
                        <Badge
                          variant={job.priority === "Təcili" ? "destructive" : "default"}
                          className={job.priority === "Təcili" ? "warehouse-pulse" : ""}
                        >
                          {job.priority || "Adi"}
                        </Badge>
                      </div>
                      <Badge
                        variant={
                          daysLeft > 0
                            ? getDeadlineColor(daysLeft)
                            : "destructive"
                        }
                        className={
                          daysLeft <= 0
                            ? "animate-pulse text-white bg-red-600"
                            : ""
                        }
                      >
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
                        Son tarix:{" "}
                        {new Date(job.deadline).toLocaleDateString("az-AZ")}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <div className="space-y-4 flex-1">
                      <div>
                        <h4 className="font-semibold mb-2">İş təsviri:</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {job.description.length > 250
                            ? job.description.slice(0, 250) + "..."
                            : job.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Tələblər:</h4>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(job.requirements)
                            ? job.requirements
                            : job.requirements?.split(",") || []
                          ).map((req, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {req.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>

                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                      <div className="text-xs text-muted-foreground">
                        Elan tarixi:{" "}
                        {new Date(job.createdAt).toLocaleDateString("az-AZ")}
                      </div>
                      <Button
                        className="btn-industrial"
                        onClick={() => window.open(job.link, "_blank")}
                      >
                        Ətraflı bax
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
        {/* Load More Section */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="btn-industrial"
            disabled
          >
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
