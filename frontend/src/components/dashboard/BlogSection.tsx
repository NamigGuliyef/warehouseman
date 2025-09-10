import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Edit2, Plus, Trash2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  author: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
  image: string;
  active?: boolean;
  createdAt?: string;
}

interface BlogForm {
  title: string;
  category: string;
  description: string;
  image: string | File;
  readTime: string;
  author: string;
  active?: boolean;
}

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogForm, setBlogForm] = useState<BlogForm>({
    title: "",
    category: "",
    description: "",
    image: "",
    readTime: "",
    author: "",
    active: false,
  });
  const [loading, setLoading] = useState(false);

  // Blogları API-dən gətir
  useEffect(() => {
    fetch("http://localhost:3000/portfolio/dashboard/blog-posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
        else if (data) setBlogs([data]);
      })
      .catch(() => setBlogs([]));
  }, []);

  // Blog əlavə et (multipart/form-data)
  const handleAddBlog = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("author", blogForm.author);
      formData.append("title", blogForm.title);
      formData.append("category", blogForm.category);
      formData.append("description", blogForm.description);
      formData.append("readTime", blogForm.readTime);
      formData.append("active", String(blogForm.active || false));
      if (blogForm.image) {
        // Əgər image file-dırsa, onu əlavə et
        formData.append("image", blogForm.image);
      }
      const response = await fetch(
        "http://localhost:3000/portfolio/dashboard/blog-posts",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const newBlog = await response.json();
        setBlogs((prev) => [...prev, newBlog]);
        setIsBlogDialogOpen(false);
        setBlogForm({
          title: "",
          category: "",
          description: "",
          image: "",
          readTime: "",
          author: "",
          active: false,
        });
      } else {
        alert("Xəta baş verdi!");
      }
    } catch {
      alert("Serverə qoşulmaq mümkün olmadı!");
    }
    setLoading(false);
  };

  // Blog yenilə (multipart/form-data)
  const handleUpdateBlog = async () => {
    if (!editingBlog) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("author", blogForm.author);
      formData.append("title", blogForm.title);
      formData.append("category", blogForm.category);
      formData.append("description", blogForm.description);
      formData.append("readTime", blogForm.readTime);
      formData.append("active", blogForm.active ? "true" : "false"); // Boolean kimi göndər
      // Şəkil varsa və dəyişibsə, file kimi göndər
      if (blogForm.image && typeof blogForm.image !== "string") {
        formData.append("image", blogForm.image);
      }
      const response = await fetch(
        `http://localhost:3000/portfolio/dashboard/blog-posts/${editingBlog.id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs((prev) =>
          prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        );
        setIsBlogDialogOpen(false);
        setEditingBlog(null);
        setBlogForm({
          title: "",
          category: "",
          description: "",
          image: "",
          readTime: "",
          author: "",
          active: false,
        });
      } else {
        alert("Xəta baş verdi!");
      }
    } catch {
      alert("Serverə qoşulmaq mümkün olmadı!");
    }
    setLoading(false);
  };

  // Blog sil
  const handleDeleteBlog = async (id: number) => {
    if (!window.confirm("Bu blog yazısını silmək istədiyinizə əminsiniz?"))
      return;
    try {
      const response = await fetch(
        `http://localhost:3000/portfolio/dashboard/blog-posts/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Silinmədi!");
      }
    } catch {
      alert("Serverə qoşulmaq olmadı!");
    }
  };

  // Aktivlik dəyişəndə API-ə göndər
const handleToggleActive = async (editingBlog: Blog) => {
  try {
    await fetch(
      `http://localhost:3000/portfolio/dashboard/blog-posts/${editingBlog.id}/toggle-active`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !editingBlog.active }),
      }
    );
    setBlogs(
      blogs.map((b) =>
        b.id === editingBlog.id ? { ...b, active: !editingBlog.active } : b
      )
    );
  } catch {
    alert("Aktivlik dəyişdirilə bilmədi!");
  }
};


  // Şəkil yükləmə
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBlogForm((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Blog İdarəetməsi
        </CardTitle>
        <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingBlog(null);
                setBlogForm({
                  title: "",
                  category: "",
                  description: "",
                  image: "",
                  readTime: "",
                  author: "",
                  active: false,
                });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Yazı Yarat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl h-[580px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBlog ? "Blog Yazısını Redaktə Et" : "Yeni Blog Yazısı"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="blog-author">Müəllif</Label>
                <Input
                  id="blog-author"
                  value={blogForm.author || ""}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, author: e.target.value })
                  }
                  placeholder="Müəllifin adı"
                />
              </div>
              <div>
                <Label htmlFor="blog-title">Başlıq</Label>
                <Input
                  id="blog-title"
                  value={blogForm.title}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="blog-category">Kateqoriya</Label>
                <Input
                  id="blog-category"
                  value={blogForm.category}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, category: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="blog-content">Məzmun</Label>
                <Textarea
                  id="blog-content"
                  value={blogForm.description}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, description: e.target.value })
                  }
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="blog-readTime">Oxuma müddəti</Label>
                <Input
                  id="blog-readTime"
                  value={blogForm.readTime || ""}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, readTime: e.target.value })
                  }
                  placeholder="Məsələn: 5 dəq"
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
                {/* Edit zamanı şəkil görünsün */}
                {blogForm.image && typeof blogForm.image !== "string" && (
                  <div className="mt-2 relative">
                    <img
                      src={URL.createObjectURL(blogForm.image as File)}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
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
                {/* Əgər edit zamanı şəkil stringdirsə (yəni serverdən gələn url) */}
                {editingBlog && blogForm.image && typeof blogForm.image === "string" && (
                  <div className="mt-2 relative">
                    <img
                      src={blogForm.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={!!blogForm.active}
                  onCheckedChange={(checked) =>
                    setBlogForm({ ...blogForm, active: checked })
                  }
                />
                <span>{blogForm.active ? "Aktiv" : "Qeyri-aktiv"}</span>
              </div>
              <Button
                className="w-full"
                onClick={editingBlog ? handleUpdateBlog : handleAddBlog}
                disabled={loading}
              >
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
              <TableHead>Tarix</TableHead>
              <TableHead>Məzmun</TableHead> {/* Yeni sütun */}
              <TableHead>Şəkil</TableHead>
              <TableHead>Aktivlik</TableHead>
              <TableHead>Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleString("az-AZ", {
                        timeZone: "Asia/Baku",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </TableCell>
                <TableCell>
                  {/* Məzmunun ilk 30 simvolunu göstər, sonuna ... əlavə et */}
                  {blog.description
                    ? blog.description.length > 30
                      ? blog.description.slice(0, 30) + "..."
                      : blog.description
                    : "-"}
                </TableCell>
                <TableCell>
                  {blog.image ? (
                    <img
                      src={
                        typeof blog.image === "string"
                          ? blog.image
                          : URL.createObjectURL(blog.image as File)
                      }
                      alt="Blog"
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <span className="text-muted-foreground">Şəkil yoxdur</span>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={!!blog.active}
                    onCheckedChange={() => handleToggleActive(blog)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingBlog(blog);
                        setBlogForm({
                          title: blog.title,
                          category: blog.category,
                          description: blog.description, // Tam məzmunu edit formuna göndər
                          image: blog.image,
                          readTime: blog.readTime,
                          author: blog.author,
                          active: !!blog.active,
                        });
                        setIsBlogDialogOpen(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBlog(blog.id)}
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

export default BlogSection;
