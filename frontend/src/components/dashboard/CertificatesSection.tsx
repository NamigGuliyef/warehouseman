import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Upload, X, FileText } from "lucide-react";

interface Certificate {
  id: string;
  name: string;
  organization: string;
  date: string;
  image: string; // URL və ya base64
}

interface CertificateForm {
  name: string;
  organization: string;
  date: string;
  image: string; // preview üçün
  file?: File | null; // yalnız göndərmək üçün
}

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [certForm, setCertForm] = useState<CertificateForm>({ name: "", organization: "", date: "", image: "", file: null });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sertifikatları backend-dən al
  useEffect(() => {
    fetch("https://warehouseman-az-back.vercel.app/portfolio/dashboard/certificates")
      .then((res) => res.json())
      .then((data) => setCertificates(data || []));
  }, []);

  // Sertifikat əlavə et və ya yenilə
  const handleAddCertificate = async () => {
    if (!certForm.name || !certForm.organization || !certForm.date) return;

    const formData = new FormData();
    formData.append("name", certForm.name);
    formData.append("organization", certForm.organization);
    formData.append("date", certForm.date);
    if (certForm.file) {
      formData.append("image", certForm.file);
    }

    if (editingCert) {
      // Yenilə
      const response = await fetch(`https://warehouseman-az-back.vercel.app/portfolio/dashboard/certificates/${editingCert.id}`, {
        method: "PATCH",
        body: formData,
      });
      if (response.ok) {
        const updated = await response.json();
        setCertificates((prev) => prev.map((c) => (c.id === editingCert.id ? updated : c)));
      }
    } else {
      // Əlavə et
      const response = await fetch("https://warehouseman-az-back.vercel.app/portfolio/dashboard/certificates", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const created = await response.json();
        setCertificates((prev) => [...prev, created]);
      }
    }
    setCertForm({ name: "", organization: "", date: "", image: "", file: null });
    setEditingCert(null);
    setIsCertDialogOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Sertifikatı redaktə et
  const handleEditCertificate = (cert: Certificate) => {
    setEditingCert(cert);
    setCertForm({
      name: cert.name,
      organization: cert.organization,
      date: cert.date,
      image: cert.image,
      file: null,
    });
    setIsCertDialogOpen(true);
  };

  // Sertifikatı sil
  const handleDeleteCertificate = async (id: string) => {
    const response = await fetch(`https://warehouseman-az-back.vercel.app/portfolio/dashboard/certificates/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setCertificates((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Fayl yükləmə
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCertForm((prev) => ({ ...prev, file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
              setCertForm({ name: "", organization: "", date: "", image: "", file: null });
              if (fileInputRef.current) fileInputRef.current.value = "";
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
                    ref={fileInputRef}
                    onChange={handleFileUpload}
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
                      onClick={() => {
                        setCertForm({ ...certForm, image: "", file: null });
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
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
  );
};

export default CertificatesSection;