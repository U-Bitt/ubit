import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Application } from "./types";
import { 
  Eye, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Target
} from "lucide-react";

interface EnhancedApplicationProgressProps {
  applications: Application[];
  onViewDetails: (application: Application) => void;
}

export const EnhancedApplicationProgress = ({
  applications,
  onViewDetails,
}: EnhancedApplicationProgressProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return <CheckCircle className="h-4 w-4" />;
      case "in progress":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };


  return (
    <div className="mb-8">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Target className="h-5 w-5 text-white" />
              </div>
              Application Progress
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <TrendingUp className="h-4 w-4" />
              <span>2 of 3 applications in progress</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {applications.map((app, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white/50 hover:bg-white/80"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {app.university.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      {app.university}
                    </h4>
                    <p className="text-sm text-slate-600 font-medium">{app.program}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{app.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(app.status)} flex items-center gap-1`}>
                    {getStatusIcon(app.status)}
                    {app.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => onViewDetails(app)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Progress</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{Math.round(app.progress)}%</span>
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${Math.round(app.progress)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <Progress value={Math.round(app.progress)} className="h-2" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300">
                  <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs font-medium">Deadline</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{app.deadline}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300">
                  <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                    <DollarSign className="h-3 w-3" />
                    <span className="text-xs font-medium">Tuition</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{app.tuition}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300">
                  <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                    <Users className="h-3 w-3" />
                    <span className="text-xs font-medium">Acceptance</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{app.acceptance}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300">
                  <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                    <Star className="h-3 w-3" />
                    <span className="text-xs font-medium">Ranking</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">#{app.ranking}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    onClick={() => onViewDetails(app)}
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="gap-2"
                    onClick={() => window.open(app.website, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Website
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="group-hover:bg-blue-50 transition-colors duration-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
