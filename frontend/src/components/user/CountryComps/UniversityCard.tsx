import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Heart, ArrowRight } from "lucide-react";

interface UniversityCardProps {
  university: {
    id: string;
    name: string;
    location: string;
    ranking: number;
    rating: number;
    tuition: string;
    acceptance: string;
    students: string;
    image: string;
    programs: string[];
    highlights: string[];
    deadline: string;
  };
  onViewDetails?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
}

export default function UniversityCard({
  university,
  onViewDetails,
  onAddToWishlist,
}: UniversityCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <Image
          src={university.image || "/placeholder.svg"}
          alt={university.name}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-primary-foreground">
            #{university.ranking} Globally
          </Badge>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-4 right-4 rounded-full w-10 h-10 p-0"
          onClick={() => onAddToWishlist?.(university.id)}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">{university.name}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{university.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{university.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Tuition</p>
            <p className="font-semibold text-sm">{university.tuition}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Acceptance</p>
            <p className="font-semibold text-sm">{university.acceptance}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Students</p>
            <p className="font-semibold text-sm">{university.students}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">Popular Programs:</p>
            <div className="flex flex-wrap gap-1">
              {university.programs.slice(0, 3).map((program, programIndex) => (
                <Badge
                  key={programIndex}
                  variant="secondary"
                  className="text-xs"
                >
                  {program}
                </Badge>
              ))}
              {university.programs.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{university.programs.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Highlights:</p>
            <div className="flex flex-wrap gap-1">
              {university.highlights.map((highlight, highlightIndex) => (
                <Badge
                  key={highlightIndex}
                  variant="outline"
                  className="text-xs"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="text-sm">
            <span className="text-muted-foreground">Application Deadline</span>
            <span className="font-medium text-destructive">
              {university.deadline}
            </span>
          </div>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90"
            onClick={() => onViewDetails?.(university.id)}
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
