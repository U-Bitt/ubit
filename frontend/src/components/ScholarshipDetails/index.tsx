import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  DollarSign,
  ArrowLeft,
  Award,
  Users,
  Mail,
  ExternalLink,
  Clock,
  CheckCircle,
} from "lucide-react";
import { scholarshipApi, universityApi } from "@/utils/api";

interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: string;
  university: string;
  country: string;
  deadline: string;
  requirements: string[];
  type: string;
  coverage: string;
  duration: string;
  applicationProcess: string;
  eligibility: string;
  benefits: string[];
  image: string;
  field?: string;
  level?: string;
  longDescription?: string;
  applications?: number;
  spots?: number;
}

interface ScholarshipDetailsProps {
  scholarshipId: string;
}

export const ScholarshipDetails = ({ scholarshipId }: ScholarshipDetailsProps) => {
  const router = useRouter();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to navigate to university detail page
  const handleViewUniversity = async () => {
    if (!scholarship?.university) return;
    
    try {
      // Get all universities and find the one matching the scholarship's university name
      const universities = await universityApi.getAll();
      const university = universities.find(uni => 
        uni.name.toLowerCase() === scholarship.university.toLowerCase()
      );
      
      if (university) {
        router.push(`/universityDetail/${university.id}`);
      } else {
        // If university not found, show an alert or fallback to external search
        alert(`University "${scholarship.university}" not found in our database.`);
      }
    } catch (error) {
      console.error("Error finding university:", error);
      alert("Error finding university details.");
    }
  };

  // Fetch scholarship data
  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await scholarshipApi.getById(scholarshipId);
        setScholarship(response as unknown as Scholarship);
      } catch (err) {
        console.error("Error fetching scholarship:", err);
        setError("Failed to load scholarship details");
      } finally {
        setLoading(false);
      }
    };

    if (scholarshipId && scholarshipId !== 'undefined') {
      fetchScholarship();
    }
  }, [scholarshipId]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Loading scholarship...</h3>
          <p>Please wait while we fetch the details</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Scholarship</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!scholarship) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Scholarship Not Found</h1>
          <p className="text-muted-foreground mb-6">The scholarship you&apos;re looking for doesn&apos;t exist.</p>
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
                      {scholarship.requirements?.map((req: string, index: number) => (
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
                      {scholarship.benefits?.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-blue-600" />
                          <span>{benefit}</span>
                        </div>
                      )) || (
                        <div className="text-muted-foreground">No specific benefits listed</div>
                      )}
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
                      {scholarship.applicationProcess ? (
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            1
                          </div>
                          <span>{scholarship.applicationProcess}</span>
                        </div>
                      ) : (
                        <div className="text-muted-foreground">Application process details not available</div>
                      )}
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
                      {scholarship.requirements?.map((requirement: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span>{requirement}</span>
                        </div>
                      )) || (
                        <div className="text-muted-foreground">Selection criteria not available</div>
                      )}
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
                <CardTitle>About the University</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {scholarship.university?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{scholarship.university}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {scholarship.country}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {scholarship.type} Scholarship
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {scholarship.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3" />
                    {scholarship.country}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-3 w-3" />
                    {scholarship.amount} {scholarship.coverage}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(`mailto:admissions@${scholarship.university?.toLowerCase().replace(/\s+/g, '')}.edu?subject=Inquiry about ${scholarship.title}`)}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Contact University
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={handleViewUniversity}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Learn More
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
                onClick={handleViewUniversity}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View University Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};