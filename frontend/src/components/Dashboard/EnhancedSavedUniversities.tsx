import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Star,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Heart,
  ExternalLink,
  MoreHorizontal,
  Bookmark,
  TrendingUp,
  Award,
  Globe,
  Clock,
  X,
} from "lucide-react";

interface SavedUniversity {
  id: string;
  name: string;
  ranking: number;
  tuition: string;
  acceptance: string;
  deadline: string;
  status: string;
  location?: string;
  programs?: string[];
  image?: string;
  details?: {
    founded?: string;
    students?: string;
    faculty?: string;
    endowment?: string;
    research?: string;
    notable?: string;
    website?: string;
    type?: string;
    language?: string;
    campus?: string;
  };
}

interface EnhancedSavedUniversitiesProps {
  universities: SavedUniversity[];
  onEditUniversity?: (university: SavedUniversity) => void;
  onViewUniversity?: (university: SavedUniversity) => void;
  onRemoveUniversity?: (universityId: string) => void;
  onApplyToUniversity?: (university: SavedUniversity) => void;
  onViewAllUniversities?: () => void;
}

export const EnhancedSavedUniversities = ({
  universities,
  onEditUniversity,
  onRemoveUniversity,
  onApplyToUniversity,
  onViewAllUniversities,
}: EnhancedSavedUniversitiesProps) => {
  const [expandedUniversity, setExpandedUniversity] = useState<string | null>(
    null
  );

  const toggleExpanded = (universityId: string) => {
    setExpandedUniversity(
      expandedUniversity === universityId ? null : universityId
    );
  };
  const getStatusColor = (status: string | undefined) => {
    if (!status || typeof status !== "string") {
      return "bg-gray-100 text-gray-800 border-gray-200";
    }

    switch (status.toLowerCase()) {
      case "applying":
        return "bg-primary/10 text-primary border-primary/20";
      case "considering":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "waitlisted":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    if (!status || typeof status !== "string") {
      return <Bookmark className="h-3 w-3" />;
    }

    switch (status.toLowerCase()) {
      case "applying":
        return <TrendingUp className="h-3 w-3" />;
      case "considering":
        return <Star className="h-3 w-3" />;
      case "accepted":
        return <Award className="h-3 w-3" />;
      case "rejected":
        return <X className="h-3 w-3" />;
      case "waitlisted":
        return <Clock className="h-3 w-3" />;
      default:
        return <Bookmark className="h-3 w-3" />;
    }
  };

  const getRankingColor = (ranking: number) => {
    if (ranking <= 10) return "text-red-600 font-bold";
    if (ranking <= 50) return "text-orange-600 font-semibold";
    if (ranking <= 100) return "text-yellow-600 font-medium";
    return "text-green-600";
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          Saved Universities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {universities.length === 0 ? (
          <div className="text-center py-8">
            <GraduationCap className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">No saved universities</p>
            <p className="text-sm text-slate-500">
              Start exploring and save your favorites
            </p>
          </div>
        ) : (
          universities.map((university, index) => (
            <div
              key={index}
              className="group p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300 bg-white/50 hover:bg-white/80"
            >
              <div className="flex items-start gap-4">
                {/* University Logo/Initial */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {university.name
                    ? university.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">
                        {university.name || "Unknown University"}
                      </h4>
                      <Badge
                        className={`${getStatusColor(university.status)} flex items-center gap-1 text-xs`}
                      >
                        {getStatusIcon(university.status)}
                        {university.status || "Unknown"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="p-1">
                        <Heart className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* University Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div className="text-center p-2 rounded-lg bg-slate-50 group-hover:bg-emerald-50 transition-colors duration-300">
                      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                        <Star className="h-3 w-3" />
                        <span className="text-xs font-medium">Ranking</span>
                      </div>
                      <p
                        className={`text-sm font-bold ${getRankingColor(university.ranking)}`}
                      >
                        #{university.ranking}
                      </p>
                    </div>

                    <div className="text-center p-2 rounded-lg bg-slate-50 group-hover:bg-emerald-50 transition-colors duration-300">
                      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                        <DollarSign className="h-3 w-3" />
                        <span className="text-xs font-medium">Tuition</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {university.tuition}
                      </p>
                    </div>

                    <div className="text-center p-2 rounded-lg bg-slate-50 group-hover:bg-emerald-50 transition-colors duration-300">
                      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                        <Users className="h-3 w-3" />
                        <span className="text-xs font-medium">Acceptance</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {university.acceptance}
                      </p>
                    </div>

                    <div className="text-center p-2 rounded-lg bg-slate-50 group-hover:bg-emerald-50 transition-colors duration-300">
                      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs font-medium">Deadline</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {university.deadline}
                      </p>
                    </div>
                  </div>

                  {/* Location and Programs */}
                  {university.location && (
                    <div className="flex items-center gap-1 text-sm text-slate-600 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{university.location}</span>
                    </div>
                  )}

                  {university.programs && university.programs.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {university.programs.slice(0, 3).map((program, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {university.programs.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{university.programs.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                        onClick={() => toggleExpanded(university.id)}
                      >
                        <ExternalLink className="h-3 w-3" />
                        {expandedUniversity === university.id
                          ? "Hide Details"
                          : "Show Details"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                        onClick={() => onRemoveUniversity?.(university.id)}
                      >
                        <X className="h-3 w-3" />
                        Unsave
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedUniversity === university.id &&
                    university.details && (
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                        <h4 className="font-semibold text-slate-900 mb-3">
                          Detailed Information
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {university.details.founded && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Calendar className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">
                                  Founded
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {university.details.founded}
                                </p>
                              </div>
                            </div>
                          )}

                          {university.details.students && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                                <Users className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">
                                  Total Students
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {university.details.students}
                                </p>
                              </div>
                            </div>
                          )}

                          {university.details.faculty && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                <GraduationCap className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">
                                  Faculty
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {university.details.faculty}
                                </p>
                              </div>
                            </div>
                          )}

                          {university.details.endowment && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-yellow-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">
                                  Endowment
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {university.details.endowment}
                                </p>
                              </div>
                            </div>
                          )}

                          {university.details.type && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <Award className="h-4 w-4 text-indigo-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">
                                  Institution Type
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {university.details.type}
                                </p>
                              </div>
                            </div>
                          )}

                          {university.details.language && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                                <Globe className="h-4 w-4 text-red-600" />
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 font-medium">
                                  Language
                                </p>
                                <p className="text-sm font-semibold text-slate-900">
                                  {university.details.language}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {university.details.research && (
                          <div className="mt-4">
                            <p className="text-xs text-slate-500 font-medium mb-2">
                              Research Focus
                            </p>
                            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
                              {university.details.research}
                            </p>
                          </div>
                        )}

                        {university.details.notable && (
                          <div className="mt-4">
                            <p className="text-xs text-slate-500 font-medium mb-2">
                              Notable Achievements
                            </p>
                            <p className="text-sm text-slate-700 bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
                              {university.details.notable}
                            </p>
                          </div>
                        )}

                        {university.details.website && (
                          <div className="mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() =>
                                window.open(
                                  university.details!.website,
                                  "_blank"
                                )
                              }
                            >
                              <ExternalLink className="h-3 w-3" />
                              Visit Website
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* View all universities button */}
        <div className="pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            className="w-full gap-2 hover:bg-slate-50"
            onClick={() => onViewAllUniversities?.()}
          >
            <GraduationCap className="h-4 w-4" />
            View All Universities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
