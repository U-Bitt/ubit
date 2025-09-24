import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActivityItem } from "./types";
import {
  Activity,
  Clock,
  MoreHorizontal,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingUp,
  RefreshCw,
  Eye,
} from "lucide-react";

interface EnhancedRecentActivityProps {
  activities: ActivityItem[];
}

export const EnhancedRecentActivity = ({
  activities,
}: EnhancedRecentActivityProps) => {
  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "application":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "document":
        return <AlertCircle className="h-4 w-4 text-primary" />;
      case "university":
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case "exam":
        return <RefreshCw className="h-4 w-4 text-orange-500" />;
      default:
        return <Info className="h-4 w-4 text-slate-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "application":
        return "bg-green-100 text-green-800 border-green-200";
      case "document":
        return "bg-primary/10 text-primary border-primary/20";
      case "university":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "exam":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTimeColor = (time: string) => {
    if (time.includes("hour")) return "text-red-600";
    if (time.includes("day")) return "text-orange-600";
    if (time.includes("week")) return "text-yellow-600";
    return "text-slate-600";
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Activity className="h-5 w-5 text-white" />
            </div>
            Recent Activity
          </CardTitle>
          <Button size="sm" variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">No recent activity</p>
            <p className="text-sm text-slate-500">
              Your activity will appear here
            </p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div
              key={index}
              className="group p-4 rounded-lg border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 bg-white/50 hover:bg-white/80"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-purple-50 transition-colors duration-300">
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors duration-300 truncate">
                      {activity.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getActivityColor(activity.type)} text-xs`}
                      >
                        {activity.type}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span
                        className={`font-medium ${getTimeColor(activity.time)}`}
                      >
                        {activity.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-xs"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1 text-xs"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity indicator line */}
              <div className="mt-3 h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))
        )}

        {/* View all activities button */}
        <div className="pt-4 border-t border-slate-200">
          <Button variant="outline" className="w-full gap-2 hover:bg-slate-50">
            <Activity className="h-4 w-4" />
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
