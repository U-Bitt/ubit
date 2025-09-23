import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CVAnalysis } from "@/components/CVAnalysis";
import { generateCVAnalysis } from "@/utils/cvScoring";
import { ArrowLeft, FileCheck } from "lucide-react";

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

export default function ImproveCVPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);

  const handleGenerateAnalysis = () => {
    setIsAnalyzing(true);

    // Simulate AI analysis delay
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
            <h1 className="text-3xl font-bold text-gray-900">
              CV Review and Improvement
            </h1>
          </div>
          <p className="text-gray-600">
            Get AI-powered analysis and improvement suggestions for your CV
          </p>
        </div>

        {!analysis && !isAnalyzing && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <FileCheck className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">AI CV Analysis</h2>
                <p className="text-gray-600 mb-6">
                  Our AI will analyze your profile and provide improvement
                  suggestions for each section of your CV.
                </p>
              </div>
              <Button
                onClick={handleGenerateAnalysis}
                size="lg"
                className="w-full"
              >
                <FileCheck className="h-5 w-5 mr-2" />
                Analyze and Improve CV
              </Button>
            </CardContent>
          </Card>
        )}

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

        {analysis && <CVAnalysis analysis={analysis} onDownload={downloadCV} />}
      </div>
    </div>
  );
}
