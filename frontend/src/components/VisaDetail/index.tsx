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
  Clock,
  DollarSign,
  Calendar,
  Users,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { visaApi } from "@/utils/api";
import type { Visa } from "@/types/visa";

interface VisaDetailProps {
  visaId: string;
}

export const VisaDetail = ({ visaId }: VisaDetailProps) => {
  const router = useRouter();
  const [visaData, setVisaData] = useState<Visa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        setLoading(true);
        const data = await visaApi.getById(visaId);
        setVisaData(data as Visa);
      } catch (err) {
        console.error("Error fetching visa:", err);
        setError("Failed to load visa information");
      } finally {
        setLoading(false);
      }
    };

    if (visaId) {
      fetchVisa();
    }
  }, [visaId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading visa details...</p>
        </div>
      </div>
    );
  }

  if (error || !visaData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || "Visa Not Found"}
          </h1>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
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
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Visa Information
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">{visaData.country}</h1>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {visaData.type}
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visa Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {visaData.description && (
                  <p className="text-lg text-muted-foreground">
                    {visaData.description}
                  </p>
                )}
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Processing Time</p>
                      <p className="text-lg font-semibold">{visaData.processingTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cost</p>
                      <p className="text-lg font-semibold">{visaData.cost}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Validity</p>
                      <p className="text-lg font-semibold">{visaData.validity}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => window.open(visaData.officialWebsite, '_blank')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Official Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {visaData.eligibility && visaData.eligibility.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Eligibility Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {visaData.eligibility.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Visa Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {visaData.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {visaData.benefits && visaData.benefits.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {visaData.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {visaData.restrictions && visaData.restrictions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Restrictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {visaData.restrictions.map((restriction: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {visaData.documents.map((doc: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Step 1: Prepare Documents</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Gather all required documents including passport, academic transcripts, and financial proof.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Step 2: Complete Application</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Fill out the online application form and pay the required fees.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Step 3: Schedule Interview</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Book an appointment at the embassy or consulate for your visa interview.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Step 4: Attend Interview</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Go to your scheduled interview with all required documents.
                      </p>
                    </div>
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