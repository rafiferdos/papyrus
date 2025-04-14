/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useCurrentUser } from "@/redux/Features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import userAvatar from "../../assets/user.png";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/Features/userApi";
import toast from "react-hot-toast";

const fields = [
  { label: "Full Name", name: "name" },
  { label: "Email", name: "email" },
  { label: "Phone", name: "phone" },
  { label: "Address", name: "address" },
  { label: "City", name: "city" },
];

export default function MyProfilePage() {
  const { userId }: string | any = useAppSelector(useCurrentUser);

  const { data, isLoading } = useGetUserQuery(userId, {
    skip: !userId,
  });
  const user = data?.data;
  const [editField, setEditField] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    [key: string]: string | undefined;
  }>(user);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user?._id) return;

    const updatedUser = {
      name: formData?.name,
      phone: formData?.phone,
      address: formData?.address,
      city: formData?.city,
    };

    try {
      const result = await updateUser({
        id: user?._id,
        ...updatedUser,
      }).unwrap();
      toast.success(result.message || "Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
    }
    setEditField(null);
  };

  if (isLoading) {
    return <p className="text-center">Loading profile...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10 mt-28">
      {formData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1 relative">
                <Label htmlFor={field.name} className="mb-4">
                  {field.label}
                </Label>
                {editField === field.name ? (
                  <Input
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    autoFocus
                  />
                ) : (
                  <p className="p-2 border rounded bg-gray-500 text-sm">
                    {formData[field.name] || "Not set"}
                  </p>
                )}
                {field.name === "email" ? (
                  ""
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-8 cursor-pointer"
                    onClick={() => setEditField(field.name)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {editField && (
              <div className="col-span-full flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
