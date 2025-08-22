
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, User, Briefcase, Award, BookOpen, Users, FileText, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile State
  const [profile, setProfile] = useState({
    name: "Namiq Quliyev",
    position: "Anbar Mütəxəssisi",
    email: "namiq@example.com",
    phone: "+994 50 123 45 67",
    background: "Təcrübəli anbar mütəxəssisi və logistika uzmanı",
    focus: "Müasir anbar idarəetməsi və logistika texnologiyaları",
    image: ""
  });

  // Jobs State
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "ABC Logistics",
      position: "Anbar Meneceri",
      location: "Bakı",
      period: "2020-2024",
      description: "Anbar əməliyyatlarının idarə edilməsi və komanda koordinasiyası. Inventar idarəetməsi və logistika proseslərinin optimallaşdırılması."
    },
    {
      id: 2,
      company: "XYZ Distribution",
      position: "Logistika Uzmanı",
      location: "Sumqayıt",
      period: "2018-2020",
      description: "Göndərmə və qəbul proseslərinin koordinasiyası. Nəqliyyat marşrutlarının planlaşdırılması və tədarükçü əlaqələrinin idarə edilməsi."
    }
  ]);

  // Skills State
  const [skills, setSkills] = useState([
    { id: 1, name: "Anbar İdarəetməsi", level: "Təcrübəli", category: "İxtisas" },
    { id: 2, name: "SAP WMS", level: "Orta", category: "Proqram" },
    { id: 3, name: "Excel", level: "Təcrübəli", category: "Proqram" }
  ]);

  // Certificates State
  const [certificates, setCertificates] = useState([
    { id: 1, name: "Anbar İdarəetməsi Sertifikatı", organization: "IATA", date: "2023", image: "" },
    { id: 2, name: "Forklift Operatoru", organization: "OHSAS", date: "2022", image: "" }
  ]);

  // Blogs State
  const [blogs, setBlogs] = useState([
    { id: 1, title: "Modern Anbar İdarəetməsi", category: "Texnologiya", status: "Dərc edilib", date: "2024-01-15", image: "", content: "Müasir anbar idarəetməsi metodları haqqında ətraflı məqalə." },
    { id: 2, title: "Logistika Trendləri", category: "Sənaye", status: "Qaralama", date: "2024-01-10", image: "", content: "2024-cü ildə logistika sahəsindəki yeniliklər və trendlər." }
  ]);

  // Vacancies State
  const [vacancies, setVacancies] = useState([
    {
      id: 1,
      title: "Senior Anbar Mütəxəssisi",
      company: "Bravo Supermarket",
      location: "Bakı",
      salary: "2000-3000 AZN",
      deadline: "2024-07-15",
      description: "Anbar əməliyyatlarının həyata keçirilməsi və komanda rəhbərliyi",
      requirements: "5+ il təcrübə, WMS sistemi bilikləri, İngilis dili",
      link: "https://bravo.az/careers",
      status: "Aktiv"
    },
    {
      id: 2,
      title: "Logistika Koordinatoru",
      company: "ASCO Group",
      location: "Sumqayıt",
      salary: "1500-2000 AZN",
      deadline: "2024-08-01",
      description: "Nəqliyyat planlaşdırması və tədarükçü əlaqələri",
      requirements: "Logistika sahəsində təcrübə, Sürücülük vəsiqəsi",
      link: "https://asco.az/careers",
      status: "Qeyri-aktiv"
    }
  ]);

  // Dialog states
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [isVacancyDialogOpen, setIsVacancyDialogOpen] = useState(false);

  // Edit states
  const [editingJob, setEditingJob] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingCert, setEditingCert] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingVacancy, setEditingVacancy] = useState(null);

  // Form states
  const [jobForm, setJobForm] = useState({ company: "", position: "", location: "", period: "", description: "" });
  const [skillForm, setSkillForm] = useState({ name: "", level: "", category: "" });
  const [certForm, setCertForm] = useState({ name: "", organization: "", date: "", image: "" });
  const [blogForm, setBlogForm] = useState({ title: "", category: "", content: "", image: "" });
  const [vacancyForm, setVacancyForm] = useState({
    title: "", company: "", location: "", salary: "", deadline: "",
    description: "", requirements: "", link: "", status: "Aktiv"
  });

  // File upload simulation
  const handleFileUpload = (event, setForm, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // CRUD Functions for Jobs
  const handleAddJob = () => {
    if (editingJob) {
      setJobs(jobs.map(job => job.id === editingJob.id ? { ...jobForm, id: editingJob.id } : job));
      setEditingJob(null);
      toast({ title: "İş təcrübəsi yeniləndi" });
    } else {
      const newJob = { ...jobForm, id: Date.now() };
      setJobs([...jobs, newJob]);
      toast({ title: "Yeni iş təcrübəsi əlavə edildi" });
    }
    setJobForm({ company: "", position: "", location: "", period: "", description: "" });
    setIsJobDialogOpen(false);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setJobForm({ company: job.company, position: job.position, location: job.location, period: job.period, description: job.description });
    setIsJobDialogOpen(true);
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
    toast({ title: "İş təcrübəsi silindi" });
  };

  // CRUD Functions for Skills
  const handleAddSkill = () => {
    if (editingSkill) {
      setSkills(skills.map(skill => skill.id === editingSkill.id ? { ...skillForm, id: editingSkill.id } : skill));
      setEditingSkill(null);
      toast({ title: "Bacarıq yeniləndi" });
    } else {
      const newSkill = { ...skillForm, id: Date.now() };
      setSkills([...skills, newSkill]);
      toast({ title: "Yeni bacarıq əlavə edildi" });
    }
    setSkillForm({ name: "", level: "", category: "" });
    setIsSkillDialogOpen(false);
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillForm({ name: skill.name, level: skill.level, category: skill.category });
    setIsSkillDialogOpen(true);
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
    toast({ title: "Bacarıq silindi" });
  };

  // CRUD Functions for Certificates
  const handleAddCertificate = () => {
    if (editingCert) {
      setCertificates(certificates.map(cert => cert.id === editingCert.id ? { ...certForm, id: editingCert.id } : cert));
      setEditingCert(null);
      toast({ title: "Sertifikat yeniləndi" });
    } else {
      const newCert = { ...certForm, id: Date.now() };
      setCertificates([...certificates, newCert]);
      toast({ title: "Yeni sertifikat əlavə edildi" });
    }
    setCertForm({ name: "", organization: "", date: "", image: "" });
    setIsCertDialogOpen(false);
  };

  const handleEditCertificate = (cert) => {
    setEditingCert(cert);
    setCertForm({ name: cert.name, organization: cert.organization, date: cert.date, image: cert.image });
    setIsCertDialogOpen(true);
  };

  const handleDeleteCertificate = (id) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
    toast({ title: "Sertifikat silindi" });
  };

  // CRUD Functions for Blogs
  const handleAddBlog = () => {
    if (editingBlog) {
      setBlogs(blogs.map(blog => blog.id === editingBlog.id ? { ...blogForm, id: editingBlog.id, date: blog.date, status: blog.status } : blog));
      setEditingBlog(null);
      toast({ title: "Blog yazısı yeniləndi" });
    } else {
      const newBlog = { ...blogForm, id: Date.now(), date: new Date().toISOString().split('T')[0], status: "Qaralama" };
      setBlogs([...blogs, newBlog]);
      toast({ title: "Yeni blog yazısı yaradıldı" });
    }
    setBlogForm({ title: "", category: "", content: "", image: "" });
    setIsBlogDialogOpen(false);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({ title: blog.title, category: blog.category, content: blog.content, image: blog.image });
    setIsBlogDialogOpen(true);
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    toast({ title: "Blog yazısı silindi" });
  };

  // CRUD Functions for Vacancies
  const handleAddVacancy = () => {
    if (editingVacancy) {
      setVacancies(vacancies.map(vacancy => vacancy.id === editingVacancy.id ? { ...vacancyForm, id: editingVacancy.id } : vacancy));
      setEditingVacancy(null);
      toast({ title: "Vakansiya yeniləndi" });
    } else {
      const newVacancy = { ...vacancyForm, id: Date.now() };
      setVacancies([...vacancies, newVacancy]);
      toast({ title: "Yeni vakansiya əlavə edildi" });
    }
    setVacancyForm({ title: "", company: "", location: "", salary: "", deadline: "", description: "", requirements: "", link: "", status: "Aktiv" });
    setIsVacancyDialogOpen(false);
  };

  const handleEditVacancy = (vacancy) => {
    setEditingVacancy(vacancy);
    setVacancyForm({
      title: vacancy.title, company: vacancy.company, location: vacancy.location,
      salary: vacancy.salary, deadline: vacancy.deadline, description: vacancy.description,
      requirements: vacancy.requirements, link: vacancy.link, status: vacancy.status
    });
    setIsVacancyDialogOpen(true);
  };

  const handleDeleteVacancy = (id) => {
    setVacancies(vacancies.filter(vacancy => vacancy.id !== id));
    toast({ title: "Vakansiya silindi" });
  };

  const handleSave = (section) => {
    toast({
      title: "Uğurla yadda saxlanıldı",
      description: `${section} məlumatları yeniləndi`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Sayt məlumatlarınızı idarə edin</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <User className="w-4 h-4 mr-1" />
            Admin
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">İş Təcrübəsi</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Bacarıqlar</span>
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Sertifikatlar</span>
          </TabsTrigger>
          <TabsTrigger value="blogs" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Blog</span>
          </TabsTrigger>
          <TabsTrigger value="vacancies" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Vakansiyalar</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Şəxsi Məlumatlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Ad və Soyad</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="position">Vəzifə</Label>
                  <Input
                    id="position"
                    value={profile.position}
                    onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                {/* Professional Background */}
                <div className="md:col-span-2">
                  <Label htmlFor="background">Professional Background</Label>
                  <Textarea
                    id="background"
                    value={profile.background}
                    onChange={(e) =>
                      setProfile({ ...profile, background: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                {/* Texnoloji Fokus */}
                <div className="md:col-span-2">
                  <Label htmlFor="focus">Texnoloji Fokus</Label>
                  <Textarea
                    id="focus"
                    value={profile.focus}
                    onChange={(e) =>
                      setProfile({ ...profile, focus: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("Profil")} className="w-full md:w-auto">
                Yadda saxla
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs">
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
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Bacarıqlar
              </CardTitle>
              <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingSkill(null);
                    setSkillForm({ name: "", level: "", category: "" });
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Bacarıq Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingSkill ? "Bacarığı Redaktə Et" : "Yeni Bacarıq"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="skill-name">Bacarıq Adı</Label>
                      <Input
                        id="skill-name"
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="skill-level">Səviyyə</Label>
                      <Input
                        id="skill-level"
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                        placeholder="Başlanğıc/Orta/Təcrübəli"
                      />
                    </div>
                    <div>
                      <Label htmlFor="skill-category">Kateqoriya</Label>
                      <Input
                        id="skill-category"
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      />
                    </div>
                    <Button className="w-full" onClick={handleAddSkill}>
                      {editingSkill ? "Yenilə" : "Əlavə Et"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{skill.name}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{skill.category}</Badge>
                        <Badge variant="outline">{skill.level}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditSkill(skill)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteSkill(skill.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Sertifikatlar
              </CardTitle>
              <Dialog open={isCertDialogOpen} onOpenChange={setIsCertDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingCert(null);
                    setCertForm({ name: "", organization: "", date: "", image: "" });
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Sertifikat Əlavə Et
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCert ? "Sertifikatı Redaktə Et" : "Yeni Sertifikat"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cert-name">Sertifikat Adı</Label>
                      <Input
                        id="cert-name"
                        value={certForm.name}
                        onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cert-org">Təşkilat</Label>
                      <Input
                        id="cert-org"
                        value={certForm.organization}
                        onChange={(e) => setCertForm({ ...certForm, organization: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cert-date">Tarix</Label>
                      <Input
                        id="cert-date"
                        value={certForm.date}
                        onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                        placeholder="2023"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cert-image">Sertifikat Şəkli</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="cert-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setCertForm, 'image')}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-primary-foreground"
                        />
                        <Upload className="w-5 h-5 text-muted-foreground" />
                      </div>
                      {certForm.image && (
                        <div className="mt-2 relative">
                          <img src={certForm.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0"
                            onClick={() => setCertForm({ ...certForm, image: "" })}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <Button className="w-full" onClick={handleAddCertificate}>
                      {editingCert ? "Yenilə" : "Əlavə Et"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sertifikat</TableHead>
                    <TableHead>Təşkilat</TableHead>
                    <TableHead>Tarix</TableHead>
                    <TableHead>Şəkil</TableHead>
                    <TableHead>Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">{cert.name}</TableCell>
                      <TableCell>{cert.organization}</TableCell>
                      <TableCell>{cert.date}</TableCell>
                      <TableCell>
                        {cert.image ? (
                          <img src={cert.image} alt="Sertifikat" className="w-10 h-10 object-cover rounded" />
                        ) : (
                          <span className="text-muted-foreground">Şəkil yoxdur</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditCertificate(cert)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteCertificate(cert.id)}>
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
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blogs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Blog İdarəetməsi
              </CardTitle>
              <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingBlog(null);
                    setBlogForm({ title: "", category: "", content: "", image: "" });
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Yazı Yarat
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingBlog ? "Blog Yazısını Redaktə Et" : "Yeni Blog Yazısı"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="blog-title">Başlıq</Label>
                      <Input
                        id="blog-title"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="blog-category">Kateqoriya</Label>
                      <Input
                        id="blog-category"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="blog-content">Məzmun</Label>
                      <Textarea
                        id="blog-content"
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label htmlFor="blog-image">Bloq Şəkli</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="blog-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setBlogForm, 'image')}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-primary-foreground"
                        />
                        <Upload className="w-5 h-5 text-muted-foreground" />
                      </div>
                      {blogForm.image && (
                        <div className="mt-2 relative">
                          <img src={blogForm.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0"
                            onClick={() => setBlogForm({ ...blogForm, image: "" })}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <Button className="w-full" onClick={handleAddBlog}>
                      {editingBlog ? "Yenilə" : "Əlavə Et"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlıq</TableHead>
                    <TableHead>Kateqoriya</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tarix</TableHead>
                    <TableHead>Şəkil</TableHead>
                    <TableHead>Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">{blog.title}</TableCell>
                      <TableCell>{blog.category}</TableCell>
                      <TableCell>
                        <Badge variant={blog.status === "Dərc edilib" ? "default" : "secondary"}>
                          {blog.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{blog.date}</TableCell>
                      <TableCell>
                        {blog.image ? (
                          <img src={blog.image} alt="Blog" className="w-10 h-10 object-cover rounded" />
                        ) : (
                          <span className="text-muted-foreground">Şəkil yoxdur</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditBlog(blog)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteBlog(blog.id)}>
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
        </TabsContent>

        {/* Vacancies Tab */}
        <TabsContent value="vacancies">
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
                        schedule: "Tam ştat", // default
                        priority: "Adi", // default
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
                      {/* İş Qrafiki */}
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
                      {/* Prioritet */}
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
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Dashboard;
