import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  BookOpen,
  Briefcase,
  Target,
  Award,
  Download,
  Copy,
} from "lucide-react";

interface CVTemplateProps {
  userProfile: {
    personalInfo: Record<string, unknown>;
    academicInfo: Record<string, unknown>;
    interests: string[];
  };
  onCopy?: (section: string, content: string) => void;
  onDownload?: () => void;
}

export const CVTemplate = ({
  userProfile,
  onCopy,
  onDownload,
}: CVTemplateProps) => {
  const cvSections = [
    {
      title: "Personal Information",
      icon: <User className="h-5 w-5" />,
      content: `${userProfile.personalInfo.firstName as string} ${userProfile.personalInfo.lastName as string}\n${userProfile.personalInfo.email as string}\n${(userProfile.personalInfo.phone as string) || ""}\n${(userProfile.personalInfo.nationality as string) || ""}`,
    },
    {
      title: "Education",
      icon: <BookOpen className="h-5 w-5" />,
      content: `${(userProfile.academicInfo.major as string) || "Computer Science"}\n${(userProfile.academicInfo.university as string) || "University Name"}\nGPA: ${(userProfile.academicInfo.gpa as string) || "3.5"}\n${(userProfile.academicInfo.graduationYear as string) || "2024"}`,
    },
    {
      title: "Skills",
      icon: <Target className="h-5 w-5" />,
      content: `Technical Skills:\n• Programming Languages: Python, JavaScript, Java\n• Frameworks: React, Node.js, Django\n• Tools: Git, Docker, MongoDB\n\nSoft Skills:\n• Leadership, Teamwork, Problem-solving`,
    },
    {
      title: "Experience",
      icon: <Briefcase className="h-5 w-5" />,
      content: `Software Development Intern | Tech Company | Summer 2023\n• Developed web applications using React and Node.js\n• Collaborated with team of 5 developers\n• Improved application performance by 25%\n\nResearch Assistant | University Lab | 2022-2023\n• Conducted research on machine learning algorithms\n• Published findings in peer-reviewed journal`,
    },
    {
      title: "Projects",
      icon: <Award className="h-5 w-5" />,
      content: `E-commerce Website | Personal Project | 2023\n• Built full-stack web application using React and Node.js\n• Implemented user authentication and payment processing\n• Deployed on AWS with 99.9% uptime\n\nMachine Learning Model | Academic Project | 2022\n• Developed predictive model for student performance\n• Achieved 85% accuracy using Python and scikit-learn`,
    },
  ];

  const handleCopy = (section: string, content: string) => {
    if (onCopy) {
      onCopy(section, content);
    } else {
      navigator.clipboard.writeText(content);
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      const cvContent = cvSections
        .map(section => `${section.title}\n${section.content}\n`)
        .join("\n");

      const blob = new Blob([cvContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv-template.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">CV Template</h2>
        <div className="flex gap-2">
          <Button onClick={handleDownload} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {cvSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="whitespace-pre-wrap text-sm font-mono">
                  {section.content}
                </pre>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(section.title, section.content)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Section
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            Tips for a Great CV:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use action verbs to describe your achievements</li>
            <li>• Quantify your accomplishments with numbers</li>
            <li>• Keep it concise and easy to read</li>
            <li>
              • Tailor your CV to the specific job you&apos;re applying for
            </li>
            <li>• Proofread carefully for spelling and grammar errors</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
