import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Calendar,
  DollarSign,
  GraduationCap,
  BookOpen,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { useSavedUniversities } from "@/hooks/useSavedUniversities";
import { universityApi, University } from "@/utils/api";

interface UniversityDetailsProps {
  universityId: string;
}

export const UniversityDetails = ({ universityId }: UniversityDetailsProps) => {
  const router = useRouter();
  const { toggleSave, isSaved } = useSavedUniversities();
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch university data from API
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const data = await universityApi.getById(universityId);
        setUniversity(data);
      } catch (err) {
        console.error("Error fetching university:", err);
        setError("Failed to load university details");
      } finally {
        setLoading(false);
      }
    };

    if (universityId) {
      fetchUniversity();
    }
  }, [universityId]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Loading university details...</h3>
          <p>Please wait while we fetch the information</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !university) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 text-red-600">University not found</h3>
          <p className="text-gray-600 mb-4">The university you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/discover/universities')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Universities
          </Button>
        </div>
      </div>
    );
  }


  // Sample requirements and scholarships data (in a real app, this would come from the API)
  const requirements = [
    "High School Transcript",
    "SAT/ACT Scores", 
    "Personal Statement",
    "Letters of Recommendation",
    "Portfolio (for certain programs)",
  ];

  const scholarships = [
    {
      name: "Merit Scholarship",
      amount: "$15,000/year",
      requirements: ["High academic performance", "Leadership experience"],
      deadline: "Dec 15, 2024",
    },
    {
      name: "Need-based Financial Aid", 
      amount: "Up to full tuition",
      requirements: ["Financial need", "Academic merit"],
      deadline: "Jan 1, 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Universities
        </Button>

        {/* University Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {university.name}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{university.location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">
                    #{university.ranking} Globally
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium">
                      {university.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={isSaved(university.id) ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleSave(university.id)}
                  className={isSaved(university.id) 
                    ? "bg-red-500 hover:bg-red-600 text-white" 
                    : "hover:bg-red-50"
                  }
                >
                  <Heart className={`h-4 w-4 mr-2 ${isSaved(university.id) ? "fill-current" : ""}`} />
                  {isSaved(university.id) ? "Saved" : "Save"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Tuition</p>
                <p className="font-semibold">{university.tuition}</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Acceptance</p>
                <p className="font-semibold">{university.acceptance}</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="font-semibold">{university.deadline}</p>
              </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {university.description}
            </p>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Start Application
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Admissions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* University Image */}
        <div className="mb-8">
          <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
            <Image
              src={university.image}
              alt={university.name}
              width={800}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
        </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-1 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Key Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded</span>
                    <span className="font-semibold">
                      {university.id === 'mit' ? '1861' : 
                       university.id === 'stanford' ? '1885' :
                       university.id === 'harvard' ? '1636' :
                       university.id === 'oxford' ? '1096' : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-semibold">
                      {university.id === 'oxford' ? 'Public Research' : 'Private Research'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campus Size</span>
                    <span className="font-semibold">
                      {university.id === 'mit' ? '168 acres' :
                       university.id === 'stanford' ? '8,180 acres' :
                       university.id === 'harvard' ? '5,076 acres' :
                       university.id === 'oxford' ? '1,000+ acres' : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Student-Faculty Ratio
                    </span>
                    <span className="font-semibold">
                      {university.id === 'mit' ? '3:1' :
                       university.id === 'stanford' ? '5:1' :
                       university.id === 'harvard' ? '6:1' :
                       university.id === 'oxford' ? '11:1' : 'N/A'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {university.programs.map((program, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span className="font-medium">{program}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scholarships" className="space-y-6">
            <div className="grid gap-6">
              {scholarships.map((scholarship, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          {scholarship.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {scholarship.amount}
                        </p>
                      </div>
                      <Badge variant="secondary">{scholarship.deadline}</Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {scholarship.requirements.map((req, reqIndex) => (
                          <li
                            key={reqIndex}
                            className="text-sm text-muted-foreground"
                          >
                            • {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};