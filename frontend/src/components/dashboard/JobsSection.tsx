import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface Job {
  id?: string;
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

const JobsSection = ({ warehousemanId }: { warehousemanId: string }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState<JobForm>({
    company: "",
    position: "",
    location: "",
    period: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  // Fetch jobs from API
  useEffect(() => {
    fetch("http://localhost:3000/portfolio/dashboard/work-experience")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setJobs(data);
        else if (data) setJobs([data]);
      })
      .catch(() => setJobs([]));
  }, []);

  // Add new job experience
  const handleAddJob = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/portfolio/dashboard/work-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      });
      if (response.ok) {
        const newJob = await response.json();
        setJobs((prev) => [...prev, newJob]);
        setIsJobDialogOpen(false);
        setJobForm({
          company: "",
          position: "",
          location: "",
          period: "",
          description: ""
        });
      } else {
        alert("Xəta baş verdi!");
      }
    } catch {
      alert("Serverə qoşulmaq mümkün olmadı!");
    }
    setLoading(false);
  };

  // Edit job
  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setJobForm({
      company: job.company,
      position: job.position,
      location: job.location,
      period: job.period,
      description: job.description
    });
    setIsJobDialogOpen(true);
  };

  // Delete job
  const handleDeleteJob = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Bu iş təcrübəsini silmək istədiyinizə əminsiniz?")) return;
    try {
      const response = await fetch(`http://localhost:3000/portfolio/dashboard/work-experience/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setJobs((prev) => prev.filter((job) => job.id !== id));
      } else {
        alert("Silinmə zamanı xəta baş verdi!");
      }
    } catch {
      alert("Serverə qoşulmaq mümkün olmadı!");
    }
  };

  // Update job (edit zamanı)
  const handleUpdateJob = async () => {
    if (!editingJob?.id) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/portfolio/dashboard/work-experience/${editingJob.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      });
      if (response.ok) {
        const updatedJob = await response.json();
        setJobs((prev) =>
          prev.map((job) => (job.id === editingJob.id ? updatedJob : job))
        );
        setIsJobDialogOpen(false);
        setEditingJob(null);
        setJobForm({
          company: "",
          position: "",
          location: "",
          period: "",
          description: ""
        });
      } else {
        alert("Yeniləmə zamanı xəta baş verdi!");
      }
    } catch {
      alert("Serverə qoşulmaq mümkün olmadı!");
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          İş Təcrübəsi
        </CardTitle>
        <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingJob(null);
                setJobForm({
                  company: "",
                  position: "",
                  location: "",
                  period: "",
                  description: ""
                });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni İş Əlavə Et
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni İş Təcrübəsi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Şirkət</Label>
                  <Input
                    id="company"
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="position">Vəzifə</Label>
                  <Input
                    id="position"
                    value={jobForm.position}
                    onChange={(e) => setJobForm({ ...jobForm, position: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Şəhər</Label>
                  <Input
                    id="location"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="period">Dövriyyə</Label>
                  <Input
                    id="period"
                    value={jobForm.period}
                    onChange={(e) => setJobForm({ ...jobForm, period: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Açıqlama</Label>
                  <Textarea
                    id="description"
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              <Button
                onClick={editingJob ? handleUpdateJob : handleAddJob}
                disabled={loading}
                className="w-full md:w-auto"
              >
                {loading ? "Yüklənir..." : editingJob ? "Yenilə" : "Əlavə et"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Şirkət</TableCell>
              <TableCell>Vəzifə</TableCell>
              <TableCell>Şəhər</TableCell>
              <TableCell>Dövriyyə</TableCell>
              <TableCell>Açıqlama</TableCell>
              <TableCell>Əməliyyatlar</TableCell> {/* Əməliyyatlar sütunu əlavə olundu */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, idx) => (
              <TableRow key={idx}>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.period}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditJob(job)}
                    >
                      Redaktə
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      Sil
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