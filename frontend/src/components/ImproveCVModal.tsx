import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, FileCheck, Download, Copy, CheckCircle, AlertCircle } from "lucide-react";

interface ImproveCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: {
    personalInfo: any;
    academicInfo: any;
    testScores: any[];
    interests: string[];
  };
}

interface CVSection {
  title: string;
  content: string;
  improved: string;
  suggestions: string[];
}

export const ImproveCVModal = ({ isOpen, onClose, userProfile }: ImproveCVModalProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cvSections, setCvSections] = useState<CVSection[]>([]);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const generateCV = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const sections: CVSection[] = [
        {
          title: "Personal Statement",
          content: `I am ${userProfile.personalInfo.firstName} ${userProfile.personalInfo.lastName}, a ${userProfile.academicInfo.major} student with a GPA of ${userProfile.academicInfo.gpa}. I am interested in ${userProfile.interests.join(", ")}.`,
          improved: `Dedicated ${userProfile.academicInfo.major} student with a strong academic record (GPA: ${userProfile.academicInfo.gpa}) and passion for ${userProfile.interests.join(", ")}. Seeking to leverage technical skills and innovative thinking to contribute to cutting-edge projects in technology and research.`,
          suggestions: [
            "Use more action verbs (leverage, contribute, seeking)",
            "Quantify achievements where possible",
            "Show passion and specific goals",
            "Keep it concise but impactful"
          ]
        },
        {
          title: "Education",
          content: `${userProfile.academicInfo.school} - ${userProfile.academicInfo.major} - GPA: ${userProfile.academicInfo.gpa}`,
          improved: `${userProfile.academicInfo.school}\n${userProfile.academicInfo.major} | Expected Graduation: ${userProfile.academicInfo.graduationYear}\nGPA: ${userProfile.academicInfo.gpa}/4.0\n\nRelevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems`,
          suggestions: [
            "Add relevant coursework",
            "Include expected graduation date",
            "Format with clear sections",
            "Add academic achievements if any"
          ]
        },
        {
          title: "Test Scores",
          content: userProfile.testScores.map(score => `${score.test}: ${score.score}`).join(", "),
          improved: userProfile.testScores.map(score => 
            `${score.test}: ${score.score} (${score.date})`
          ).join("\n"),
          suggestions: [
            "Include test dates",
            "Format consistently",
            "Highlight highest scores",
            "Add context if needed"
          ]
        },
        {
          title: "Skills & Interests",
          content: userProfile.interests.join(", "),
          improved: `Technical Skills: Programming (Python, JavaScript, Java), Data Analysis, Problem Solving\n\nInterests: ${userProfile.interests.join(", ")}\n\nLanguages: English (Native), ${userProfile.personalInfo.nationality}`,
          suggestions: [
            "Categorize skills (Technical, Soft, Languages)",
            "Be specific about programming languages",
            "Add relevant technical skills",
            "Include language proficiency"
          ]
        },
        {
          title: "Contact Information",
          content: `${userProfile.personalInfo.email} | ${userProfile.personalInfo.phone}`,
          improved: `${userProfile.personalInfo.firstName} ${userProfile.personalInfo.lastName}\n${userProfile.personalInfo.email} | ${userProfile.personalInfo.phone}\n${userProfile.personalInfo.address}\nLinkedIn: linkedin.com/in/${userProfile.personalInfo.firstName.toLowerCase()}-${userProfile.personalInfo.lastName.toLowerCase()}`,
          suggestions: [
            "Include full name at top",
            "Add LinkedIn profile",
            "Include address",
            "Format professionally"
          ]
        }
      ];
      
      setCvSections(sections);
      setIsAnalyzing(false);
    }, 3000);
  };

  const copyToClipboard = (text: string, sectionTitle: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionTitle);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const downloadCV = () => {
    const fullCV = cvSections.map(section => 
      `${section.title}\n${section.improved}\n\n`
    ).join("");
    
    const blob = new Blob([fullCV], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userProfile.personalInfo.firstName}_${userProfile.personalInfo.lastName}_CV.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                AI CV Improvement
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isAnalyzing && cvSections.length === 0 && (
              <div className="text-center py-8">
                <FileCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI-Powered CV Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI will analyze your profile and suggest improvements for each section of your CV.
                </p>
                <Button onClick={generateCV} className="w-full">
                  Analyze & Improve My CV
                </Button>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">AI is analyzing your profile...</h3>
                <p className="text-muted-foreground">
                  This may take a few moments while we generate personalized suggestions.
                </p>
              </div>
            )}

            {cvSections.length > 0 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Improved CV Sections</h3>
                  <Button onClick={downloadCV} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Full CV
                  </Button>
                </div>

                {cvSections.map((section, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-lg">{section.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(section.improved, section.title)}
                        >
                          {copiedSection === section.title ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2 text-sm text-muted-foreground">Original:</h5>
                          <div className="p-3 bg-muted rounded-lg text-sm">
                            {section.content}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2 text-sm text-green-600">AI Improved:</h5>
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm whitespace-pre-line">
                            {section.improved}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2 text-sm text-blue-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            AI Suggestions:
                          </h5>
                          <div className="space-y-1">
                            {section.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
