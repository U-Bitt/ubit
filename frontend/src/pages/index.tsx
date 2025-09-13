import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  MapPin,
  BookOpen,
  FileText,
  Lightbulb,
  ArrowRight,
  Star,
  Target,
} from "lucide-react";

export default function Home() {
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

  const stats = [
    { number: "2,500+", label: "Universities" },
    { number: "95%", label: "Success Rate" },
    { number: "150+", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
                Your Journey to
                <span className="text-primary"> World-Class Education</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Discover universities, track applications, and get personalized
                recommendations to make your dream of studying abroad a reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 py-4"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4"
                >
                  Explore Universities
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive platform provides all the tools and resources
                you need to successfully apply to universities worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                What Students Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      AS
                    </div>
                    <div>
                      <h4 className="font-semibold">Alex Smith</h4>
                      <p className="text-sm text-muted-foreground">
                        MIT &apos;28
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &quot;Ubit helped me organize my entire application process.
                    The AI recommendations were spot-on, and I got into my dream
                    school!&quot;
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                      MJ
                    </div>
                    <div>
                      <h4 className="font-semibold">Maria Johnson</h4>
                      <p className="text-sm text-muted-foreground">
                        Stanford &apos;28
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &quot;The document tracking feature was a lifesaver. I never
                    missed a deadline and stayed organized throughout the entire
                    process.&quot;
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                      DK
                    </div>
                    <div>
                      <h4 className="font-semibold">David Kim</h4>
                      <p className="text-sm text-muted-foreground">
                        Harvard &apos;28
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &quot;The personalized recommendations helped me discover
                    universities I never knew about. Highly recommend this
                    platform!&quot;
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already building their path
                to world-class education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 py-4"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
