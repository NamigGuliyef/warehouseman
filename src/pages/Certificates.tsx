
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, FileText, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Certificates = () => {
  const { toast } = useToast();
  
  const [certificates, setCertificates] = useState([
    { id: 1, name: "Anbar İdarəetməsi Sertifikatı", organization: "IATA", date: "2023", image: "" },
    { id: 2, name: "Forklift Operatoru", organization: "OHSAS", date: "2022", image: "" }
  ]);

  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [certForm, setCertForm] = useState({ name: "", organization: "", date: "", image: "" });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Sertifikatlar</h1>
        <p className="text-muted-foreground mt-2">Sertifikatlarınızı idarə edin</p>
      </div>

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
    </div>
  );
};

export default Certificates;
