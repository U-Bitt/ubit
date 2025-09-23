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
import { universityApi, scholarshipApi, University } from "@/utils/api";

interface UniversityDetailsProps {
  universityId: string;
}

export const UniversityDetails = ({ universityId }: UniversityDetailsProps) => {
  const router = useRouter();
  const { toggleSave, isSaved } = useSavedUniversities();
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkedScholarships, setLinkedScholarships] = useState<
    {
      id: string;
      title: string;
      amount: string;
      type: string;
      description?: string;
      deadline: string;
      requirements: string[];
    }[]
  >([]);
  const [scholarshipsLoading, setScholarshipsLoading] = useState(false);

  // Fetch linked scholarships for the university
  const fetchLinkedScholarships = async (universityName: string) => {
    try {
      setScholarshipsLoading(true);
      const scholarships = await scholarshipApi.getByUniversity(universityName);
      setLinkedScholarships(
        scholarships as {
          id: string;
          title: string;
          amount: string;
          type: string;
          description?: string;
          deadline: string;
          requirements: string[];
        }[]
      );
    } catch (err) {
      console.error("Error fetching linked scholarships:", err);
      setLinkedScholarships([]);
    } finally {
      setScholarshipsLoading(false);
    }
  };

  // Fetch university data from API
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const data = await universityApi.getById(universityId);
        setUniversity(data);

        // Fetch linked scholarships after university data is loaded
        if (data.name) {
          await fetchLinkedScholarships(data.name);
        }
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
          <h3 className="text-lg font-semibold mb-2">
            Loading university details...
          </h3>
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
          <h3 className="text-lg font-semibold mb-2 text-red-600">
            University not found
          </h3>
          <p className="text-gray-600 mb-4">
            The university you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
          <Button onClick={() => router.push("/discover/universities")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Universities
          </Button>
        </div>
      </div>
    );
  }

  // Use data from the backend instead of hardcoded values
  const requirements = university.requirements || [
    "High School Transcript",
    "SAT/ACT Scores",
    "Personal Statement",
    "Letters of Recommendation",
    "Portfolio (for certain programs)",
  ];

  // Combine university's own scholarships with linked scholarships from scholarship detail pages
  const universityScholarships = university.scholarships || [];
  const allScholarships = [...universityScholarships, ...linkedScholarships];

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
                  onClick={() => toggleSave(university.id, university.name)}
                  className={
                    isSaved(university.id)
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "hover:bg-red-50"
                  }
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${isSaved(university.id) ? "fill-current" : ""}`}
                  />
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
                      {university.founded || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-semibold">
                      {university.type === "public"
                        ? "Public Research"
                        : university.type === "private"
                          ? "Private Research"
                          : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campus Size</span>
                    <span className="font-semibold">
                      {university.campusSize || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Student-Faculty Ratio
                    </span>
                    <span className="font-semibold">
                      {university.studentFacultyRatio || "N/A"}
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
            {scholarshipsLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">
                    Loading scholarships...
                  </p>
                </CardContent>
              </Card>
            ) : allScholarships.length > 0 ? (
              <div className="space-y-6">
                {/* Show linked scholarships from scholarship detail pages */}
                {linkedScholarships.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Available Scholarships
                    </h3>
                    <div className="grid gap-6">
                      {linkedScholarships.map((scholarship, index) => (
                        <Card
                          key={`linked-${index}`}
                          className="border-l-4 border-l-primary"
                        >
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold mb-1">
                                  {scholarship.title}
                                </h3>
                                <p className="text-muted-foreground">
                                  {scholarship.amount} • {scholarship.type}
                                </p>
                                {scholarship.description && (
                                  <p className="text-sm text-muted-foreground mt-2">
                                    {scholarship.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge variant="secondary">
                                  {scholarship.deadline}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    router.push(
                                      `/scholarshipDetail/${scholarship.id}`
                                    )
                                  }
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                            {scholarship.requirements &&
                              scholarship.requirements.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Requirements:
                                  </h4>
                                  <ul className="space-y-1">
                                    {scholarship.requirements.map(
                                      (req: string, reqIndex: number) => (
                                        <li
                                          key={reqIndex}
                                          className="text-sm text-muted-foreground"
                                        >
                                          • {req}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show university's own scholarships */}
                {universityScholarships.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      University Scholarships
                    </h3>
                    <div className="grid gap-6">
                      {universityScholarships.map((scholarship, index) => (
                        <Card key={`university-${index}`}>
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
                              <Badge variant="secondary">
                                {scholarship.deadline}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">
                                Requirements:
                              </h4>
                              <ul className="space-y-1">
                                {scholarship.requirements.map(
                                  (req: string, reqIndex: number) => (
                                    <li
                                      key={reqIndex}
                                      className="text-sm text-muted-foreground"
                                    >
                                      • {req}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <h3 className="text-lg font-semibold mb-2">
                      No scholarships available
                    </h3>
                    <p>
                      Scholarship information for this university is not
                      currently available.
                    </p>
                    <p className="text-sm mt-2">
                      Please check the university&apos;s official website for
                      current scholarship opportunities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
