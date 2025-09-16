import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UniversitySlideshow } from "@/components/ui/UniversitySlideshow";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AutoScrollingFeatures } from "@/components/ui/AutoScrollingFeatures";
import { ApplicationProcessDiagram } from "@/components/ui/ApplicationProcessDiagram";
import { RecommendedUniversities } from "@/components/ui/RecommendedUniversities";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const universityImages = ["/uni1.jpg", "/uni2.jpg", "/uni3.jpg"];

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden">
          {/* Background slideshow */}
          <div className="absolute inset-0">
            <UniversitySlideshow images={universityImages} />
          </div>

          {/* Text overlay */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
              <div className="space-y-8">
                <div>
                  <h1 className="text-9xl md:text-[12rem] font-bold text-white mb-4 leading-tight">
                    <AnimatedText />
                  </h1>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 rounded-full"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent"
                  >
                    Explore Universities
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-foreground">
                  Our Features
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our comprehensive platform provides all the tools and
                  resources you need to successfully apply to universities
                  worldwide.
                </p>
              </div>

              {/* Right side - Auto-scrolling features */}
              <AutoScrollingFeatures />
            </div>
          </div>
        </section>

        {/* Donor Connecting Feature Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Connect with Donors
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get connected with generous donors who can help fund your
                education journey. Our platform matches students with potential
                sponsors and scholarship opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Donor Matching
                  </h3>
                  <p className="text-muted-foreground">
                    Get matched with donors based on your field of study,
                    location, and financial needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Scholarship Opportunities
                  </h3>
                  <p className="text-muted-foreground">
                    Access exclusive scholarship opportunities from our network
                    of educational sponsors.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Process Tracking Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Application Process Tracking & List Management
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                We will provide you with comprehensive application process
                tracking and necessary list management to ensure you never miss
                a deadline or important requirement.
              </p>

              {/* Process Diagram */}
              <ApplicationProcessDiagram />
            </div>
          </div>
        </section>

        {/* Recommended Universities Section */}
        <RecommendedUniversities />
      </main>

    </div>
  );
}
