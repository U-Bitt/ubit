import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Globe,
  MapPin,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { visaApi } from "@/utils/api";
import type { Visa } from "@/types/visa";

export const VisaComponent = () => {
  const router = useRouter();
  const [visaTypes, setVisaTypes] = useState<Visa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processSteps, setProcessSteps] = useState([
    {
      step: 1,
      title: "Receive University Acceptance",
      description: "Get your official acceptance letter from the university",
      duration: "Varies",
      status: "completed",
    },
    {
      step: 2,
      title: "Pay SEVIS Fee",
      description: "Pay the SEVIS fee and receive your I-901 receipt",
      duration: "1-2 days",
      status: "completed",
    },
    {
      step: 3,
      title: "Complete DS-160 Form",
      description: "Fill out the online nonimmigrant visa application",
      duration: "1-2 hours",
      status: "in-progress",
    },
    {
      step: 4,
      title: "Schedule Interview",
      description: "Book your visa interview appointment",
      duration: "Varies by location",
      status: "pending",
    },
    {
      step: 5,
      title: "Attend Interview",
      description: "Go to the embassy/consulate for your interview",
      duration: "30 minutes",
      status: "pending",
    },
    {
      step: 6,
      title: "Receive Visa",
      description: "Get your passport with visa stamp",
      duration: "1-2 weeks",
      status: "pending",
    },
  ]);

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        setLoading(true);
        console.log("Fetching visas from API...");
        const data = await visaApi.getAll();
        console.log("Visa data received:", data);
        setVisaTypes(data);
      } catch (err) {
        console.error("Error fetching visas:", err);
        setError("Failed to load visa information");
      } finally {
        setLoading(false);
      }
    };

    fetchVisas();
  }, []);

  const handleViewDetails = (visaId: string) => {
    router.push(`/prepare/visa/${visaId}`);
  };

  const handleStatusChange = (stepIndex: number, newStatus: string) => {
    setProcessSteps(prevSteps => 
      prevSteps.map((step, index) => 
        index === stepIndex ? { ...step, status: newStatus } : step
      )
    );
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "in-progress":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading visa information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error}
          </h1>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Visa Information
          </h1>
          <p className="text-muted-foreground">
            Everything you need to know about student visas for different
            countries
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="process">Application Process</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {visaTypes.map((visa) => (
                <Card
                  key={visa.id}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">{visa.country}</CardTitle>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {visa.type}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Processing Time
                        </span>
                        <span className="text-sm font-medium">
                          {visa.processingTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Cost
                        </span>
                        <span className="text-sm font-medium">{visa.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Validity
                        </span>
                        <span className="text-sm font-medium">
                          {visa.validity}
                        </span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => handleViewDetails(visa.id)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="grid gap-6">
              {visaTypes.map((visa) => (
                <Card key={visa.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-primary" />
                      <CardTitle className="text-2xl">{visa.country}</CardTitle>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {visa.type}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {visa.requirements.map((requirement, reqIndex) => (
                          <li
                            key={reqIndex}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3">
                        Required Documents
                      </h4>
                      <ul className="space-y-2">
                        {visa.documents.map((document, docIndex) => (
                          <li
                            key={docIndex}
                            className="flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{document}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(visa.officialWebsite, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Official Website
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Application Process</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Click on the status badges to change the progress of each step
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.status === "completed"
                              ? "bg-green-500 text-white"
                              : step.status === "in-progress"
                                ? "bg-yellow-500 text-white"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <span className="font-bold">{step.step}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{step.title}</h4>
                          <div className="flex gap-1">
                            <Badge 
                              variant={step.status === "completed" ? "default" : "outline"}
                              className="cursor-pointer hover:opacity-80"
                              onClick={() => handleStatusChange(index, "completed")}
                            >
                              Completed
                            </Badge>
                            <Badge 
                              variant={step.status === "in-progress" ? "secondary" : "outline"}
                              className="cursor-pointer hover:opacity-80"
                              onClick={() => handleStatusChange(index, "in-progress")}
                            >
                              In Progress
                            </Badge>
                            <Badge 
                              variant={step.status === "pending" ? "outline" : "outline"}
                              className="cursor-pointer hover:opacity-80"
                              onClick={() => handleStatusChange(index, "pending")}
                            >
                              Pending
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {step.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Duration: {step.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-3">
                        Essential Documents
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Valid Passport</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            University Acceptance Letter
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            Financial Documentation
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Academic Transcripts</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">
                        Additional Documents
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">
                            English Proficiency Test
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Medical Examination</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Police Clearance</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Passport Photos</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="bg-primary hover:bg-primary/90">
                      Complete Checklist
                    </Button>
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