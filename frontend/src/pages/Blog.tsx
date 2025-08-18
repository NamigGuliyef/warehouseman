
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import BlogModal from "@/components/BlogModal";
import AddBlogModal from "@/components/AddBlogModal";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadPost = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const blogPosts = [
    {
      id: 1,
      title: "Anbarda məhsul itkisinin qarşısını necə aldım",
      description: "Anbar məhsul itkilərini 85% azaltmaq üçün tətbiq etdiyim praktiki üsullar və strategiyalar haqqında təcrübə paylaşımı.",
      date: "2024-01-15",
      readTime: "5 dəq",
      category: "Anbar İdarəetməsi",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        Anbar məhsul itkiləri hər bir logistika şirkətinin əsas problemlərindən biridir. 
        Bu məqalədə mənim 3 il ərzində tətbiq etdiyim və nəticələrini gördüyüm üsulları paylaşacağam.

        ## Əsas Problemlər
        - Yanlış inventar sayımı
        - Məhsul yerləşdirilməsində səhvlər  
        - Vaxtında edilməyən yoxlamalar
        - Sistem və fiziki stok arasında uyğunsuzluq

        ## Həll Yolları
        1. **Günlük Inventar Nəzarəti**: Hər gün müəyyən bölmələrin sayımı
        2. **Barcode Sistemi**: QR kod sistemi ilə məhsul izləmə
        3. **ABC Analizi**: Məhsulları dəyərə görə kateqoriyalara ayırma
        4. **Həftəlik Audit**: Mütəmadi yoxlamalar və hesabatlar

        ## Nəticələr
        Bu üsulları tətbiq etdikdən sonra məhsul itkilərimiz 85% azaldı və ümumi anbar effektivliyi 40% artdı.
      `
    },
    {
      id: 2,
      title: "Gündəlik stok hesabatını avtomatlaşdırmaq üçün 3 üsul",
      description: "Manuel stok hesabatlarından avtomatlaşdırılmış sistemlərə keçid prosesi və istifadə etdiyim alətlər.",
      date: "2024-01-10",
      readTime: "7 dəq", 
      category: "Avtomatlaşdırma",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        Manuel stok hesabatları vaxt aparır və səhv ehtimalı yüksəkdir. 
        Bu məqalədə avtomatlaşdırma üçün istifadə etdiyim 3 əsas üsulu təqdim edirəm.

        ## 1. Excel Makroları
        Microsoft Excel-də VBA makroları ilə:
        - Avtomatik hesabat yaratma
        - Email göndərmə
        - Diaqramlar və cədvəllər

        ## 2. Python Skriptləri  
        Python və pandas kitabxanası ilə:
        - CSV fayllarının emalı
        - Verilənlər bazası inteqrasiyası
        - Avtomatik hesabat generasiyası

        ## 3. WMS İnteqrasiyası
        Anbar İdarəetməsi Sistemi ilə:
        - Real-vaxt məlumat alışı
        - Avtomatik xəbərdarlıqlar
        - Dashborad yaratma

        ## Nəticələr
        Bu avtomatlaşdırma ilə gündəlik 3 saatlıq işi 15 dəqiqəyə endirdik.
      `
    },
    {
      id: 3,
      title: "Modern anbar texnologiyaları: RFID vs Barcode",
      description: "RFID və Barcode texnologiyalarının müqayisəsi və hansı hallarda hansının daha effektiv olduğu haqqında.",
      date: "2024-01-05",
      readTime: "6 dəq",
      category: "Texnologiya", 
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        Anbar texnologiyaları sürətlə inkişaf edir. Bu məqalədə RFID və Barcode 
        sistemlərini müqayisə edəcək və hər birinin üstünlüklərini açıqlayacağam.

        ## Barcode Sistemi
        **Üstünlükləri:**
        - Aşağı xərc
        - Asan tətbiq
        - Geniş dəstək

        **Çatışmazlıqları:**
        - Tək-tək skan
        - Fiziki görünmə tələbi
        - Yıpranma riski

        ## RFID Sistemi
        **Üstünlükləri:**
        - Toplu oxuma
        - Fiziki görünmə tələbi yox
        - Dayanıqlılıq

        **Çatışmazlıqları:**
        - Yüksək xərc
        - Texniki mürəkkəblik
        - İnterferens problemi

        ## Tövsiyə
        Kiçik anbarlar üçün Barcode, böyük anbarlar üçün RFID daha uyğundur.
      `
    },
    {
      id: 4,
      title: "Anbar təhlükəsizliyi: 10 qızıl qayda",
      description: "Anbar təhlükəsizliyini təmin etmək üçün vacib qaydalar və tətbiq etdiyim təhlükəsizlik tədbirləri.",
      date: "2023-12-28",
      readTime: "4 dəq",
      category: "Təhlükəsizlik",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      content: `
        Anbar təhlükəsizliyi işçi sağlamlığı və məhsul qorunması üçün kritik vacibdir.
        Bu məqalədə tətbiq etdiyim 10 qızıl qaydanı paylaşıram.

        ## 10 Qızıl Qayda

        1. **Fərdi Qoruyucu Vasitələr**: Həmişə helmet, əlcək və təhlükəsizlik ayaqqabısı
        2. **Düzgün Qaldırma Texnikası**: Arxa əzələləri qorumaq üçün
        3. **Təmiz Keçidlər**: Həmişə açıq və təmiz yollar
        4. **Düzgün Yığma**: Məhsulları düzgün və təhlükəsiz yığma
        5. **Maşın Yoxlaması**: Günlük forklift və digər avadanlıq yoxlaması
        6. **Yanğın Təhlükəsizliyi**: Yanğın söndürücülərin yeri və istifadəsi
        7. **Təlim Proqramları**: Mütəmadi təhlükəsizlik təlimləri
        8. **Hadisə Hesabatı**: Bütün hadisələrin qeydiyyatı
        9. **İlk Yardım**: İlk yardım qutuları və prosedurları
        10. **Mütəmadi Audit**: Təhlükəsizlik yoxlamalarının aparılması

        ## Nəticələr
        Bu qaydaları tətbiq etdikdən sonra anbarda qəza sayı 90% azaldı.
      `
    }
  ];

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
            <AddBlogModal />
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <Card key={post.id} className={`card-3d group cursor-pointer hover:scale-105 transition-all duration-300 ${index === 0 ? 'lg:col-span-2' : ''}`} onClick={() => handleReadPost(post)}>
              <CardHeader>
                {/* Blog Image */}
                <div className="mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg shadow-card"
                  />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="mb-2">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('az-AZ')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {post.description}
                </CardDescription>
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
