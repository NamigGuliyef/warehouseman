import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Briefcase } from "lucide-react";

interface Job {
  id: number;
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
}

interface JobForm {
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
}

interface JobsSectionProps {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  isJobDialogOpen: boolean;
  setIsJobDialogOpen: (open: boolean) => void;
  editingJob: Job | null;
  setEditingJob: (job: Job | null) => void;
  jobForm: JobForm;
  setJobForm: (form: JobForm) => void;
  handleAddJob: () => void;
  handleEditJob: (job: Job) => void;
  handleDeleteJob: (id: number) => void;
}

const JobsSection = ({
  jobs,
  isJobDialogOpen,
  setIsJobDialogOpen,
  editingJob,
  setEditingJob,
  jobForm,
  setJobForm,
  handleAddJob,
  handleEditJob,
  handleDeleteJob,
}: JobsSectionProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          İş Təcrübəsi
        </CardTitle>
        <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingJob(null);
              setJobForm({ company: "", position: "", location: "", period: "", description: "" });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Yeni İş Əlavə Et
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingJob ? "İş Təcrübəsini Redaktə Et" : "Yeni İş Təcrübəsi"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Şirkət Adı</Label>
                  <Input
                    id="company"
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="job-position">Vəzifə</Label>
                  <Input
                    id="job-position"
                    value={jobForm.position}
                    onChange={(e) => setJobForm({ ...jobForm, position: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Yer</Label>
                  <Input
                    id="location"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="Məs: Bakı, Sumqayıt"
                  />
                </div>
                <div>
                  <Label htmlFor="period">İş Müddəti</Label>
                  <Input
                    id="period"
                    value={jobForm.period}
                    onChange={(e) => setJobForm({ ...jobForm, period: e.target.value })}
                    placeholder="2020-2024"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="job-description">Ətraflı (İş Təsviri)</Label>
                <Textarea
                  id="job-description"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  rows={4}
                  placeholder="Şirkətdə görülən işlər haqqında ətraflı məlumat"
                />
              </div>
              <Button className="w-full" onClick={handleAddJob}>
                {editingJob ? "Yenilə" : "Əlavə Et"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Şirkət</TableHead>
              <TableHead>Vəzifə</TableHead>
              <TableHead>Yer</TableHead>
              <TableHead>Müddət</TableHead>
              <TableHead>Ətraflı</TableHead>
              <TableHead>Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.company}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.period}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate" title={job.description}>
                    {job.description}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditJob(job)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteJob(job.id)}>
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

export default JobsSection;