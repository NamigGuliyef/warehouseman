
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Award, BookOpen, Users, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProfileSection from "@/components/dashboard/ProfileSection";
import JobsSection from "@/components/dashboard/JobsSection";
import SkillsSection from "@/components/dashboard/SkillsSection";
import CertificatesSection from "@/components/dashboard/CertificatesSection";
import BlogSection from "@/components/dashboard/BlogSection";
import VacanciesSection from "@/components/dashboard/VacanciesSection";

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
      status: "Aktiv",
      schedule: "Tam ştat",
      priority: "Adi"
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
  const [blogForm, setBlogForm] = useState({ title: "", category: "", content: "", image: "", readTime: "", author: "" });
  const [vacancyForm, setVacancyForm] = useState({
    title: "", company: "", location: "", salary: "", deadline: "",
    description: "", requirements: "", link: "", status: "Aktiv", schedule: "Tam ştat", priority: "Adi"
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
    setBlogForm({ title: "", category: "", content: "", image: "", readTime: "", author: "" });
    setIsBlogDialogOpen(false);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({ title: blog.title, category: blog.category, content: blog.content, image: blog.image, readTime: blog.readTime, author: blog.author });
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
    setVacancyForm({ title: "", company: "", location: "", salary: "", deadline: "", description: "", requirements: "", link: "", status: "Aktiv", schedule: "Tam ştat", priority: "Adi" });
    setIsVacancyDialogOpen(false);
  };

  const handleEditVacancy = (vacancy) => {
    setEditingVacancy(vacancy);
    setVacancyForm({
      title: vacancy.title, company: vacancy.company, location: vacancy.location,
      salary: vacancy.salary, deadline: vacancy.deadline, description: vacancy.description,
      requirements: vacancy.requirements, link: vacancy.link, status: vacancy.status, schedule: vacancy.schedule, priority: vacancy.priority
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
          <ProfileSection 
            profile={profile}
            setProfile={setProfile}
            handleSave={handleSave}
          />
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs">
          <JobsSection
            jobs={jobs}
            setJobs={setJobs}
            isJobDialogOpen={isJobDialogOpen}
            setIsJobDialogOpen={setIsJobDialogOpen}
            editingJob={editingJob}
            setEditingJob={setEditingJob}
            jobForm={jobForm}
            setJobForm={setJobForm}
            handleAddJob={handleAddJob}
            handleEditJob={handleEditJob}
            handleDeleteJob={handleDeleteJob}
          />
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <SkillsSection
            skills={skills}
            setSkills={setSkills}
            isSkillDialogOpen={isSkillDialogOpen}
            setIsSkillDialogOpen={setIsSkillDialogOpen}
            editingSkill={editingSkill}
            setEditingSkill={setEditingSkill}
            skillForm={skillForm}
            setSkillForm={setSkillForm}
            handleAddSkill={handleAddSkill}
            handleEditSkill={handleEditSkill}
            handleDeleteSkill={handleDeleteSkill}
          />
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <CertificatesSection
            certificates={certificates}
            setCertificates={setCertificates}
            isCertDialogOpen={isCertDialogOpen}
            setIsCertDialogOpen={setIsCertDialogOpen}
            editingCert={editingCert}
            setEditingCert={setEditingCert}
            certForm={certForm}
            setCertForm={setCertForm}
            handleAddCertificate={handleAddCertificate}
            handleEditCertificate={handleEditCertificate}
            handleDeleteCertificate={handleDeleteCertificate}
            handleFileUpload={handleFileUpload}
          />
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blogs">
          <BlogSection
            blogs={blogs}
            setBlogs={setBlogs}
            isBlogDialogOpen={isBlogDialogOpen}
            setIsBlogDialogOpen={setIsBlogDialogOpen}
            editingBlog={editingBlog}
            setEditingBlog={setEditingBlog}
            blogForm={blogForm}
            setBlogForm={setBlogForm}
            handleAddBlog={handleAddBlog}
            handleEditBlog={handleEditBlog}
            handleDeleteBlog={handleDeleteBlog}
            handleFileUpload={handleFileUpload}
          />
        </TabsContent>

        {/* Vacancies Tab */}
        <TabsContent value="vacancies">
          <VacanciesSection
            vacancies={vacancies}
            setVacancies={setVacancies}
            isVacancyDialogOpen={isVacancyDialogOpen}
            setIsVacancyDialogOpen={setIsVacancyDialogOpen}
            editingVacancy={editingVacancy}
            setEditingVacancy={setEditingVacancy}
            vacancyForm={vacancyForm}
            setVacancyForm={setVacancyForm}
            handleAddVacancy={handleAddVacancy}
            handleEditVacancy={handleEditVacancy}
            handleDeleteVacancy={handleDeleteVacancy}
          />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Dashboard;
