import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Clock, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  _id?: string;
  title: string;
  description: string;
  createdAt: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
  author?: string;
}

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal = ({ post, isOpen, onClose }: BlogModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          {/* Category */}
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{post.category}</Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-bold text-primary mb-4">
            {post.title}
          </DialogTitle>
        </DialogHeader>

        {/* Image */}
        <div className="mb-6">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg shadow-card"
          />
        </div>

        {/* Description */}
        <div className="text-lg text-muted-foreground mb-6">
          {post.description}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line text-foreground leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* Əlavə məlumatlar: Author, Date, ReadTime */}
        <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground flex flex-col gap-2">
          {post.author && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              Müəllif: {post.author}
            </div>
          )}
          {post.createdAt && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Tarix: {new Date(post.createdAt).toLocaleDateString("az-AZ")}
            </div>
          )}
          {post.readTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Oxuma vaxtı: {post.readTime}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
