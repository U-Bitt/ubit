import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Award } from "lucide-react";

export default function About() {
  const stats = [
    { number: "50,000+", label: "Students Helped", icon: Users },
    { number: "2,500+", label: "Universities", icon: Target },
    { number: "95%", label: "Success Rate", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            About <span className="text-primary">Ubit</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We&apos;re on a mission to democratize access to world-class
            education by providing students with the tools, resources, and
            guidance they need to successfully apply to universities worldwide.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Learn More About Our Mission
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that every student deserves access to quality
                education, regardless of their background or location. Our
                platform breaks down barriers and provides personalized guidance
                to help students achieve their academic dreams.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong>Democratize Education:</strong> Make world-class
                    education accessible to students from all backgrounds.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong>Personalized Guidance:</strong> Provide AI-powered
                    recommendations tailored to each student&apos;s profile.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong>Streamline Applications:</strong> Simplify the
                    complex university application process with our
                    comprehensive tools.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Our Impact
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students Served</span>
                  <span className="font-semibold">50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Universities Partnered
                  </span>
                  <span className="font-semibold">2,500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-semibold text-green-600">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Countries Covered
                  </span>
                  <span className="font-semibold">150+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30 rounded-lg">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re a diverse team of educators, technologists, and
              international students who are passionate about making education
              accessible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  AS
                </div>
                <h3 className="text-xl font-bold mb-2">Alex Smith</h3>
                <p className="text-muted-foreground mb-4">CEO & Founder</p>
                <p className="text-sm text-muted-foreground">
                  Former international student with 10+ years in education
                  technology.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  MJ
                </div>
                <h3 className="text-xl font-bold mb-2">Maria Johnson</h3>
                <p className="text-muted-foreground mb-4">Head of Product</p>
                <p className="text-sm text-muted-foreground">
                  UX designer with expertise in educational platforms and user
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  DK
                </div>
                <h3 className="text-xl font-bold mb-2">David Kim</h3>
                <p className="text-muted-foreground mb-4">CTO</p>
                <p className="text-sm text-muted-foreground">
                  Full-stack developer with experience in AI and machine
                  learning systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already building their path to
            world-class education with Ubit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
