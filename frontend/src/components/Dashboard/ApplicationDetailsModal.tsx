import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  GraduationCap,
  Calendar,
  CheckCircle,
  FileText,
  Clock,
  Target,
  ExternalLink,
  Edit,
  X,
  MapPin,
  DollarSign,
  Percent,
  Mail,
} from "lucide-react";

import { Application, Document, Milestone } from "./types";

interface ApplicationDetailsModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onExternalLink: (url: string) => void;
}

export const ApplicationDetailsModal = ({
  application,
  isOpen,
  onClose,
  onExternalLink,
}: ApplicationDetailsModalProps) => {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={application.image}
                alt={application.university}
                width={64}
                height={64}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{application.university}</h2>
                <p className="text-lg text-muted-foreground">
                  {application.program}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">#{application.ranking}</Badge>
                  <Badge
                    variant={
                      application.status === "Submitted"
                        ? "default"
                        : application.status === "In Progress"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8">
          {/* University Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  University Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{application.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{application.tuition}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {application.acceptance} acceptance rate
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Deadline: {application.deadline}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Application Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm font-bold">
                      {application.progress}%
                    </span>
                  </div>
                  <Progress value={application.progress} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    {application.progress}% complete
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Program Description */}
          <Card>
            <CardHeader>
              <CardTitle>Program Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {application.description}
              </p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Admission Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {application.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Document Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.documents.map((doc: Document, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-white border-2 border-primary" />
                      <div>
                        <span className="font-medium text-sm">{doc.name}</span>
                        {doc.required && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs text-gray-600 border-gray-300"
                          >
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs capitalize text-gray-600 border-gray-300"
                    >
                      {doc.status.replace("-", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Application Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.milestones.map(
                  (milestone: Milestone, index: number) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          milestone.completed
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {milestone.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-medium ${
                              milestone.completed
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {milestone.title}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {milestone.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Continue Application
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onExternalLink(application.website)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit University Website
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Contact Admissions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
