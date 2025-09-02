import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Users } from "lucide-react";

interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  deadline: string;
  description: string;
  requirements: string;
  link: string;
  status: string;
  schedule?: string;
  priority?: string;
}

interface VacancyForm {
  title: string;
  company: string;
  location: string;
  salary: string;
  deadline: string;
  description: string;
  requirements: string;
  link: string;
  status: string;
  schedule: string;
  priority: string;
}

interface VacanciesSectionProps {
  vacancies: Vacancy[];
  setVacancies: (vacancies: Vacancy[]) => void;
  isVacancyDialogOpen: boolean;
  setIsVacancyDialogOpen: (open: boolean) => void;
  editingVacancy: Vacancy | null;
  setEditingVacancy: (vacancy: Vacancy | null) => void;
  vacancyForm: VacancyForm;
  setVacancyForm: (form: VacancyForm) => void;
  handleAddVacancy: () => void;
  handleEditVacancy: (vacancy: Vacancy) => void;
  handleDeleteVacancy: (id: number) => void;
}

const VacanciesSection = ({
  vacancies,
  isVacancyDialogOpen,
  setIsVacancyDialogOpen,
  editingVacancy,
  setEditingVacancy,
  vacancyForm,
  setVacancyForm,
  handleAddVacancy,
  handleEditVacancy,
  handleDeleteVacancy,
}: VacanciesSectionProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Vakansiya İdarəetməsi
        </CardTitle>
        <Dialog open={isVacancyDialogOpen} onOpenChange={setIsVacancyDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingVacancy(null);
                setVacancyForm({
                  title: "",
                  company: "",
                  location: "",
                  salary: "",
                  deadline: "",
                  description: "",
                  requirements: "",
                  link: "",
                  status: "Aktiv",
                  schedule: "Tam ştat",
                  priority: "Adi",
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
                    value={vacancyForm.title}
                    onChange={(e) =>
                      setVacancyForm({ ...vacancyForm, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="vacancy-company">Şirkət</Label>
                  <Input
                    id="vacancy-company"
                    value={vacancyForm.company}
                    onChange={(e) =>
                      setVacancyForm({ ...vacancyForm, company: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="vacancy-location">Yer</Label>
                  <Input
                    id="vacancy-location"
                    value={vacancyForm.location}
                    onChange={(e) =>
                      setVacancyForm({ ...vacancyForm, location: e.target.value })
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
                      setVacancyForm({ ...vacancyForm, deadline: e.target.value })
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
                    value={vacancyForm.schedule}
                    onChange={(e) =>
                      setVacancyForm({ ...vacancyForm, schedule: e.target.value })
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
                      setVacancyForm({ ...vacancyForm, priority: e.target.value })
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
              <Button className="w-full" onClick={handleAddVacancy}>
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
                <TableCell className="font-medium">{vacancy.title}</TableCell>
                <TableCell>{vacancy.company}</TableCell>
                <TableCell>{vacancy.location}</TableCell>
                <TableCell>{vacancy.salary}</TableCell>
                <TableCell>{vacancy.schedule}</TableCell>
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