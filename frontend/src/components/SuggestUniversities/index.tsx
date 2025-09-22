import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface SuggestUniversitiesProps {
  gpa: string;
  sat: string;
  toefl: string;
  major: string;
}

export default function SuggestUniversities({
  gpa,
  sat,
  toefl,
  major,
}: SuggestUniversitiesProps) {
  const router = useRouter();

  const handleClick = () => {
    // Store user data in sessionStorage to pass to the AI suggestions page
    const userData = { gpa, sat, toefl, major };
    sessionStorage.setItem("aiSuggestionsData", JSON.stringify(userData));

    // Navigate to the AI suggestions page
    router.push("/ai-suggestions");
  };

  return (
    <div>
      <Button onClick={handleClick} className="w-full" size="lg">
        <GraduationCap className="h-4 w-4 mr-2" />
        AI санал авах
      </Button>
    </div>
  );
}
