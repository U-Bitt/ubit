import React, { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  university: string;
  message: string;
}

interface CombinedSectionProps {
  testimonials?: Testimonial[];
}

export function CombinedSection({ testimonials }: CombinedSectionProps) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Default testimonials if none provided
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Batbold",
      university: "Harvard University",
      message:
        "The application process was so smooth thanks to this platform. I'm now studying Computer Science at Harvard!",
    },
    {
      id: 2,
      name: "Enkhjin",
      university: "MIT",
      message:
        "This platform helped me discover MIT's amazing programs. I'm pursuing my PhD in Engineering now.",
    },
    {
      id: 3,
      name: "Sukhbat",
      university: "Stanford University",
      message:
        "The exam preparation resources were incredible. I aced my SAT and got accepted to Stanford!",
    },
    {
      id: 4,
      name: "Nomin",
      university: "Oxford University",
      message:
        "The scholarship information was a game-changer. I'm studying Economics at Oxford with full funding.",
    },
    {
      id: 5,
      name: "Tuguldur",
      university: "University of Toronto",
      message:
        "The step-by-step guidance made everything clear. I'm now in Canada studying Business Administration.",
    },
    {
      id: 6,
      name: "Oyunchimeg",
      university: "University of Melbourne",
      message:
        "The platform connected me with the perfect university. I'm loving my studies in Australia!",
    },
    {
      id: 7,
      name: "Munkhbayar",
      university: "Technical University of Munich",
      message:
        "The German university guidance was excellent. I'm now studying Engineering in Germany.",
    },
    {
      id: 8,
      name: "Ariunaa",
      university: "University of Amsterdam",
      message:
        "The Netherlands education system was confusing, but this platform made it simple. Thank you!",
    },
  ];

  const finalTestimonials = testimonials || defaultTestimonials;

  // Continuous sliding effect for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        // Reset to 0 when we reach the end of the first set for seamless loop
        return nextIndex >= finalTestimonials.length ? 0 : nextIndex;
      });
    }, 3000); // Change every 3 seconds for smoother sliding

    return () => clearInterval(interval);
  }, [finalTestimonials.length]);

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Side - Success Stories */}
          <div className="flex flex-col h-full">
            <h2 className="text-4xl font-bold text-foreground mb-8">
              Success Stories
            </h2>

            {/* Continuous Sliding Testimonials Container */}
            <div className="relative h-[320px] overflow-hidden">
              {/* Create infinite loop by duplicating testimonials */}
              <div
                className="absolute inset-0 flex flex-col transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateY(-${currentTestimonialIndex * 340}px)`,
                }}
              >
                {/* First set of testimonials */}
                {finalTestimonials.map(testimonial => (
                  <div
                    key={`first-${testimonial.id}`}
                    className="h-[320px] flex items-start justify-start mb-5 pt-0"
                  >
                    <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 h-full flex flex-col justify-start w-full max-w-lg">
                      {/* Quote Icon */}
                      <div className="mb-3">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                        </svg>
                      </div>

                      {/* Testimonial Content */}
                      <blockquote className="text-sm text-gray-700 mb-3 leading-relaxed flex-1">
                        "{testimonial.message}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            {testimonial.university}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Second set of testimonials for seamless loop */}
                {finalTestimonials.map(testimonial => (
                  <div
                    key={`second-${testimonial.id}`}
                    className="h-[320px] flex items-start justify-start mb-5 pt-0"
                  >
                    <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 h-full flex flex-col justify-start w-full max-w-lg">
                      {/* Quote Icon */}
                      <div className="mb-3">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                        </svg>
                      </div>

                      {/* Testimonial Content */}
                      <blockquote className="text-sm text-gray-700 mb-3 leading-relaxed flex-1">
                        "{testimonial.message}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            {testimonial.university}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {finalTestimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentTestimonialIndex
                        ? "bg-primary"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentTestimonialIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - 3D Globe */}
          <div className="relative flex justify-center items-center h-[600px]">
            <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-foreground mb-8 z-50">
              Next Stop
            </h2>

            {/* 3D Globe Embed */}
            <div className="sketchfab-embed-wrapper w-full h-full max-w-2xl">
              <iframe
                title="Globe HUD"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src="https://sketchfab.com/models/408086dd0feb4979942409abf7819ba6/embed"
                className="w-full h-full rounded-lg shadow-xl"
                style={{ border: "none" }}
              />
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  margin: "5px",
                  color: "#4A4A4A",
                }}
              >
                <a
                  href="https://sketchfab.com/3d-models/globe-hud-408086dd0feb4979942409abf7819ba6?utm_medium=embed&utm_campaign=share-popup&utm_content=408086dd0feb4979942409abf7819ba6"
                  target="_blank"
                  rel="nofollow"
                  style={{ fontWeight: "bold", color: "#1CAAD9" }}
                >
                  Globe HUD
                </a>{" "}
                by{" "}
                <a
                  href="https://sketchfab.com/kavarnalyvadim?utm_medium=embed&utm_campaign=share-popup&utm_content=408086dd0feb4979942409abf7819ba6"
                  target="_blank"
                  rel="nofollow"
                  style={{ fontWeight: "bold", color: "#1CAAD9" }}
                >
                  kavarnalyvadim
                </a>{" "}
                on{" "}
                <a
                  href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=408086dd0feb4979942409abf7819ba6"
                  target="_blank"
                  rel="nofollow"
                  style={{ fontWeight: "bold", color: "#1CAAD9" }}
                >
                  Sketchfab
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
