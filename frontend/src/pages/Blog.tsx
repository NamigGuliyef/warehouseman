import { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogModal from "@/components/BlogModal";
import AddBlogModal from "@/components/AddBlogModal";

const API_URL = "http://localhost:3000/portfolio/dashboard/blog-posts"; // Backend API URL

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBlogPosts(data);
    } catch (err) {
      console.error("Blogları çəkmək mümkün olmadı:", err);
    }
  };

  const handleReadPost = async (post: any) => {
    try {
      const res = await fetch(`${API_URL}/${post.id}`);
      const data = await res.json();
      setSelectedPost(data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Post yüklənmədi:", err);
    }
  };

  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Logistika Bloqu
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Anbar idarəetməsi və logistika sahəsində təcrübələrim, məsləhətlərim və innovativ həllər haqqında məqalələr
          </p>

          {/* Add Blog Button */}
          <div className="flex justify-center">
            <AddBlogModal onBlogAdded={fetchBlogs} />
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <Card
              key={post._id}
              className={`card-3d group cursor-pointer hover:scale-105 transition-all duration-300 ${index === 0 ? 'lg:col-span-2' : ''}`}
              onClick={() => handleReadPost(post)}
            >
              <CardHeader>
                <div className="mb-4">
                  <img
                    src={post.image || "https://via.placeholder.com/1200x800"}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg shadow-card"
                  />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{post.category || "Ümumi"}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date || post.createdAt).toLocaleDateString("az-AZ")}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime || "5 dəq"}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Namiq Quliyev</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadPost(post);
                    }}
                  >
                    Oxu
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="btn-industrial">
            Daha çox məqalə yüklə
          </Button>
        </div>
      </div>

      {/* Blog Modal */}
      <BlogModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Blog;
