import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  isActive: boolean;
}

interface ProfileSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchProfile: (profileId: string) => void;
  profiles: Profile[];
  currentProfileId: string;
  isLoading?: boolean;
}

export const ProfileSwitchModal = ({
  isOpen,
  onClose,
  onSwitchProfile,
  profiles,
  currentProfileId,
  isLoading = false,
}: ProfileSwitchModalProps) => {
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleProfileClick = (profileId: string) => {
    if (profileId !== currentProfileId) {
      onSwitchProfile(profileId);
    }
    onClose();
  };

  const getProfileInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getProfileColor = (index: number) => {
    const colors = [
      "bg-blue-500", // Blue
      "bg-red-500",  // Red
      "bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500", // Multi-color gradient
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="fixed inset-0 bg-gray-100/95 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-12 max-w-4xl w-full mx-4 relative shadow-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Switch Profile</h2>
          <p className="text-gray-600">Select a profile to continue</p>
        </div>

        {/* Profiles Grid */}
        <div className="flex justify-center gap-12 mb-8">
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading profiles...</p>
            </div>
          ) : (
            profiles.slice(0, 3).map((profile, index) => (
            <div
              key={profile.id}
              className="flex flex-col items-center cursor-pointer group relative"
              onClick={() => handleProfileClick(profile.id)}
              onMouseEnter={() => setHoveredProfile(profile.id)}
              onMouseLeave={() => setHoveredProfile(null)}
            >
              {/* Profile Avatar */}
              <div
                className={`
                  w-32 h-32 rounded-xl flex items-center justify-center text-white text-3xl font-bold
                  transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg
                  ${profile.id === currentProfileId ? "ring-4 ring-blue-500 shadow-lg" : ""}
                  ${getProfileColor(index)}
                `}
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                ) : (
                  getProfileInitials(profile.name)
                )}
              </div>

              {/* Profile Name */}
              <div className="mt-6 text-center">
                <h3 className="text-gray-900 text-xl font-medium">
                  {profile.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{profile.role}</p>
                {profile.id === currentProfileId && (
                  <Badge variant="default" className="mt-2 bg-blue-500 text-white">
                    Current
                  </Badge>
                )}
              </div>

              {/* Hover Effect */}
              {hoveredProfile === profile.id && profile.id !== currentProfileId && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">✓</span>
                </div>
              )}
            </div>
            ))
          )}
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export { ProfileSwitchModal };
export default ProfileSwitchModal;