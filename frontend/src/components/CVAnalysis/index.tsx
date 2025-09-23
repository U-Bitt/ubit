import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Briefcase,
  User,
  Lightbulb,
  BarChart3,
  Copy,
  Download,
  FileCheck,
} from "lucide-react";

interface CVSection {
  title: string;
  content: string;
  improved: string;
  suggestions: string[];
  score: number;
  maxScore: number;
}

interface CVAnalysis {
  overallScore: number;
  sections: CVSection[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

interface CVAnalysisProps {
  analysis: CVAnalysis;
  onDownload?: () => void;
  selectedSections?: string[];
}

export const CVAnalysis = ({
  analysis,
  onDownload,
  selectedSections,
}: CVAnalysisProps) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionTitle: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionTitle);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getScoreBadge = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getSectionIcon = (title: string) => {
    switch (title) {
      case "Personal Statement":
        return <User className="h-5 w-5" />;
      case "Education":
        return <BookOpen className="h-5 w-5" />;
      case "Experience":
        return <Briefcase className="h-5 w-5" />;
      case "Skills":
        return <Target className="h-5 w-5" />;
      case "Projects":
        return <Award className="h-5 w-5" />;
      default:
        return <FileCheck className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-bold text-blue-600">
              {analysis.overallScore}/10
            </div>
            <div className="flex-1">
              <Progress value={analysis.overallScore * 10} className="h-3" />
              <p className="text-sm text-gray-600 mt-1">
                {analysis.overallScore >= 8
                  ? "Excellent"
                  : analysis.overallScore >= 6
                    ? "Good"
                    : "Needs Improvement"}
              </p>
            </div>
          </div>
          {onDownload && (
            <div className="flex gap-2">
              <Button onClick={onDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          {selectedSections && selectedSections.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Selected sections:</strong> {selectedSections.length}{" "}
                section(s) will be analyzed
              </p>
            </div>
          )}
          {analysis.sections
            .filter(section => {
              if (!selectedSections || selectedSections.length === 0)
                return true;
              const sectionMap: { [key: string]: string } = {
                personal: "Personal Statement",
                education: "Education",
                experience: "Work Experience",
                skills: "Skills",
                projects: "Projects",
              };
              return selectedSections.some(
                selected => sectionMap[selected] === section.title
              );
            })
            .map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getSectionIcon(section.title)}
                      {section.title}
                    </CardTitle>
                    <Badge
                      className={getScoreBadge(section.score, section.maxScore)}
                    >
                      {section.score}/{section.maxScore}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">
                      Current Version:
                    </h4>
                    <div className="bg-red-50 p-3 rounded-md text-sm">
                      {section.content}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">
                      Improved Version:
                    </h4>
                    <div className="bg-green-50 p-3 rounded-md text-sm">
                      {section.improved}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Improvement Suggestions:
                    </h4>
                    <ul className="space-y-1">
                      {section.suggestions.map((suggestion, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(section.improved, section.title)
                      }
                    >
                      {copiedSection === section.title ? (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copiedSection === section.title ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="strengths">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weaknesses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
