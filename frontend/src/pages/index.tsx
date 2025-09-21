import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UniversitySlideshow } from "@/components/ui/UniversitySlideshow";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AutoScrollingFeatures } from "@/components/ui/AutoScrollingFeatures";
import { ApplicationProcessDiagram } from "@/components/ui/ApplicationProcessDiagram";
import { GlobeSection } from "@/components/ui/GlobeSection";
import { NewsSection } from "@/components/ui/NewsSection";
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

        {/* News Section */}
        <NewsSection />

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

        {/* 3D Globe Section */}
        <GlobeSection />

        {/* Application Process Tracking Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-12">
                Application Process Tracking & List Management
              </h2>

              {/* Process Diagram */}
              <ApplicationProcessDiagram />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
