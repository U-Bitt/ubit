import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

export default function PackagesPage() {
  const packages = [
    {
      id: 1,
      name: "Basic Plan",
      price: "Free",
      description: "Perfect for getting started with university applications",
      features: [
        "Access to 100+ universities",
        "Basic application tracking",
        "Document storage (up to 5 files)",
        "Email support",
      ],
      popular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      id: 2,
      name: "Premium Plan",
      price: "$29",
      period: "/month",
      description: "Most popular choice for serious applicants",
      features: [
        "Access to 2,500+ universities",
        "Advanced application tracking",
        "Unlimited document storage",
        "AI-powered recommendations",
        "Priority support",
        "Interview preparation tools",
        "Scholarship matching",
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
    },
    {
      id: 3,
      name: "Pro Plan",
      price: "$59",
      period: "/month",
      description: "For students applying to multiple top universities",
      features: [
        "Everything in Premium",
        "1-on-1 consultation sessions",
        "Essay review and editing",
        "Interview coaching",
        "Visa assistance",
        "Priority application review",
        "Dedicated success manager",
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      university: "MIT '28",
      rating: 5,
      text: "The Premium plan helped me organize my entire application process. The AI recommendations were spot-on!",
    },
    {
      name: "Michael Rodriguez",
      university: "Stanford '28",
      rating: 5,
      text: "The Pro plan's 1-on-1 sessions were invaluable. My consultant helped me craft the perfect personal statement.",
    },
    {
      name: "Emily Johnson",
      university: "Harvard '28",
      rating: 5,
      text: "The document tracking and deadline reminders saved me so much stress. Highly recommend!",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your university application journey. All
            plans include our core features with different levels of support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map(pkg => (
            <Card
              key={pkg.id}
              className={`relative ${
                pkg.popular
                  ? "border-primary shadow-lg scale-105"
                  : "hover:shadow-lg"
              } transition-all duration-300`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {pkg.price}
                  </span>
                  {pkg.period && (
                    <span className="text-muted-foreground">{pkg.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">{pkg.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    pkg.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-transparent"
                  }`}
                  variant={pkg.buttonVariant}
                >
                  {pkg.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Feature Comparison
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Features</th>
                      <th className="text-center p-4 font-semibold">Basic</th>
                      <th className="text-center p-4 font-semibold">Premium</th>
                      <th className="text-center p-4 font-semibold">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">University Database Access</td>
                      <td className="text-center p-4">100+</td>
                      <td className="text-center p-4">2,500+</td>
                      <td className="text-center p-4">2,500+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Application Tracking</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Document Storage</td>
                      <td className="text-center p-4">5 files</td>
                      <td className="text-center p-4">Unlimited</td>
                      <td className="text-center p-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">AI Recommendations</td>
                      <td className="text-center p-4">✗</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">1-on-1 Consultations</td>
                      <td className="text-center p-4">✗</td>
                      <td className="text-center p-4">✗</td>
                      <td className="text-center p-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Essay Review</td>
                      <td className="text-center p-4">✗</td>
                      <td className="text-center p-4">✗</td>
                      <td className="text-center p-4">✓</td>
                    </tr>
                    <tr>
                      <td className="p-4">Support Level</td>
                      <td className="text-center p-4">Email</td>
                      <td className="text-center p-4">Priority</td>
                      <td className="text-center p-4">Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.university}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  Can I change my plan later?
                </h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes will be reflected in your next billing cycle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 14-day free trial for our Premium and Pro
                  plans. No credit card required to start.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers.
                  All payments are processed securely.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/30 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already building their path to
            world-class education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
