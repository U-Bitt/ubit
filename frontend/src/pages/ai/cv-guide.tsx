import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CVAnalysis } from "@/components/CVAnalysis";
import { CVTemplate } from "@/components/CVTemplate";
import { generateCVAnalysis } from "@/utils/cvScoring";
import {
  ArrowLeft,
  FileCheck,
  BookOpen,
  Lightbulb,
  Target,
} from "lucide-react";

interface CVAnalysis {
  overallScore: number;
  sections: Array<{
    title: string;
    content: string;
    improved: string;
    suggestions: string[];
    score: number;
    maxScore: number;
  }>;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export default function CVGuidePage() {
  const router = useRouter();
  const { user } = useUser();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState("guide");

  const handleGenerateAnalysis = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const userProfile = {
        personalInfo: user?.personalInfo || {},
        academicInfo: user?.academicInfo || {},
        testScores: [],
        interests: user?.areasOfInterest || [],
      };

      const analysis = generateCVAnalysis(userProfile);
      setAnalysis(analysis);
      setIsAnalyzing(false);
      setActiveTab("analysis");
    }, 3000);
  };

  const downloadCV = () => {
    if (!analysis) return;

    const cvContent = analysis.sections
      .map(section => `${section.title}\n${section.improved}\n`)
      .join("\n");

    const blob = new Blob([cvContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "improved-cv.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const userProfile = {
    personalInfo: user?.personalInfo || {},
    academicInfo: user?.academicInfo || {},
    interests: user?.areasOfInterest || [],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <FileCheck className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">CV Guide</h1>
          </div>
          <p className="text-gray-600">
            Complete guide on how to write and improve your CV
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="guide">Guide</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  CV Writing Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    1. Personal Information
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Full name and contact information</li>
                    <li>• Use professional email address</li>
                    <li>• Link to LinkedIn profile</li>
                    <li>• Add photo (optional)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">2. Education</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• List most recent education first</li>
                    <li>• Include GPA, graduation year, school name</li>
                    <li>• List relevant courses</li>
                    <li>• Include academic awards and honors</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    3. Work Experience
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Start with most recent position</li>
                    <li>• Job title, company, duration</li>
                    <li>• Responsibilities and achievements</li>
                    <li>• Use quantifiable metrics (25% improvement, etc.)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">4. Skills</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Separate technical and soft skills</li>
                    <li>• Indicate proficiency level</li>
                    <li>• List relevant tools and technologies</li>
                    <li>• Include language skills</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">5. Projects</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Personal and academic projects</li>
                    <li>• Technologies and tools used</li>
                    <li>• Results and impact achieved</li>
                    <li>• Add GitHub links</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Analyze and Improve CV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get AI-powered analysis and improvement suggestions for your
                  CV.
                </p>
                <Button onClick={handleGenerateAnalysis} className="w-full">
                  <FileCheck className="h-5 w-5 mr-2" />
                  Analyze and Improve CV
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="template">
            <CVTemplate userProfile={userProfile} onDownload={downloadCV} />
          </TabsContent>

          <TabsContent value="analysis">
            {isAnalyzing && (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h2 className="text-xl font-semibold mb-2">
                    AI is analyzing your profile...
                  </h2>
                  <p className="text-gray-600">
                    This will take a few minutes to generate personalized
                    suggestions.
                  </p>
                </CardContent>
              </Card>
            )}

            {analysis && (
              <CVAnalysis analysis={analysis} onDownload={downloadCV} />
            )}

            {!analysis && !isAnalyzing && (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <FileCheck className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">CV Analysis</h2>
                  <p className="text-gray-600 mb-6">
                    Click the button above to analyze your CV and get
                    improvement suggestions.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  CV Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">
                    ✅ Things to Do
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Keep it 1-2 pages long</li>
                    <li>
                      • Use quantifiable metrics (50% improvement, 100+ users)
                    </li>
                    <li>• Use action verbs (developed, created, managed)</li>
                    <li>• Highlight skills relevant to the job</li>
                    <li>• Use professional formatting</li>
                    <li>• Check spelling and grammar</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">
                    ❌ Things to Avoid
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Being too long or too short</li>
                    <li>• Including too much personal information</li>
                    <li>• Including false information</li>
                    <li>• Using the same CV for all job applications</li>
                    <li>• Using too many colors and fonts</li>
                    <li>• Leaving outdated information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">
                    💡 Additional Tips
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      • Read job descriptions carefully and tailor accordingly
                    </li>
                    <li>• Use keywords from job descriptions</li>
                    <li>• Keep your LinkedIn profile updated</li>
                    <li>• Write a cover letter</li>
                    <li>• Get feedback from professionals</li>
                    <li>• Update regularly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  ⚠️ Important Notes
                </h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Send CV in PDF format</li>
                  <li>• Use clear file names (John_Doe_CV.pdf)</li>
                  <li>• Check email size (under 5MB)</li>
                  <li>• Use print-friendly formatting</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
