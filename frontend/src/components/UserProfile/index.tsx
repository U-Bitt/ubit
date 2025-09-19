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
  };

  const testScores = [
    { test: "SAT", score: "1450", date: "Dec 2023" },
    { test: "TOEFL", score: "108", date: "Nov 2023" },
    { test: "AP Computer Science", score: "5", date: "May 2023" },
  ];

  const interests = [
    "Computer Science",
    "Engineering",
    "Research",
    "Innovation",
  ];

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
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    AS
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-2xl font-bold mb-2">Alex Smith</h2>
                <p className="text-muted-foreground mb-4">
                  alex.smith@email.com
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
                
                {/* AI Assistant Buttons */}
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
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Smith" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="alex.smith@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="New York, NY" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Passionate computer science student with interests in AI and machine learning. Looking to pursue higher education in the US."
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
                  <Button variant="outline" size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    Add Score
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {testScores.map((score, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <h4 className="font-medium">{score.test}</h4>
                        <p className="text-sm text-muted-foreground">
                          {score.date}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-lg font-semibold"
                      >
                        {score.score}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                >
                  Add New Score
                </Button>
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
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="newInterest">Add Interest</Label>
                  <div className="flex gap-2 mt-2">
                    <Input id="newInterest" placeholder="Enter new interest" />
                    <Button size="sm">Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;