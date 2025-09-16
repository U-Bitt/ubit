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
  ArrowLeft,
  Award,
  Users,
  Mail,
  Linkedin,
  ExternalLink,
  Clock,
  CheckCircle,
  Globe,
  User,
  Building,
} from "lucide-react";

interface ScholarshipDetailsProps {
  scholarshipId: string;
}

export const ScholarshipDetails = ({ scholarshipId }: ScholarshipDetailsProps) => {
  const router = useRouter();

  // Scholarship data - in a real app, this would be fetched based on the ID
  const scholarships = [
    {
      id: "1",
      title: "MIT Alumni Engineering Excellence Scholarship",
      donor: {
        name: "Dr. Sarah Chen",
        title: "MIT '95, Senior VP at Google",
        avatar: "SC",
        company: "Google",
        linkedin: "https://linkedin.com/in/sarahchen",
        email: "sarah.chen@alumni.mit.edu",
        bio: "Dr. Sarah Chen is a distinguished MIT alumna with over 25 years of experience in technology leadership. She currently serves as Senior Vice President at Google, where she leads strategic initiatives in artificial intelligence and machine learning. Sarah is passionate about supporting the next generation of engineers and has personally funded this scholarship to help students pursue their dreams in engineering.",
        location: "San Francisco, CA",
        education: "MIT '95 - Computer Science, Stanford MBA '98"
      },
      amount: "$25,000",
      duration: "4 years",
      deadline: "March 15, 2024",
      description: "Awarded to outstanding students pursuing engineering degrees with demonstrated leadership potential and community involvement. This scholarship is designed to support students who show exceptional promise in engineering and have a strong commitment to making a positive impact in their communities.",
      longDescription: "The MIT Alumni Engineering Excellence Scholarship is a comprehensive financial aid program that provides $25,000 per year for up to four years to exceptional engineering students. This scholarship is not just about financial support—it's about building a community of future engineering leaders who will shape the world through innovation and service.\n\nRecipients of this scholarship become part of an exclusive network of MIT alumni and current students, gaining access to mentorship opportunities, networking events, and career guidance. The scholarship also includes additional benefits such as research opportunities, internship placements, and conference attendance funding.\n\nThis scholarship is particularly focused on students who demonstrate not only academic excellence but also leadership potential, community involvement, and a commitment to using their engineering skills to solve real-world problems. We believe that the best engineers are those who understand the broader impact of their work and are dedicated to making a positive difference in society.",
      requirements: [
        "3.8+ GPA",
        "Engineering major",
        "Leadership experience",
        "Community service",
        "Two letters of recommendation",
        "Personal statement",
        "Portfolio of engineering projects"
      ],
      field: "Engineering",
      level: "Undergraduate",
      country: "United States",
      university: "MIT",
      applications: 245,
      spots: 3,
      benefits: [
        "Full tuition coverage",
        "Research opportunities",
        "Mentorship program",
        "Networking events",
        "Conference attendance funding",
        "Internship placement assistance"
      ],
      applicationProcess: [
        "Submit online application",
        "Upload academic transcripts",
        "Provide two letters of recommendation",
        "Write personal statement (500 words)",
        "Submit portfolio of engineering projects",
        "Complete video interview (if selected)",
        "Final review by selection committee"
      ],
      selectionCriteria: [
        "Academic excellence (40%)",
        "Leadership potential (25%)",
        "Community involvement (20%)",
        "Engineering project quality (15%)"
      ]
    },
    {
      id: "2",
      title: "Harvard Business School Alumni Fellowship",
      donor: {
        name: "Michael Rodriguez",
        title: "Harvard MBA '98, CEO at TechCorp",
        avatar: "MR",
        company: "TechCorp",
        linkedin: "https://linkedin.com/in/michaelrodriguez",
        email: "m.rodriguez@alumni.harvard.edu",
        bio: "Michael Rodriguez is a serial entrepreneur and Harvard Business School graduate who has built and sold three successful technology companies. As CEO of TechCorp, he leads a team of 500+ employees and has been recognized as one of the top 40 under 40 entrepreneurs by Forbes. Michael is committed to increasing diversity in business and technology.",
        location: "New York, NY",
        education: "Harvard MBA '98, Stanford BS '95"
      },
      amount: "$50,000",
      duration: "2 years",
      deadline: "April 30, 2024",
      description: "Supporting exceptional students from underrepresented backgrounds pursuing MBA degrees with entrepreneurial aspirations.",
      longDescription: "The Harvard Business School Alumni Fellowship is a prestigious award that provides comprehensive support for MBA students from underrepresented backgrounds who demonstrate exceptional entrepreneurial potential. This fellowship goes beyond financial assistance to provide mentorship, networking opportunities, and hands-on experience in the business world.\n\nFellows receive not only financial support but also access to exclusive events, mentorship from successful entrepreneurs, and opportunities to work on real business projects. The program is designed to help fellows develop the skills, network, and experience needed to launch successful businesses or advance to senior leadership positions.\n\nThis fellowship is particularly valuable for students who are interested in entrepreneurship but may not have the traditional background or resources typically associated with business school success. We believe that diverse perspectives and experiences are essential for innovation and business success.",
      requirements: [
        "GMAT 700+",
        "Entrepreneurial experience",
        "Underrepresented background",
        "Leadership potential",
        "Business plan submission",
        "Three letters of recommendation",
        "Video interview"
      ],
      field: "Business",
      level: "Graduate",
      country: "United States",
      university: "Harvard",
      applications: 189,
      spots: 2,
      benefits: [
        "Full MBA tuition coverage",
        "Entrepreneurship mentorship",
        "Access to investor network",
        "Business plan development support",
        "Internship opportunities",
        "Conference and event access"
      ],
      applicationProcess: [
        "Submit online application",
        "GMAT score submission",
        "Upload transcripts",
        "Submit business plan",
        "Provide three letters of recommendation",
        "Complete video interview",
        "Final presentation to selection committee"
      ],
      selectionCriteria: [
        "Academic performance (30%)",
        "Entrepreneurial potential (35%)",
        "Leadership experience (20%)",
        "Diversity and background (15%)"
      ]
    }
  ];

  const scholarship = scholarships.find(s => s.id === scholarshipId);

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Scholarship Not Found</h1>
          <p className="text-muted-foreground mb-6">The scholarship you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Scholarships
        </Button>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {scholarship.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {scholarship.field}
                </Badge>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {scholarship.level}
                </Badge>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {scholarship.university}, {scholarship.country}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {scholarship.amount}
              </div>
              <div className="text-sm text-muted-foreground">
                per year for {scholarship.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Scholarship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {scholarship.longDescription || scholarship.description}
                </p>
              </CardContent>
            </Card>

            {/* Tabs for Additional Information */}
            <Tabs defaultValue="requirements" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="process">Application Process</TabsTrigger>
                <TabsTrigger value="criteria">Selection Criteria</TabsTrigger>
              </TabsList>
              
              <TabsContent value="requirements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Eligibility Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {scholarship.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="benefits" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Scholarship Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {scholarship.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-blue-600" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="process" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scholarship.applicationProcess.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="criteria" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Selection Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scholarship.selectionCriteria.map((criteria, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{criteria.split('(')[0].trim()}</span>
                          <Badge variant="outline">{criteria.split('(')[1]?.replace(')', '')}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Application Info */}
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Deadline
                  </span>
                  <span className="font-semibold">{scholarship.deadline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Applications
                  </span>
                  <span className="font-semibold">
                    {scholarship.applications} applied, {scholarship.spots} spots
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Duration
                  </span>
                  <span className="font-semibold">{scholarship.duration}</span>
                </div>
              </CardContent>
            </Card>

            {/* Donor Information */}
            <Card>
              <CardHeader>
                <CardTitle>About the Donor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {scholarship.donor.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{scholarship.donor.name}</h3>
                    <p className="text-sm text-muted-foreground">{scholarship.donor.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {scholarship.donor.company}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {scholarship.donor.bio}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3" />
                    {scholarship.donor.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-3 w-3" />
                    {scholarship.donor.education}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(`mailto:${scholarship.donor.email}?subject=Inquiry about ${scholarship.title}`)}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(scholarship.donor.linkedin, '_blank')}
                  >
                    <Linkedin className="h-3 w-3 mr-1" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                Apply Now
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open(scholarship.donor.linkedin, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Donor Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};