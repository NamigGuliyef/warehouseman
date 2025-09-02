import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Award } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  level: string;
  category: string;
}

interface SkillForm {
  name: string;
  level: string;
  category: string;
}

interface SkillsSectionProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  isSkillDialogOpen: boolean;
  setIsSkillDialogOpen: (open: boolean) => void;
  editingSkill: Skill | null;
  setEditingSkill: (skill: Skill | null) => void;
  skillForm: SkillForm;
  setSkillForm: (form: SkillForm) => void;
  handleAddSkill: () => void;
  handleEditSkill: (skill: Skill) => void;
  handleDeleteSkill: (id: number) => void;
}

const SkillsSection = ({
  skills,
  isSkillDialogOpen,
  setIsSkillDialogOpen,
  editingSkill,
  setEditingSkill,
  skillForm,
  setSkillForm,
  handleAddSkill,
  handleEditSkill,
  handleDeleteSkill,
}: SkillsSectionProps) => {
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