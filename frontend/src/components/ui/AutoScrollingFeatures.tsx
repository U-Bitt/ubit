"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  MapPin,
  BookOpen,
  FileText,
  Lightbulb,
  Target,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "University Discovery",
    description:
      "Explore thousands of universities worldwide with detailed information about programs, rankings, and requirements.",
  },
  {
    icon: MapPin,
    title: "Country Research",
    description:
      "Compare study destinations, costs, visa requirements, and work opportunities across different countries.",
  },
  {
    icon: BookOpen,
    title: "Exam Preparation",
    description:
      "Track your standardized test preparation with personalized study plans and practice resources.",
  },
  {
    icon: FileText,
    title: "Document Management",
    description:
      "Organize and track all your application documents with automated deadline reminders.",
  },
  {
    icon: Lightbulb,
    title: "AI Recommendations",
    description:
      "Get personalized university and program recommendations based on your profile and preferences.",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description:
      "Monitor your application progress with detailed analytics and milestone tracking.",
  },
];

export function AutoScrollingFeatures() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 15); // Adjust speed here (lower = faster)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-80 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
        {/* Duplicate features for seamless loop */}
        {features.map((feature, index) => (
          <Card
            key={`duplicate-${index}`}
            className="flex-shrink-0 w-80 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
