import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Calendar,
  CheckCircle,
  ExternalLink,
  X,
  DollarSign,
  Target,
} from "lucide-react";

interface Scholarship {
  id: number;
  title: string;
  amount: string;
  deadline: string;
  daysLeft: number;
  match: number;
  applied: boolean;
}

interface ScholarshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExternalLink: (url: string) => void;
  scholarships: Scholarship[];
}

export const ScholarshipModal = ({
  isOpen,
  onClose,
  onExternalLink,
  scholarships,
}: ScholarshipModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  Scholarship Opportunities
                </h2>
                <p className="text-lg text-muted-foreground">
                  Find and apply for scholarships
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Scholarship List */}
          <div className="grid md:grid-cols-2 gap-6">
            {scholarships.map(scholarship => (
              <Card
                key={scholarship.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {scholarship.title}
                    </CardTitle>
                    <Badge
                      variant={scholarship.applied ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {scholarship.applied
                        ? "Applied"
                        : `${scholarship.match}% match`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">
                      {scholarship.amount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {scholarship.daysLeft} days left to apply
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {scholarship.match}% match with your profile
                    </span>
                  </div>
                  {!scholarship.applied ? (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Award className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Application Submitted
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center pt-4 border-t">
            <Button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 min-w-[200px]"
              onClick={() => onExternalLink("https://www.scholarships.com")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Find More Scholarships
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
