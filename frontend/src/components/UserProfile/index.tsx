import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Edit, Save, Camera, Search, FileCheck } from "lucide-react";
import { useRouter } from "next/router";

export const UserProfile = () => {
  const router = useRouter();
  
  const academicInfo = {
    gpa: "3.8/4.0",
    school: "International High School",
    graduationYear: "2024",
    major: "Computer Science",
  });

  const testScores = [
    { test: "SAT", score: "1450", date: "Dec 2023" },
    { test: "TOEFL", score: "108", date: "Nov 2023" },
    { test: "AP Computer Science", score: "5", date: "May 2023" },
  ];

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
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

  // State for AI modals
  const [isSuggestUniversitiesOpen, setIsSuggestUniversitiesOpen] = useState(false);
  const [isImproveCVOpen, setIsImproveCVOpen] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setPersonalInfo(profileData.personalInfo || personalInfo);
        setAcademicInfo(profileData.academicInfo || academicInfo);
        setTestScores(profileData.testScores || testScores);
        setInterests(profileData.interests || interests);
        setProfilePicture(profileData.profilePicture || null);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  }, []);

  // Save data to localStorage whenever data changes
  useEffect(() => {
    try {
      const profileData = {
        personalInfo,
        academicInfo,
        testScores,
        interests,
        profilePicture
      };
      localStorage.setItem('userProfile', JSON.stringify(profileData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }, [personalInfo, academicInfo, testScores, interests, profilePicture]);

  // Handler functions
  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAcademicInfoChange = (field: string, value: string) => {
    setAcademicInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTestScoreChange = (id: number, field: string, value: string) => {
    setTestScores(prev =>
      prev.map(score =>
        score.id === id ? { ...score, [field]: value } : score
      )
    );
  };

  const addTestScore = () => {
    const newScore = {
      id: Date.now(),
      test: "",
      score: "",
      date: ""
    };
    setTestScores(prev => [...prev, newScore]);
  };

  const removeTestScore = (id: number) => {
    setTestScores(prev => prev.filter(score => score.id !== id));
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests(prev => [...prev, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(prev => prev.filter(interest => interest !== interestToRemove));
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setProfilePictureFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePicture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setProfilePictureFile(null);
    localStorage.removeItem('userProfilePicture');
  };

  const handleSave = () => {
    try {
      // Save all data to localStorage
      localStorage.setItem('userPersonalInfo', JSON.stringify(personalInfo));
      localStorage.setItem('userAcademicInfo', JSON.stringify(academicInfo));
      localStorage.setItem('userTestScores', JSON.stringify(testScores));
      localStorage.setItem('userInterests', JSON.stringify(interests));
      if (profilePicture) {
        localStorage.setItem('userProfilePicture', profilePicture);
      }
      
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error('Error saving profile:', error);
      alert("Error saving profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Profile
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
                      {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2 flex gap-1">
                      <Button
                        size="sm"
                        className="rounded-full w-8 h-8 p-0"
                        onClick={() => document.getElementById('profilePictureInput')?.click()}
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
                <h2 className="text-2xl font-bold mb-2">{personalInfo.firstName} {personalInfo.lastName}</h2>
                <p className="text-muted-foreground mb-4">
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
                  <p className="text-2xl font-bold text-primary">
                    {academicInfo.gpa}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">School</Label>
                  <p className="text-sm">{academicInfo.school}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Graduation Year</Label>
                  <p className="text-sm">{academicInfo.graduationYear}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Intended Major</Label>
                  <p className="text-sm">{academicInfo.major}</p>
                </div>

                {/* AI University Suggestions */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => router.push('/ai/suggest-universities')}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Suggest Universities
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => router.push('/ai/improve-cv')}
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
                      onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={personalInfo.lastName}
                      onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
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
                    onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input 
                    id="dateOfBirth" 
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={(e) => handlePersonalInfoChange("dateOfBirth", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input 
                    id="nationality" 
                    value={personalInfo.nationality}
                    onChange={(e) => handlePersonalInfoChange("nationality", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={personalInfo.bio}
                    onChange={(e) => handlePersonalInfoChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Test Scores */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Test Scores</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addTestScore}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Add Score
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {testScores.map((score) => (
                    <div
                      key={score.id}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <Input
                          value={score.test}
                          onChange={(e) => handleTestScoreChange(score.id, "test", e.target.value)}
                          placeholder="Test Name"
                          disabled={!isEditing}
                        />
                        <Input
                          value={score.score}
                          onChange={(e) => handleTestScoreChange(score.id, "score", e.target.value)}
                          placeholder="Score"
                          disabled={!isEditing}
                        />
                        <Input
                          value={score.date}
                          onChange={(e) => handleTestScoreChange(score.id, "date", e.target.value)}
                          placeholder="Date"
                          disabled={!isEditing}
                        />
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTestScore(score.id)}
                          className="ml-2 text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
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
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
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
                        onChange={(e) => setNewInterest(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                      />
                      <Button size="sm" onClick={addInterest}>Add</Button>
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
          </div>
        </div>

        {/* AI Modals */}
        <SuggestUniversitiesModal
          isOpen={isSuggestUniversitiesOpen}
          onClose={() => setIsSuggestUniversitiesOpen(false)}
          userProfile={{
            personalInfo,
            academicInfo,
            testScores,
            interests
          }}
        />

        <ImproveCVModal
          isOpen={isImproveCVOpen}
          onClose={() => setIsImproveCVOpen(false)}
          userProfile={{
            personalInfo,
            academicInfo,
            testScores,
            interests
          }}
        />
      </div>
    </div>
  );
};

export default UserProfile;
