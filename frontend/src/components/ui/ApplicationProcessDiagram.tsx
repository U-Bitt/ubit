"use client";

import { CheckCircle, Circle, ArrowRight } from "lucide-react";

const processSteps = [
  {
    id: 1,
    title: "Profile Setup",
    description: "Create your profile and set academic goals",
    status: "completed",
  },
  {
    id: 2,
    title: "University Research",
    description: "Discover and shortlist universities",
    status: "completed",
  },
  {
    id: 3,
    title: "Document Preparation",
    description: "Gather transcripts, essays, and recommendations",
    status: "in-progress",
  },
  {
    id: 4,
    title: "Application Submission",
    description: "Submit applications to selected universities",
    status: "pending",
  },
  {
    id: 5,
    title: "Follow-up & Tracking",
    description: "Monitor application status and respond to requests",
    status: "pending",
  },
  {
    id: 6,
    title: "Decision & Enrollment",
    description: "Receive decisions and enroll in chosen university",
    status: "pending",
  },
];

export function ApplicationProcessDiagram() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-200 hidden md:block"></div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
          {processSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                    step.status === "completed"
                      ? "bg-primary border-primary text-white"
                      : step.status === "in-progress"
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {step.status === "completed" ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <Circle className="w-8 h-8" />
                  )}
                </div>

                {/* Step Number */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                  {step.id}
                </div>

                {/* Step Content */}
                <div className="mt-4 text-center">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow for mobile */}
              {index < processSteps.length - 1 && (
                <div className="md:hidden flex justify-center mt-4">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-8 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Overall Progress
          </span>
          <span className="text-sm text-muted-foreground">
            2 of 6 steps completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: "33%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
