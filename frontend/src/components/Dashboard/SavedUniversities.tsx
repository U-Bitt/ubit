import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Eye, Edit } from "lucide-react";

interface SavedUniversity {
  id: string;
  name: string;
  ranking: number;
  tuition: string;
  acceptance: string;
  deadline: string;
  status: string;
}

interface SavedUniversitiesProps {
  universities: SavedUniversity[];
}

export const SavedUniversities = ({ universities }: SavedUniversitiesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Saved Universities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {universities.map(uni => (
          <div
            key={uni.id}
            className="p-3 rounded-lg border hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-sm">{uni.name}</h4>
                <p className="text-xs text-muted-foreground">
                  #{uni.ranking} • {uni.acceptance}
                </p>
              </div>
              <Badge
                variant={uni.status === "applying" ? "default" : "secondary"}
                className="text-xs"
              >
                {uni.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{uni.tuition}/year</span>
              <span>Due: {uni.deadline}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
