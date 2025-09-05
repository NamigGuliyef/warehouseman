import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { useState } from "react";

interface ProfileData {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  profBackground: string;
  technologyFocus: string;
  experienceYears?: string;
  managedProducts?: string;
  solvedLogistics?: string;
  efficiencyRate?: string;
}

interface ProfileSectionProps {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
}

const ProfileSection = ({ profile, setProfile }: ProfileSectionProps) => {
  const [loading, setLoading] = useState(false);

  // Yeni anbardar profili yaratmaq üçün API bağlantısı
  const handleCreateProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/portfolio/dashboard/warehouseman", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          position: profile.position,
          profBackground: profile.profBackground,
          technologyFocus: profile.technologyFocus,
          experienceYears: profile.experienceYears,
          managedProducts: profile.managedProducts,
          solvedLogistics: profile.solvedLogistics,
          efficiencyRate: profile.efficiencyRate
        })
      });
      if (response.ok) {
        alert("Profil uğurla yaradıldı!");
      } else {
        alert("Xəta baş verdi!");
      }
    } catch (error) {
      alert("Serverə qoşulmaq mümkün olmadı!");
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Şəxsi Məlumatlar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Ad və Soyad</Label>
            <Input
              id="fullName"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="position">Vəzifə</Label>
            <Input
              id="position"
              value={profile.position}
              onChange={(e) => setProfile({ ...profile, position: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="experienceYears">Təcrübə (il)</Label>
            <Input
              id="experienceYears"
              value={profile.experienceYears || ""}
              onChange={(e) => setProfile({ ...profile, experienceYears: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="managedProducts">İdarə olunan məhsul</Label>
            <Input
              id="managedProducts"
              value={profile.managedProducts || ""}
              onChange={(e) => setProfile({ ...profile, managedProducts: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="solvedLogistics">Həll edilmiş logistik məsələ</Label>
            <Input
              id="solvedLogistics"
              value={profile.solvedLogistics || ""}
              onChange={(e) => setProfile({ ...profile, solvedLogistics: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="efficiencyRate">Effektivlik dərəcəsi</Label>
            <Input
              id="efficiencyRate"
              value={profile.efficiencyRate || ""}
              onChange={(e) => setProfile({ ...profile, efficiencyRate: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="profBackground">Professional Background</Label>
            <Textarea
              id="profBackground"
              value={profile.profBackground}
              onChange={(e) =>
                setProfile({ ...profile, profBackground: e.target.value })
              }
              rows={3}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="technologyFocus">Texnoloji Fokus</Label>
            <Textarea
              id="technologyFocus"
              value={profile.technologyFocus}
              onChange={(e) =>
                setProfile({ ...profile, technologyFocus: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>
        <Button onClick={handleCreateProfile} className="w-full md:w-auto" disabled={loading}>
          {loading ? "Yüklənir..." : "Yeni profil yarat"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;