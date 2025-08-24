import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddBlogModal = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
    readTime: "",
    author: ""
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!blogForm.title || !blogForm.content) {
      toast({
        title: "Səhv",
        description: "Başlıq və məzmun sahələri mütləqdir",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send to backend
    console.log("New blog post:", blogForm);

    toast({
      title: "Uğurlu!",
      description: "Blog yazınız uğurla yaradıldı və nəzərdən keçirilmək üçün göndərildi"
    });

    // Reset form and close modal
    setBlogForm({ title: "", category: "", content: "", image: "", readTime: "", author: "" });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-industrial">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Bloq Yazısı Yarat
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Blog Yazısı Yarat</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="blog-author">Müəllif</Label>
            <Input
              id="blog-author"
              value={blogForm.author}
              onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
              placeholder="Müəllifin adı"
            />
          </div>
          <div>
            <Label htmlFor="blog-title">Başlıq *</Label>
            <Input
              id="blog-title"
              value={blogForm.title}
              onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              placeholder="Bloq yazısının başlığı"
            />
          </div>
          <div>
            <Label htmlFor="blog-category">Kateqoriya</Label>
            <Input
              id="blog-category"
              value={blogForm.category}
              onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
              placeholder="Məsələn: Texnologiya, Anbar İdarəetməsi"
            />
          </div>
          <div>
            <Label htmlFor="blog-content">Məzmun *</Label>
            <Textarea
              id="blog-content"
              value={blogForm.content}
              onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
              rows={8}
              placeholder="Blog yazısının məzmunu..."
            />
          </div>
          <div>
            <Label htmlFor="blog-readTime">Oxuma müddəti</Label>
            <Input
              id="blog-readTime"
              value={blogForm.readTime}
              onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
              placeholder="Məsələn: 5 dəq"
            />
          </div>
          <div>
            <Label htmlFor="blog-image">Blog Şəkli</Label>
            <div className="flex items-center gap-4">
              <Input
                id="blog-image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-primary-foreground"
              />
              <Upload className="w-5 h-5 text-muted-foreground" />
            </div>
            {blogForm.image && (
              <div className="mt-2 relative">
                <img src={blogForm.image} alt="Preview" className="w-24 h-24 object-cover rounded" />
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
          <div className="text-sm text-muted-foreground">
            <p>* Mütləq sahələr</p>
            <p>Yazınız moderasiya prosesindən keçdikdən sonra dərc ediləcək.</p>
          </div>
          <Button className="w-full" onClick={handleSubmit}>
            Blog Yazısı Yarat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogModal;
