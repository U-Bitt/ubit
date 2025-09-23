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
  Clock,
  DollarSign,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { visaApi } from "@/utils/api";
import type { Visa } from "@/types/visa";

interface VisaDetailProps {
  visaId: string;
}

export const VisaDetail: React.FC<VisaDetailProps> = ({ visaId }) => {
  const router = useRouter();
  const [visa, setVisa] = useState<Visa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        setLoading(true);
        console.log("Fetching visa details for ID:", visaId);
        const data = await visaApi.getById(visaId);
        console.log("Visa detail data received:", data);
        setVisa(data as unknown as Visa);
      } catch (err) {
        console.error("Error fetching visa details:", err);
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
          <p className="text-muted-foreground">Loading visa information...</p>
        </div>
      </div>
    );
  }

  if (error || !visa) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || "Visa not found"}
          </h1>
          <Button onClick={() => router.push("/prepare/visa")}>
            Back to Visa Overview
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
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/prepare/visa")}
            >
              ← Back
            </Button>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {visa.country} - {visa.type}
                </h1>
                <p className="text-muted-foreground">{visa.description}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {visa.country}
            </Badge>
            <Badge variant="secondary">{visa.type}</Badge>
          </div>
        </div>

        {/* Key Information Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Processing Time</h3>
              </div>
              <p className="text-2xl font-bold text-primary">
                {visa.processingTime}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Cost</h3>
              </div>
              <p className="text-2xl font-bold text-primary">{visa.cost}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Validity</h3>
              </div>
              <p className="text-lg font-bold text-primary">{visa.validity}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Official Info</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(visa.officialWebsite, "_blank")}
                className="w-full"
              >
                Visit Website
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="benefits">Benefits & Rights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {visa.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.isArray(visa.eligibility) ? (
                    visa.eligibility.map((requirement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{requirement}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{visa.eligibility}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Restrictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.isArray(visa.restrictions) ? (
                    visa.restrictions.map((restriction, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{restriction}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{visa.restrictions}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
                <p className="text-sm text-muted-foreground">
                  All requirements that must be met to apply for this visa
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {visa.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Documents you need to prepare for your visa application
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {visa.documents.map((document, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{document}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Rights</CardTitle>
                <p className="text-sm text-muted-foreground">
                  What you can do with this visa
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Study Rights
                    </h4>
                    <div className="space-y-2">
                      {visa.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {visa.workRights && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        Work Rights
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {visa.workRights}
                      </p>
                    </div>
                  )}

                  {visa.studyRights && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        Study Rights
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {visa.studyRights}
                      </p>
                    </div>
                  )}

                  {visa.familyRights && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Family Rights
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {visa.familyRights}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
