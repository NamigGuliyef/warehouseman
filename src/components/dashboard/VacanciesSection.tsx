import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface Vacancy {
  id: number;
  company: string;
  position: string;
  city: string;
  salary: string;
  deadline: string;
  link: string;
  priority: string;
  work_schedule: string;
  description: string;
  requirements?: string;
  status?: string;
}

interface VacancyForm {
  company: string;
  position: string;
  city: string;
  salary: string;
  deadline: string;
  link: string;
  priority: string;
  work_schedule: string;
  description: string;
  requirements: string;
  status: string;
}

const VacanciesSection = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isVacancyDialogOpen, setIsVacancyDialogOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [vacancyForm, setVacancyForm] = useState<VacancyForm>({
    company: "",
    position: "",
    city: "",
    salary: "",
    deadline: "",
    link: "",
    priority: "",
    work_schedule: "",
    description: "",
    requirements: "",
    status: "",
  });
  const [searchCity, setSearchCity] = useState(""); // Yeni state
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Vakansiyaları API-dən gətir (city query ilə)
  const fetchVacancies = async (city?: string) => {
    let url = "http://localhost:3000/portfolio/dashboard/vacancies";
    if (city && city.trim() !== "") {
      url += `?city=${encodeURIComponent(city.trim())}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    if (Array.isArray(data)) setVacancies(data);
    else if (data) setVacancies([data]);
    else setVacancies([]);
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  // Axtarış düyməsi üçün funksiya
  const handleSearch = () => {
    fetchVacancies(searchCity);
  };

  // Enter basanda da axtarış olsun
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Vakansiya əlavə et
  const handleAddVacancy = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/portfolio/dashboard/vacancies",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: vacancyForm.company,
            position: vacancyForm.position,
            city: vacancyForm.city,
            salary: vacancyForm.salary,
            deadline: vacancyForm.deadline,
            link: vacancyForm.link,
            priority: vacancyForm.priority,
            work_schedule: vacancyForm.work_schedule,
            description: vacancyForm.description,
            requirements: vacancyForm.requirements,
            status: vacancyForm.status,
          }),
        }
      );
      if (response.ok) {
        const newVacancy = await response.json();
        setVacancies((prev) => [
          ...prev,
          {
            ...newVacancy,
            title: newVacancy.position, // Backenddə position gəlir
            location: newVacancy.city, // Backenddə city gəlir
            schedule: newVacancy.work_schedule,
          },
        ]);
        setIsVacancyDialogOpen(false);
        setEditingVacancy(null);
        setVacancyForm({
          company: "",
          position: "",
          city: "",
          salary: "",
          deadline: "",
          link: "",
          priority: "",
          work_schedule: "",
          description: "",
          requirements: " ",
          status: "",
        });
      } else {
        alert("Xəta baş verdi!");
      }
    } catch {
      alert("Serverə qoşulmaq mümkün olmadı!");
    }
  };

  // Vakansiyanı yenilə
  const handleUpdateVacancy = async () => {
    if (!editingVacancy) return;
    try {
      const response = await fetch(
        `http://localhost:3000/portfolio/dashboard/vacancies/${editingVacancy.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: vacancyForm.company,
            position: vacancyForm.position,
            city: vacancyForm.city,
            salary: vacancyForm.salary,
            deadline: vacancyForm.deadline,
            link: vacancyForm.link,
            priority: vacancyForm.priority,
            work_schedule: vacancyForm.work_schedule,
            description: vacancyForm.description,
            requirements: vacancyForm.requirements,
            status: vacancyForm.status,
          }),
        }
      );
      if (response.ok) {
        const updatedVacancy = await response.json();
        setVacancies((prev) =>
          prev.map((v) =>
            v.id === updatedVacancy.id
              ? {
                  ...updatedVacancy,
                  title: updatedVacancy.position,
                  location: updatedVacancy.city,
                  schedule: updatedVacancy.work_schedule,
                }
              : v
          )
        );
        setIsVacancyDialogOpen(false);
        setEditingVacancy(null);
        setVacancyForm({
          company: "",
          position: "",
          city: "",
          salary: "",
          deadline: "",
          link: "",
          priority: "",
          work_schedule: "",
          description: "",
          requirements: " ",
          status: "",
        });
      } else {
        alert("Xəta baş verdi!");
      }
    } catch {
      alert("Serverə qoşulmaq mümkün olmadı!");
    }
  };

  // Vakansiyanı sil
  const handleDeleteVacancy = async (id: number) => {
    if (!window.confirm("Bu vakansiyanı silmək istədiyinizə əminsiniz?"))
      return;
    try {
      const response = await fetch(
        `http://localhost:3000/portfolio/dashboard/vacancies/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setVacancies((prev) => prev.filter((v) => v.id !== id));
      } else {
        alert("Silinmədi!");
      }
    } catch {
      alert("Serverə qoşulmaq olmadı!");
    }
  };

  // Edit üçün formu doldur
  const handleEditVacancy = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setVacancyForm({
      company: vacancy.company,
      position: vacancy.position,
      city: vacancy.city,
      salary: vacancy.salary,
      deadline: vacancy.deadline,
      link: vacancy.link,
      priority: vacancy.priority,
      work_schedule: vacancy.work_schedule,
      description: vacancy.description,
      requirements: vacancy.requirements,
      status: vacancy.status,
    });
    setIsVacancyDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Vakansiya İdarəetməsi
        </CardTitle>
        {/* Şəhər üzrə axtarış inputu */}
        <div className="flex gap-2 items-center">
          <Input
            ref={searchInputRef}
            placeholder="Şəhərə görə axtar..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-48"
          />
          <Button variant="outline" onClick={handleSearch}>
            Axtar
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchCity("");
              fetchVacancies();
              if (searchInputRef.current) searchInputRef.current.value = "";
            }}
          >
            Sıfırla
          </Button>
        </div>
        <Dialog
          open={isVacancyDialogOpen}
          onOpenChange={setIsVacancyDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingVacancy(null);
                setVacancyForm({
                  company: "",
                  position: "",
                  city: "",
                  salary: "",
                  deadline: "",
                  link: "",
                  priority: "",
                  work_schedule: "",
                  description: "",
                  requirements:  " ",
                  status: "",
                });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Vakansiya Əlavə Et
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingVacancy ? "Vakansiyanı Redaktə Et" : "Yeni Vakansiya"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vacancy-title">Vəzifə</Label>
                  <Input
                    id="vacancy-title"
                    value={vacancyForm.position}
                    onChange={(e) =>
                      setVacancyForm({ ...vacancyForm, position: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="vacancy-company">Şirkət</Label>
                  <Input
                    id="vacancy-company"
                    value={vacancyForm.company}
                    onChange={(e) =>
                      setVacancyForm({
                        ...vacancyForm,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="vacancy-location">Yer</Label>
                  <Input
                    id="vacancy-location"
                    value={vacancyForm.city}
                    onChange={(e) =>
                      setVacancyForm({
                        ...vacancyForm,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="vacancy-salary">Maaş</Label>
                  <Input
                    id="vacancy-salary"
                    value={vacancyForm.salary}
                    onChange={(e) =>
                      setVacancyForm({ ...vacancyForm, salary: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="vacancy-deadline">Son Tarix</Label>
                  <Input
                    id="vacancy-deadline"
                    type="date"
                    value={vacancyForm.deadline}
                    onChange={(e) =>
                      setVacancyForm({
                        ...vacancyForm,
                        deadline: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="vacancy-link">Link</Label>
                  <Input
                    id="vacancy-link"
                    value={vacancyForm.link}
                    onChange={(e) =>
                      setVacancyForm({ ...vacancyForm, link: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="vacancy-schedule">İş qrafiki</Label>
                  <select
                    id="vacancy-schedule"
                    value={vacancyForm.work_schedule}
                    onChange={(e) =>
                      setVacancyForm({
                        ...vacancyForm,
                        work_schedule: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="Tam ştat">Tam ştat</option>
                    <option value="Yarım ştat">Yarım ştat</option>
                    <option value="Sərbəst">Sərbəst</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="vacancy-priority">Prioritet</Label>
                  <select
                    id="vacancy-priority"
                    value={vacancyForm.priority}
                    onChange={(e) =>
                      setVacancyForm({
                        ...vacancyForm,
                        priority: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="Adi">Adi</option>
                    <option value="Təcili">Təcili</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="vacancy-description">İş Təsviri</Label>
                <Textarea
                  id="vacancy-description"
                  value={vacancyForm.description}
                  onChange={(e) =>
                    setVacancyForm({
                      ...vacancyForm,
                      description: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="vacancy-requirements">Tələblər</Label>
                <Textarea
                  id="vacancy-requirements"
                  value={vacancyForm.requirements}
                  onChange={(e) =>
                    setVacancyForm({
                      ...vacancyForm,
                      requirements: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="vacancy-status">Status</Label>
                <select
                  id="vacancy-status"
                  value={vacancyForm.status}
                  onChange={(e) =>
                    setVacancyForm({ ...vacancyForm, status: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="Aktiv">Aktiv</option>
                  <option value="Vaxtı bitib">Vaxtı bitib</option>
                </select>
              </div>
              <Button
                className="w-full"
                onClick={
                  editingVacancy ? handleUpdateVacancy : handleAddVacancy
                }
              >
                {editingVacancy ? "Yenilə" : "Əlavə Et"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vəzifə</TableHead>
              <TableHead>Şirkət</TableHead>
              <TableHead>Yer</TableHead>
              <TableHead>Maaş</TableHead>
              <TableHead>İş qrafiki</TableHead>
              <TableHead>Prioritet</TableHead>
              <TableHead>Son Tarix</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacancies.map((vacancy) => (
              <TableRow key={vacancy.id}>
                <TableCell className="font-medium">{vacancy.position}</TableCell>
                <TableCell>{vacancy.company}</TableCell>
                <TableCell>{vacancy.city}</TableCell>
                <TableCell>{vacancy.salary}</TableCell>
                <TableCell>{vacancy.work_schedule}</TableCell>
                <TableCell>{vacancy.priority}</TableCell>
                <TableCell>{vacancy.deadline}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      vacancy.status === "Aktiv" ? "default" : "secondary"
                    }
                  >
                    {vacancy.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditVacancy(vacancy)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteVacancy(vacancy.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VacanciesSection;
