import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Upload, X, BookOpen } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  category: string;
  status: string;
  date: string;
  image: string;
  content: string;
}

interface BlogForm {
  title: string;
  category: string;
  content: string;
  image: string;
  readTime: string;
  author: string;
}

interface BlogSectionProps {
  blogs: Blog[];
  setBlogs: (blogs: Blog[]) => void;
  isBlogDialogOpen: boolean;
  setIsBlogDialogOpen: (open: boolean) => void;
  editingBlog: Blog | null;
  setEditingBlog: (blog: Blog | null) => void;
  blogForm: BlogForm;
  setBlogForm: (form: BlogForm) => void;
  handleAddBlog: () => void;
  handleEditBlog: (blog: Blog) => void;
  handleDeleteBlog: (id: number) => void;
  handleFileUpload: (event: any, setForm: any, field: string) => void;
}

const BlogSection = ({
  blogs,
  isBlogDialogOpen,
  setIsBlogDialogOpen,
  editingBlog,
  setEditingBlog,
  blogForm,
  setBlogForm,
  handleAddBlog,
  handleEditBlog,
  handleDeleteBlog,
  handleFileUpload,
}: BlogSectionProps) => {
  return (
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
              setBlogForm({ title: "", category: "", content: "", image: "", readTime: "", author: "" });
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
                <Label htmlFor="blog-author">Müəllif</Label>
                <Input
                  id="blog-author"
                  value={blogForm.author || ""}
                  onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  placeholder="Müəllifin adı"
                />
              </div>
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
                <Label htmlFor="blog-readTime">Oxuma müddəti</Label>
                <Input
                  id="blog-readTime"
                  value={blogForm.readTime || ""}
                  onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
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
  );
};

export default BlogSection;