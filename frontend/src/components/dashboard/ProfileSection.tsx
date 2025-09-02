import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

interface ProfileData {
  name: string;
  position: string;
  email: string;
  phone: string;
  background: string;
  focus: string;
  image: string;
}

interface ProfileSectionProps {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  handleSave: (section: string) => void;
}

const ProfileSection = ({ profile, setProfile, handleSave }: ProfileSectionProps) => {
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
            <Label htmlFor="name">Ad və Soyad</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
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
          <div className="md:col-span-2">
            <Label htmlFor="background">Professional Background</Label>
            <Textarea
              id="background"
              value={profile.background}
              onChange={(e) =>
                setProfile({ ...profile, background: e.target.value })
              }
              rows={3}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="focus">Texnoloji Fokus</Label>
            <Textarea
              id="focus"
              value={profile.focus}
              onChange={(e) =>
                setProfile({ ...profile, focus: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>

        <Button onClick={() => handleSave("Profil")} className="w-full md:w-auto">
          Yadda saxla
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;