import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  X,
  BookOpen,
  Users,
} from "lucide-react";

interface TestDate {
  date: string;
  location: string;
  spots: number;
}

interface Exam {
  id: number;
  name: string;
  fullName: string;
  provider: string;
  duration: string;
  cost: string;
  registrationUrl: string;
  nextDates: TestDate[];
}

interface ScheduleExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExternalLink: (url: string) => void;
  availableExams: Exam[];
}

export const ScheduleExamModal = ({
  isOpen,
  onClose,
  onExternalLink,
  availableExams,
}: ScheduleExamModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Schedule Exam</h2>
                <p className="text-lg text-muted-foreground">
                  Register for standardized tests
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8">
          {/* Available Exams */}
          <div className="space-y-6">
            {availableExams.map(exam => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{exam.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {exam.fullName}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {exam.provider}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Exam Details */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">
                        {exam.cost}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Multiple locations</span>
                    </div>
                  </div>

                  {/* Available Dates */}
                  <div>
                    <h4 className="font-semibold mb-3">Available Test Dates</h4>
                    <div className="space-y-3">
                      {exam.nextDates.map((testDate, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <Calendar className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {testDate.date}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {testDate.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                testDate.spots > 10
                                  ? "default"
                                  : testDate.spots > 5
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="text-xs"
                            >
                              {testDate.spots} spots left
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                onExternalLink(exam.registrationUrl)
                              }
                            >
                              Register
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Register Button */}
                  <div className="pt-4 border-t">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => onExternalLink(exam.registrationUrl)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Register for {exam.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Need Help Choosing?
                  </h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Not sure which exam to take? Check your target
                    universities&apos; requirements or consult with your
                    academic advisor.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-700"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      University Requirements
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-300 text-blue-700"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Get Advice
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
