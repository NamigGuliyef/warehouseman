import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
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
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogTitle className="text-2xl font-bold text-primary mb-2">
            {post.title}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed mb-4">
            {post.description}
          </DialogDescription>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.date).toLocaleDateString('az-AZ')}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
            <span>Namiq Quliyev</span>
          </div>
        </DialogHeader>

        {/* Blog Image */}
        <div className="mb-6">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg shadow-card"
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line text-foreground leading-relaxed">
            {post.content}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Məqalə {new Date(post.date).toLocaleDateString('az-AZ')} tarixində dərc edilib
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;