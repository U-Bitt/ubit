import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import {
  MapPin,
  Star,
  Calendar,
  DollarSign,
  GraduationCap,
  BookOpen,
  Heart,
  Share2,
  ArrowLeft,
} from "lucide-react";

interface UniversityDetailsProps {
  universityId: string;
}

export const UniversityDetails = ({ universityId }: UniversityDetailsProps) => {
  const router = useRouter();

  // University data - in a real app, this would be fetched based on the ID
  const universities = [
    {
      id: "mit",
      name: "Massachusetts Institute of Technology",
      location: "Cambridge, MA, USA",
      ranking: 1,
      rating: 4.9,
      tuition: "$57,986/year",
      acceptance: "6.7%",
      image: "/mit-campus-aerial.png",
      description:
        "MIT is a world-renowned private research university known for its cutting-edge research, innovation, and excellence in science, technology, engineering, and mathematics (STEM) fields.",
      programs: [
        "Computer Science",
        "Engineering",
        "Physics",
        "Mathematics",
        "Biology",
        "Chemistry",
        "Economics",
        "Business Administration",
      ],
      deadline: "Jan 1, 2025",
      requirements: [
        "High School Transcript",
        "SAT/ACT Scores",
        "Personal Statement",
        "Letters of Recommendation",
        "Portfolio (for certain programs)",
      ],
      scholarships: [
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
      ],
    },
    {
      id: "stanford",
      name: "Stanford University",
      location: "Stanford, CA, USA",
      ranking: 2,
      rating: 4.8,
      tuition: "$61,731/year",
      acceptance: "4.3%",
      image: "/stanford-campus.jpg",
      description:
        "Stanford University is a leading research university known for its academic strength, proximity to Silicon Valley, and entrepreneurial spirit.",
      programs: [
        "Computer Science",
        "Business",
        "Medicine",
        "Engineering",
        "Law",
        "Education",
        "Humanities",
        "Sciences",
      ],
      deadline: "Jan 2, 2025",
      requirements: [
        "High School Transcript",
        "SAT/ACT Scores",
        "Personal Statement",
        "Letters of Recommendation",
        "Extracurricular Activities",
      ],
      scholarships: [
        {
          name: "Stanford Scholarship",
          amount: "Up to $20,000/year",
          requirements: ["Academic excellence", "Financial need"],
          deadline: "Jan 2, 2025",
        },
      ],
    },
    {
      id: "harvard",
      name: "Harvard University",
      location: "Cambridge, MA, USA",
      ranking: 3,
      rating: 4.9,
      tuition: "$57,261/year",
      acceptance: "3.4%",
      image: "/harvard-campus.jpg",
      description:
        "Harvard University is America's oldest institution of higher learning, founded in 1636, and is widely regarded as one of the most prestigious universities in the world.",
      programs: [
        "Liberal Arts",
        "Medicine",
        "Law",
        "Business",
        "Public Policy",
        "Education",
        "Divinity",
        "Design",
      ],
      deadline: "Jan 1, 2025",
      requirements: [
        "High School Transcript",
        "SAT/ACT Scores",
        "Personal Statement",
        "Letters of Recommendation",
        "Interview (optional)",
      ],
      scholarships: [
        {
          name: "Harvard Financial Aid",
          amount: "Need-based",
          requirements: ["Financial need", "Academic merit"],
          deadline: "Jan 1, 2025",
        },
      ],
    },
    {
      id: "oxford",
      name: "University of Oxford",
      location: "Oxford, UK",
      ranking: 4,
      rating: 4.7,
      tuition: "£26,770/year",
      acceptance: "17.5%",
      image: "/oxford-university-campus.jpg",
      description:
        "The University of Oxford is the oldest university in the English-speaking world and is regarded as one of the leading academic institutions in the world.",
      programs: [
        "Philosophy",
        "Literature",
        "Medicine",
        "Law",
        "Mathematics",
        "Physics",
        "History",
        "Economics",
      ],
      deadline: "Oct 15, 2024",
      requirements: [
        "A-Levels or equivalent",
        "Personal Statement",
        "Academic References",
        "Admissions Test",
        "Interview",
      ],
      scholarships: [
        {
          name: "Oxford Scholarship",
          amount: "Up to £10,000/year",
          requirements: ["Academic excellence", "Financial need"],
          deadline: "Oct 15, 2024",
        },
      ],
    },
  ];

  const university = universities.find((uni) => uni.id === universityId) || universities[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => router.push('/universities')}>
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
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
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
                    Schedule Visit
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Admissions
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Brochure
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
            <TabsTrigger value="campus">Campus Life</TabsTrigger>
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
                  {university.requirements.map((requirement, index) => (
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
              {university.scholarships.map((scholarship, index) => (
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

          <TabsContent value="campus" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campus Life</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  MIT offers a vibrant campus life with numerous student
                  organizations, research opportunities, and cultural
                  activities. The campus is located in Cambridge, providing easy
                  access to Boston&apos;s rich cultural and professional
                  opportunities.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      Student Organizations
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      500+ student clubs and organizations covering academics,
                      culture, sports, and social causes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      Research Opportunities
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Undergraduate research opportunities in cutting-edge
                      laboratories and research centers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};