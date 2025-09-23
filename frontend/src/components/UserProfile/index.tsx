import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Edit,
  Save,
  Camera,
  Search,
  FileCheck,
  X,
  Users,
} from "lucide-react";
import { useRouter } from "next/router";
import { SuggestUniversitiesModal } from "@/components/SuggestUniversitiesModal";
import { ImproveCVModal } from "@/components/ImproveCVModal";
import { ProfileSwitchModal } from "@/components/ProfileSwitchModal";
import { useUser } from "@/contexts/UserContext";
import { userApi } from "@/utils/api";

export const UserProfile = () => {
  const router = useRouter();
  const { user, updateUser } = useUser();

  // State for Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    dateOfBirth: user?.dateOfBirth || "2005-06-15",
    nationality: user?.nationality || "American",
  });

  const [academicInfo, setAcademicInfo] = useState({
    gpa: "3.8/4.0",
    school: "International High School",
    graduationYear: "2024",
    major: "Computer Science",
  });

  // State for Areas of Interest
  const [interests, setInterests] = useState([
    "Computer Science",
    "Engineering",
    "Research",
    "Innovation",
  ]);

  // State for new interest input
  const [newInterest, setNewInterest] = useState("");

  // State for editing
  const [isEditing, setIsEditing] = useState(false);

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );

  // State for AI modals
  const [isSuggestUniversitiesOpen, setIsSuggestUniversitiesOpen] =
    useState(false);
  const [isImproveCVOpen, setIsImproveCVOpen] = useState(false);

  // State for profile switching
  const [isProfileSwitchOpen, setIsProfileSwitchOpen] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState(
    user?.id || ""
  ); // Current user's ID
  const [profiles, setProfiles] = useState<Record<string, unknown>[]>([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);

  // Load profiles from backend
  const loadProfiles = async () => {
    try {
      setIsLoadingProfiles(true);
      const users = await userApi.getAll();
      const profilesData = users.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: "Student",
        isActive: true,
        personalInfo: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone || "",
          dateOfBirth: user.dateOfBirth || "",
          nationality: user.nationality || "",
        },
        academicInfo: user.academicInfo,
        interests: user.areasOfInterest || [],
      }));
      setProfiles(profilesData);
    } catch (error) {
      console.error("Error loading profiles:", error);
    } finally {
      setIsLoadingProfiles(false);
    }
  };

  // Sync with user context
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || "John",
        lastName: user.lastName || "Doe",
        email: user.email || "john.doe@example.com",
        phone: user.phone || "+1 (555) 123-4567",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : "2005-06-15",
        nationality: user.nationality || "American",
      });

      if (user.academicInfo) {
        setAcademicInfo({
          gpa: user.academicInfo.gpa?.toString() || "",
          school: user.academicInfo.highSchoolName || "",
          graduationYear: user.academicInfo.graduationYear?.toString() || "",
          major: user.academicInfo.intendedMajors?.[0] || "Computer Science",
        });
      }

      if (user.areasOfInterest) {
        setInterests(user.areasOfInterest);
      }

      // Update current profile ID when user changes
      if (user.id) {
        setCurrentProfileId(user.id);
      }
    }
  }, [user]);

  // Load profiles on component mount
  useEffect(() => {
    loadProfiles();
  }, []);

  // Load data from localStorage on component mount (user-specific)
  useEffect(() => {
    if (user?.id) {
      try {
        const savedProfile = localStorage.getItem(`userProfile_${user.id}`);
        if (savedProfile) {
          const profileData = JSON.parse(savedProfile);
          setPersonalInfo(profileData.personalInfo || personalInfo);
          setAcademicInfo(profileData.academicInfo || academicInfo);
          setInterests(profileData.interests || interests);
          setProfilePicture(profileData.profilePicture || null);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    }
  }, [user?.id]);

  // Save data to localStorage whenever data changes (user-specific)
  useEffect(() => {
    if (user?.id) {
      try {
        const profileData = {
          personalInfo,
          academicInfo,
          interests,
          profilePicture,
        };
        localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(profileData));
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  }, [personalInfo, academicInfo, interests, profilePicture, user?.id]);

  // Handler functions
  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAcademicInfoChange = (field: string, value: string) => {
    setAcademicInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests(prev => [...prev, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(prev =>
      prev.filter(interest => interest !== interestToRemove)
    );
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setProfilePictureFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target?.result as string;
        setProfilePicture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setProfilePictureFile(null);
    if (user?.id) {
      localStorage.removeItem(`userProfilePicture_${user.id}`);
    }
  };

  const handleSave = async () => {
    try {
      // Validate and prepare academic info
      const gpa = academicInfo.gpa ? parseFloat(academicInfo.gpa) : undefined;
      const graduationYear = academicInfo.graduationYear
        ? parseInt(academicInfo.graduationYear)
        : undefined;

      // Only include academicInfo if we have valid data
      const academicInfoData =
        (gpa !== undefined && gpa >= 0 && gpa <= 4) ||
        academicInfo.school ||
        (graduationYear !== undefined && graduationYear >= 1900) ||
        academicInfo.major
          ? {
              ...(gpa !== undefined && gpa >= 0 && gpa <= 4 && { gpa }),
              ...(academicInfo.school && {
                highSchoolName: academicInfo.school,
              }),
              ...(graduationYear !== undefined &&
                graduationYear >= 1900 && { graduationYear }),
              ...(academicInfo.major && {
                intendedMajors: [academicInfo.major],
              }),
            }
          : undefined;

      // Validate email format
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (personalInfo.email && !emailRegex.test(personalInfo.email)) {
        alert("Please enter a valid email address");
        return;
      }

      const updatedUserData = {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        dateOfBirth: personalInfo.dateOfBirth,
        nationality: personalInfo.nationality,
        personalInfo: personalInfo,
        ...(academicInfoData && { academicInfo: academicInfoData }),
        areasOfInterest: interests,
      };

      // Update user context
      updateUser(updatedUserData);

      // Save to backend if user has an ID
      if (user?.id) {
        try {
          console.log("Sending user data to backend:", {
            userId: user.id,
            data: updatedUserData,
          });
          
          // Update basic user info
          await userApi.update(user.id, {
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            email: personalInfo.email,
            phone: personalInfo.phone,
            dateOfBirth: personalInfo.dateOfBirth,
            nationality: personalInfo.nationality,
            personalInfo: personalInfo,
          });

          // Update academic info if available
          if (academicInfoData) {
            await userApi.updateAcademicInfo(user.id, academicInfoData);
          }

          // Update areas of interest
          await userApi.updateAreasOfInterest(user.id, interests);

          console.log("Profile saved to backend successfully");
        } catch (apiError: unknown) {
          console.error("Error saving to backend:", apiError);

          // Try to extract meaningful error message
          let errorMessage = "Failed to update profile. Please try again.";
          if (apiError instanceof Error && apiError.message) {
            errorMessage = apiError.message;
          }

          alert(`Error: ${errorMessage}`);
          // Continue with local storage even if backend fails
        }
      }

      // Save all data to localStorage as backup (user-specific)
      if (user?.id) {
        localStorage.setItem(`userPersonalInfo_${user.id}`, JSON.stringify(personalInfo));
        localStorage.setItem(`userAcademicInfo_${user.id}`, JSON.stringify(academicInfo));
        localStorage.setItem(`userInterests_${user.id}`, JSON.stringify(interests));
        if (profilePicture) {
          localStorage.setItem(`userProfilePicture_${user.id}`, profilePicture);
        }
      }

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    }
  };

  const handleSwitchProfile = async (profileId: string) => {
    // Save current user's data before switching if there are unsaved changes
    if (isEditing) {
      try {
        await handleSave();
      } catch (error) {
        console.error("Error saving current profile before switching:", error);
        // Continue with switch even if save fails
      }
    }

    setCurrentProfileId(profileId);

    // Load the selected profile's data from backend
    try {
      const selectedUser = await userApi.getById(profileId);

      // Update personal information
      setPersonalInfo({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        phone: selectedUser.phone || "",
        dateOfBirth: selectedUser.dateOfBirth ? selectedUser.dateOfBirth.split('T')[0] : "",
        nationality: selectedUser.nationality || "",
      });

      // Update academic information - always reset to ensure clean state
      setAcademicInfo({
        gpa: selectedUser.academicInfo?.gpa?.toString() || "",
        school: selectedUser.academicInfo?.highSchoolName || "",
        graduationYear:
          selectedUser.academicInfo?.graduationYear?.toString() || "",
        major: selectedUser.academicInfo?.intendedMajors?.[0] || "",
      });

      // Update interests
      setInterests(selectedUser.areasOfInterest || []);

      // Update user context with selected profile
      updateUser(selectedUser);

      // Save to localStorage
      try {
        const profileData = {
          personalInfo: {
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            email: selectedUser.email,
            phone: selectedUser.phone || "",
            dateOfBirth: selectedUser.dateOfBirth ? selectedUser.dateOfBirth.split('T')[0] : "",
            nationality: selectedUser.nationality || "",
          },
          academicInfo: {
            gpa: selectedUser.academicInfo?.gpa?.toString() || "0",
            school: selectedUser.academicInfo?.highSchoolName || "",
            graduationYear:
              selectedUser.academicInfo?.graduationYear?.toString() || "",
            major: selectedUser.academicInfo?.intendedMajors?.[0] || "",
          },
          interests: selectedUser.areasOfInterest || [],
          profilePicture: null,
        };
        localStorage.setItem(`userProfile_${selectedUser.id}`, JSON.stringify(profileData));
      } catch (error) {
        console.error("Error saving profile data:", error);
      }
    } catch (error) {
      console.error("Error loading user from backend:", error);
      // Fallback to hardcoded profile data if backend fails
      const selectedProfile = profiles.find(p => p.id === profileId);
      if (selectedProfile) {
        setPersonalInfo({
          firstName:
            ((selectedProfile.personalInfo as Record<string, unknown>)
              .firstName as string) || "",
          lastName:
            ((selectedProfile.personalInfo as Record<string, unknown>)
              .lastName as string) || "",
          email:
            ((selectedProfile.personalInfo as Record<string, unknown>)
              .email as string) || "",
          phone:
            ((selectedProfile.personalInfo as Record<string, unknown>)
              .phone as string) || "",
          dateOfBirth:
            ((selectedProfile.personalInfo as Record<string, unknown>)
              .dateOfBirth as string) || "",
          nationality:
            ((selectedProfile.personalInfo as Record<string, unknown>)
              .nationality as string) || "",
        });
        setAcademicInfo({
          gpa:
            (
              selectedProfile.academicInfo as Record<string, unknown>
            ).gpa?.toString() || "",
          school:
            ((selectedProfile.academicInfo as Record<string, unknown>)
              .highSchoolName as string) || "",
          graduationYear:
            (
              selectedProfile.academicInfo as Record<string, unknown>
            ).graduationYear?.toString() || "",
          major:
            ((selectedProfile.academicInfo as Record<string, unknown>)
              .major as string) || "",
        });
        setInterests(selectedProfile.interests as string[]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {personalInfo.firstName} {personalInfo.lastName}&apos;s Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and academic details
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {personalInfo.firstName.charAt(0)}
                      {personalInfo.lastName.charAt(0)}
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2 flex gap-1">
                      <Button
                        size="sm"
                        className="rounded-full w-8 h-8 p-0"
                        onClick={() =>
                          document
                            .getElementById("profilePictureInput")
                            ?.click()
                        }
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                      {profilePicture && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-full w-8 h-8 p-0"
                          onClick={removeProfilePicture}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                  <input
                    id="profilePictureInput"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h2>
                <p className="text-muted-foreground mb-2">
                  {personalInfo.email}
                </p>
                <Badge variant="secondary">Student</Badge>
              </CardContent>
            </Card>

            {/* Academic Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Current GPA</Label>
                  {isEditing ? (
                    <Input
                      value={academicInfo.gpa}
                      onChange={e =>
                        setAcademicInfo(prev => ({
                          ...prev,
                          gpa: e.target.value,
                        }))
                      }
                      placeholder="e.g., 3.8/4.0"
                      className="text-2xl font-bold text-primary"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-primary">
                      {academicInfo.gpa}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">School</Label>
                  {isEditing ? (
                    <Input
                      value={academicInfo.school}
                      onChange={e =>
                        setAcademicInfo(prev => ({
                          ...prev,
                          school: e.target.value,
                        }))
                      }
                      placeholder="Enter school name"
                    />
                  ) : (
                    <p className="text-sm">{academicInfo.school}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Graduation Year</Label>
                  {isEditing ? (
                    <Input
                      value={academicInfo.graduationYear}
                      onChange={e =>
                        setAcademicInfo(prev => ({
                          ...prev,
                          graduationYear: e.target.value,
                        }))
                      }
                      placeholder="e.g., 2024"
                    />
                  ) : (
                    <p className="text-sm">{academicInfo.graduationYear}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Intended Major</Label>
                  {isEditing ? (
                    <Input
                      value={academicInfo.major}
                      onChange={e =>
                        setAcademicInfo(prev => ({
                          ...prev,
                          major: e.target.value,
                        }))
                      }
                      placeholder="e.g., Computer Science"
                    />
                  ) : (
                    <p className="text-sm">{academicInfo.major}</p>
                  )}
                </div>

                {/* AI University Suggestions */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => router.push("/ai-suggestions")}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Suggest Universities
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => router.push("/prepare/documents")}
                    >
                      <FileCheck className="h-4 w-4 mr-2" />
                      Improve CV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Personal Information</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={e =>
                        handlePersonalInfoChange("firstName", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={e =>
                        handlePersonalInfoChange("lastName", e.target.value)
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={e =>
                      handlePersonalInfoChange("email", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={e =>
                      handlePersonalInfoChange("phone", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={e =>
                      handlePersonalInfoChange("dateOfBirth", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={personalInfo.nationality}
                    onChange={e =>
                      handlePersonalInfoChange("nationality", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Areas of Interest</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Areas of Interest
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {interest}
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInterest(interest)}
                            className="h-4 w-4 p-0 text-red-600 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
                {isEditing && (
                  <div>
                    <Label htmlFor="newInterest">Add Interest</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="newInterest"
                        placeholder="Enter new interest"
                        value={newInterest}
                        onChange={e => setNewInterest(e.target.value)}
                        onKeyPress={e => e.key === "Enter" && addInterest()}
                      />
                      <Button size="sm" onClick={addInterest}>
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end">
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}

            {/* Switch Profile Button */}
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setIsProfileSwitchOpen(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Switch Profile
              </Button>
            </div>
          </div>
        </div>

        {/* AI Modals */}
        <SuggestUniversitiesModal
          isOpen={isSuggestUniversitiesOpen}
          onClose={() => setIsSuggestUniversitiesOpen(false)}
          userProfile={{
            personalInfo,
            academicInfo,
            interests,
          }}
        />

        <ImproveCVModal
          isOpen={isImproveCVOpen}
          onClose={() => setIsImproveCVOpen(false)}
          userProfile={{
            personalInfo,
            academicInfo,
            interests,
          }}
        />

        {/* Profile Switch Modal */}
        <ProfileSwitchModal
          isOpen={isProfileSwitchOpen}
          onClose={() => setIsProfileSwitchOpen(false)}
          onSwitchProfile={handleSwitchProfile}
          profiles={profiles.map(profile => ({
            id: profile.id as string,
            name: profile.name as string,
            email: profile.email as string,
            avatar: profile.avatar as string | undefined,
            role: profile.role as string,
            isActive: profile.isActive as boolean,
          }))}
          currentProfileId={currentProfileId}
        />
      </div>
    </div>
  );
};

export default UserProfile;
