
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, BookOpen, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BlogManagement = () => {
  const { toast } = useToast();
  
  const [blogs, setBlogs] = useState([
    { id: 1, title: "Modern Anbar İdarəetməsi", category: "Texnologiya", status: "Dərc edilib", date: "2024-01-15", image: "", content: "Müasir anbar idarəetməsi metodları haqqında ətraflı məqalə." },
    { id: 2, title: "Logistika Trendləri", category: "Sənaye", status: "Qaralama", date: "2024-01-10", image: "", content: "2024-cü ildə logistika sahəsindəki yeniliklər və trendlər." }
  ]);

  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({ title: "", category: "", content: "", image: "" });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Blog İdarəetməsi</h1>
        <p className="text-muted-foreground mt-2">Blog yazılarınızı idarə edin</p>
      </div>

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
                      onChange={handleFileUpload}
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
    </div>
  );
};

export default BlogManagement;
