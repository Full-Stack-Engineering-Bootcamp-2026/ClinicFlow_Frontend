import { Camera } from "lucide-react";
import type { Profile } from "../types/profile";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { logout } from "@/features/auth/authSlice";
import { Badge } from "@/components/ui/badge";

interface Props {
  profile: Profile;
  isEditing: boolean;
  selectedImagePreview: string;
  profileImageUrl: string;
  onEdit: () => void;
  onResetPassword: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileCard = ({
  profile,
  isEditing,
  selectedImagePreview,
  profileImageUrl,
  onEdit,
  onImageChange,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleReset = () => {
    dispatch(logout());
    navigate("/forgot-password");
  };

  const joinedDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 p-6 border shadow-sm bg-card rounded-2xl lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={selectedImagePreview || profileImageUrl || "https://i.pravatar.cc/150?img=12"}
            alt="profile"
            className="object-cover w-24 h-24 border rounded-full"
            onError={(e) => {
              e.currentTarget.src = "https://i.pravatar.cc/150?img=12";
            }}
          />

          {isEditing && (
            <>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 p-2 transition shadow-md cursor-pointer bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
              >
                <Camera size={16} />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={onImageChange}
              />
            </>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground">{profile.name}</h2>
          <p className="mt-2 text-sm font-medium text-primary">
            {profile.officialRole}
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-muted-foreground">{profile.specialization}</span>
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
              {profile.role}
            </Badge>
            <Badge variant="outline">Joined - {joinedDate}</Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
        <button
          onClick={onEdit}
          className="px-5 py-2.5 text-sm font-medium transition rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Edit Profile
        </button>
        <button
          onClick={handleReset}
          className="px-5 py-2.5 text-sm font-medium transition border rounded-lg border-primary text-primary hover:bg-primary/10"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;