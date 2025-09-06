import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileData {
  id?: string;
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
  id?: string; // Profilin id-si (backend-dən gəlir)
}

const ProfileSection = ({ profile, setProfile, id }: ProfileSectionProps) => {
  const [loading, setLoading] = useState(false);

  // isEdit avtomatik profile.id-yə əsaslansın
  const isEdit = !!profile.id;

  // Əsas inputlar dolu olduqda düzəliş aktiv olsun
  const canEdit =
    isEdit &&
    !!profile.fullName &&
    !!profile.position &&
    !!profile.phone &&
    !!profile.email;

  useEffect(() => {
    fetch("http://localhost:3000/portfolio/dashboard/warehouseman")
      .then((res) => res.json())
      .then((data) => {
        // Əgər array-dırsa, ilkini götür
        const profileData = Array.isArray(data) ? data[0] : data;
        if (profileData) {
          setProfile({
            id: profileData._id || profileData.id || "", // <-- Mütləq id-ni yazın!
            fullName: profileData.fullName || "",
            position: profileData.position || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            profBackground: profileData.profBackground || "",
            technologyFocus: profileData.technologyFocus || "",
            experienceYears: profileData.experienceYears || "",
            managedProducts: profileData.managedProducts || "",
            solvedLogistics: profileData.solvedLogistics || "",
            efficiencyRate: profileData.efficiencyRate || "",
          });
        }
      });
  }, []);

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

  // Profil yeniləmək üçün API
  const handleUpdateProfile = async () => {
    if (!profile.id) {
      alert("Profil ID tapılmadı!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/portfolio/dashboard/warehouseman/${profile.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: profile.fullName,
            email: profile.email,
            position: profile.position,
            phone: profile.phone,
            profBackground: profile.profBackground,
            technologyFocus: profile.technologyFocus,
            experienceYears: profile.experienceYears,
            managedProducts: profile.managedProducts,
            solvedLogistics: profile.solvedLogistics,
            efficiencyRate: profile.efficiencyRate
          }),
        }
      );

      if (response.ok) {
        alert("Profil uğurla yeniləndi!");
      } else {
        const errData = await response.json();
        console.error("Backend xətası:", errData);
        alert("Yeniləmə zamanı xəta baş verdi!");
      }
    } catch (err) {
      console.error("Fetch xətası:", err);
      alert("Serverə qoşulmaq mümkün olmadı!");
    } finally {
      setLoading(false);
    }
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
        <div className="flex gap-4">
          <Button
            onClick={handleCreateProfile}
            className="w-full md:w-auto"
            disabled={loading || isEdit}
          >
            {loading ? "Yüklənir..." : "Yeni profil yarat"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleUpdateProfile}
            className="w-full md:w-auto"
            disabled={loading || !canEdit}
          >
            {loading ? "Yenilənir..." : "Profilə düzəliş et"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;