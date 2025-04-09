import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";


const user = {
  name: "Humayun Kabir",
  email: "humayun@example.com",
  phone: "01700000000",
  photo: "https://i.pravatar.cc",
  location: "Chattogram, Bangladesh",
  bio: "Frontend Engineer passionate about React and UI/UX.",
  linkedIn: "https://example.com",
  github: "https://example.com",
};

const fields = [
  { label: "Full Name", name: "name" },
  { label: "Email", name: "email" },
  { label: "Phone", name: "phone" },
  { label: "Photo", name: "photo" },      
  { label: "Location", name: "location" },
  { label: "Bio", name: "bio" },
  { label: "LinkedIn", name: "linkedIn" },
  { label: "GitHub", name: "github" }
  ]

export default function MyProfilePage() {
  
  const [editField, setEditField] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string | undefined }>(user);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    //redux logic
    setEditField(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.photo} />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map(field   => (
            <div key={field.name} className="space-y-1 relative">
              <Label htmlFor={field.name}>{field.label}</Label>
              {editField === field.name ? (
                <Input
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  autoFocus
                />
              ) : (
                <p className="p-2 border rounded bg-gray-50 text-sm">
                  {formData[field.name] || "Not set"}
                </p>
              )}
              {
                field.name === "email" ? "" :
                  <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-5 cursor-pointer"
                onClick={() => setEditField(field.name)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              }
            </div>
          ))}
          {editField && (
            <div className="col-span-full flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
