import React from "react";
import {
  CheckCircle,
  User,
  Search,
  FileText,
  Send,
  Eye,
  Check,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export const SimpleProgressTracker: React.FC = () => {
  const { user } = useUser();

  // Simple progress tracking logic
  const getProgressData = () => {
    // Check visited pages from localStorage (only on client side)
    const visitedPages =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("visitedPages") || "[]")
        : [];

    const hasVisited = (path: string) => visitedPages.includes(path);
    const hasTestScores = () =>
      !!user?.academicInfo?.gpa;
    const hasApplications = () =>
      !!user?.savedUniversities && user.savedUniversities.length > 0;

    // Calculate progress for each phase
    const profileProgress = (() => {
      let points = 0;
      if (user?.firstName && user?.email) points += 10;
      if (user?.academicInfo?.gpa && user?.academicInfo?.highSchoolName) points += 5;
      if (user?.areasOfInterest && user.areasOfInterest.length > 0) points += 5;
      return Math.round((points / 20) * 100);
    })();

    const discoveryProgress = (() => {
      let points = 0;
      if (hasVisited("/discover/universities")) points += 8;
      if (hasVisited("/discover/scholarships")) points += 7;
      if (hasVisited("/discover/countries")) points += 5;
      return Math.round((points / 20) * 100);
    })();

    const preparationProgress = (() => {
      let points = 0;
      if (hasVisited("/prepare/exams") || hasTestScores()) points += 12;
      if (hasVisited("/prepare/documents")) points += 10;
      if (hasVisited("/test-scores")) points += 8;
      return Math.round((points / 30) * 100);
    })();

    const applicationProgress = (() => {
      let points = 0;
      if (hasVisited("/ai-suggestions")) points += 8;
      if (hasApplications()) points += 10;
      if (hasVisited("/ai/improve-cv")) points += 7;
      return Math.round((points / 25) * 100);
    })();

    const managementProgress = (() => {
      let points = 0;
      if (hasVisited("/manage/dashboard")) points += 5;
      return Math.round((points / 5) * 100);
    })();

    return {
      profile: {
        completed: profileProgress === 100,
        current: profileProgress > 0 && profileProgress < 100,
      },
      research: {
        completed: discoveryProgress === 100,
        current: discoveryProgress > 0 && discoveryProgress < 100,
      },
      documents: {
        completed: preparationProgress === 100,
        current: preparationProgress > 0 && preparationProgress < 100,
      },
      application: {
        completed: applicationProgress === 100,
        current: applicationProgress > 0 && applicationProgress < 100,
      },
      tracking: {
        completed: managementProgress === 100,
        current: managementProgress > 0 && managementProgress < 100,
      },
      decision: { completed: false, current: false },
    };
  };

  const progressData = getProgressData();
  const completedSteps = Object.values(progressData).filter(
    step => step.completed
  ).length;
  const totalSteps = 6;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Application Process Tracking & List Management
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Track your progress through each step of the study abroad application
          process
        </p>
      </div>

      {/* Progress Steps */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between items-start">
          {/* Profile Setup */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 bg-white mb-4 transition-all duration-300">
              {progressData.profile.completed ? (
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              ) : progressData.profile.current ? (
                <div className="w-full h-full rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="text-center max-w-[200px]">
              <h3 className="font-semibold text-sm mb-1 text-foreground">
                Profile Setup
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Create your profile and set academic goals
              </p>
            </div>
          </div>

          {/* University Research */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 bg-white mb-4 transition-all duration-300">
              {progressData.research.completed ? (
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              ) : progressData.research.current ? (
                <div className="w-full h-full rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="text-center max-w-[200px]">
              <h3 className="font-semibold text-sm mb-1 text-foreground">
                University Research
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Discover and shortlist universities
              </p>
            </div>
          </div>

          {/* Document Preparation */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 bg-white mb-4 transition-all duration-300">
              {progressData.documents.completed ? (
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              ) : progressData.documents.current ? (
                <div className="w-full h-full rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="text-center max-w-[200px]">
              <h3 className="font-semibold text-sm mb-1 text-foreground">
                Document Preparation
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gather transcripts, essays, and recommendations
              </p>
            </div>
          </div>

          {/* Application Submission */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 bg-white mb-4 transition-all duration-300">
              {progressData.application.completed ? (
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              ) : progressData.application.current ? (
                <div className="w-full h-full rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                  <Send className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <Send className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="text-center max-w-[200px]">
              <h3 className="font-semibold text-sm mb-1 text-foreground">
                Application Submission
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Submit applications to selected universities
              </p>
            </div>
          </div>

          {/* Follow-up & Tracking */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 bg-white mb-4 transition-all duration-300">
              {progressData.tracking.completed ? (
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              ) : progressData.tracking.current ? (
                <div className="w-full h-full rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="text-center max-w-[200px]">
              <h3 className="font-semibold text-sm mb-1 text-foreground">
                Follow-up & Tracking
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Monitor application status and respond to requests
              </p>
            </div>
          </div>

          {/* Decision & Enrollment */}
          <div className="flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 bg-white mb-4 transition-all duration-300">
              {progressData.decision.completed ? (
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              ) : progressData.decision.current ? (
                <div className="w-full h-full rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <div className="w-full h-full rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <Check className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="text-center max-w-[200px]">
              <h3 className="font-semibold text-sm mb-1 text-foreground">
                Decision & Enrollment
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Receive decisions and enroll in chosen university
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-4 bg-white rounded-lg px-6 py-4 shadow-sm border">
          <div className="text-left">
            <div className="text-sm font-medium text-muted-foreground">
              Overall Progress
            </div>
            <div className="text-2xl font-bold text-primary">
              {completedSteps} of {totalSteps} steps completed
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-32">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1 text-center">
              {Math.round((completedSteps / totalSteps) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Next Step CTA */}
      {completedSteps < totalSteps && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>Next:</span>
            <span className="font-medium text-foreground">
              {!progressData.profile.completed && "Profile Setup"}
              {progressData.profile.completed &&
                !progressData.research.completed &&
                "University Research"}
              {progressData.research.completed &&
                !progressData.documents.completed &&
                "Document Preparation"}
              {progressData.documents.completed &&
                !progressData.application.completed &&
                "Application Submission"}
              {progressData.application.completed &&
                !progressData.tracking.completed &&
                "Follow-up & Tracking"}
              {progressData.tracking.completed &&
                !progressData.decision.completed &&
                "Decision & Enrollment"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
