import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Award } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: string;
  category: string;
}

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState({ name: "", level: "", category: "" });

  // Bacarıqları backend-dən al
  useEffect(() => {
    fetch("https://warehouseman-az-back.vercel.app/portfolio/dashboard/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data || []));
  }, []);

  // Bacarıq əlavə et və ya yenilə
  const handleAddSkill = async () => {
    if (!skillForm.name || !skillForm.level || !skillForm.category) return;

    if (editingSkill) {
      // Yenilə
      const response = await fetch(`https://warehouseman-az-back.vercel.app/portfolio/dashboard/skills/${editingSkill.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillForm),
      });
      if (response.ok) {
        const updated = await response.json();
        setSkills((prev) => prev.map((s) => (s.id === editingSkill.id ? updated : s)));
      }
    } else {
      // Əlavə et
      const response = await fetch("https://warehouseman-az-back.vercel.app/portfolio/dashboard/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillForm),
      });
      if (response.ok) {
        const created = await response.json();
        setSkills((prev) => [...prev, created]);
      }
    }
    setSkillForm({ name: "", level: "", category: "" });
    setEditingSkill(null);
    setIsSkillDialogOpen(false);
  };

  // Bacarığı redaktə et
  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm({ name: skill.name, level: skill.level, category: skill.category });
    setIsSkillDialogOpen(true);
  };

  // Bacarığı sil
  const handleDeleteSkill = async (id: string) => {
    const response = await fetch(`https://warehouseman-az-back.vercel.app/portfolio/dashboard/skills/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setSkills((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          Bacarıqlar
        </CardTitle>
        <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingSkill(null);
              setSkillForm({ name: "", level: "", category: "" });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Bacarıq Əlavə Et
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Bacarığı Redaktə Et" : "Yeni Bacarıq"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="skill-name">Bacarıq Adı</Label>
                <Input
                  id="skill-name"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="skill-level">Səviyyə</Label>
                <Input
                  id="skill-level"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  placeholder="Başlanğıc/Orta/Təcrübəli"
                />
              </div>
              <div>
                <Label htmlFor="skill-category">Kateqoriya</Label>
                <Input
                  id="skill-category"
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleAddSkill}>
                {editingSkill ? "Yenilə" : "Əlavə Et"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{skill.name}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{skill.category}</Badge>
                  <Badge variant="outline">{skill.level}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditSkill(skill)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteSkill(skill.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;