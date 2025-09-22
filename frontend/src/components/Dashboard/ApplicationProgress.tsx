import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { Application } from "./types";

interface ApplicationProgressProps {
  applications: Application[];
  onViewDetails: (application: Application) => void;
}

export const ApplicationProgress = ({
  applications,
  onViewDetails,
}: ApplicationProgressProps) => {
  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Application Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {applications.map((app, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{app.university}</h4>
                  <p className="text-sm text-muted-foreground">{app.program}</p>
                </div>
                <Badge
                  variant={
                    app.status === "Submitted"
                      ? "default"
                      : app.status === "In Progress"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {app.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{app.progress}%</span>
                </div>
                <Progress value={app.progress} className="h-2" />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Deadline: {app.deadline}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewDetails(app)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
