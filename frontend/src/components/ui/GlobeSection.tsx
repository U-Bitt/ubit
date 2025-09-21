import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function GlobeSection() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Card data with real testimonials
  const cards = [
    {
      name: "Batbold",
      university: "Harvard University",
      program: "Computer Science",
      message:
        "The application process was so smooth thanks to this platform. I'm now studying Computer Science at Harvard!",
      avatar: "B",
      country: "USA",
    },
    {
      name: "Enkhjin",
      university: "MIT",
      program: "Engineering PhD",
      message:
        "This platform helped me discover MIT's amazing programs. I'm pursuing my PhD in Engineering now.",
      avatar: "E",
      country: "USA",
    },
    {
      name: "Sukhbat",
      university: "Stanford University",
      program: "Business Administration",
      message:
        "The exam preparation resources were incredible. I aced my SAT and got accepted to Stanford!",
      avatar: "S",
      country: "USA",
    },
    {
      name: "Nomin",
      university: "Oxford University",
      program: "Economics",
      message:
        "The scholarship information was a game-changer. I'm studying Economics at Oxford with full funding.",
      avatar: "N",
      country: "UK",
    },
    {
      name: "Tuguldur",
      university: "University of Toronto",
      program: "Business Administration",
      message:
        "The step-by-step guidance made everything clear. I'm now in Canada studying Business Administration.",
      avatar: "T",
      country: "Canada",
    },
    {
      name: "Oyunchimeg",
      university: "University of Melbourne",
      program: "Medicine",
      message:
        "The platform connected me with the perfect university. I'm loving my studies in Australia!",
      avatar: "O",
      country: "Australia",
    },
  ];

  // Continuous sliding effect from bottom to top
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= cards.length ? 0 : nextIndex;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title at the Top */}
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
          Stories
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center justify-center">
          {/* Left Side - Sliding Cards */}
          <div className="flex flex-col items-center justify-center h-[600px]">
            {/* Sliding Cards Container */}
            <div className="relative w-full max-w-md h-[600px] overflow-hidden">
              {/* Create infinite loop by duplicating cards */}
              <div
                className="absolute inset-0 flex flex-col transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateY(-${currentCardIndex * 125}px)`,
                }}
              >
                {/* First set of cards */}
                {cards.map((card, index) => (
                  <div
                    key={`first-${index}`}
                    className="h-[120px] flex items-center justify-center mb-5 flex-shrink-0"
                  >
                    <div className="bg-white rounded-lg border border-gray-300 w-full h-full flex flex-col justify-center p-4">
                      {/* University Name and Major */}
                      <p className="text-sm text-gray-700 mb-2">
                        {card.university} ({card.program})
                      </p>

                      {/* Testimonial Message */}
                      <p className="text-base font-bold text-gray-900 leading-relaxed">
                        successful students who are abroads messages or their
                        experiecne messages
                      </p>
                    </div>
                  </div>
                ))}

                {/* Second set of cards for seamless loop */}
                {cards.map((card, index) => (
                  <div
                    key={`second-${index}`}
                    className="h-[120px] flex items-center justify-center mb-5 flex-shrink-0"
                  >
                    <div className="bg-white rounded-lg border border-gray-300 w-full h-full flex flex-col justify-center p-4">
                      {/* University Name and Major */}
                      <p className="text-sm text-gray-700 mb-2">
                        {card.university} ({card.program})
                      </p>

                      {/* Testimonial Message */}
                      <p className="text-base font-bold text-gray-900 leading-relaxed">
                        successful students who are abroads messages or their
                        experiecne messages
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Lottie 3D Animation */}
          <div className="flex justify-center items-center">
            <div className="w-full h-[600px] max-w-lg rounded-lg shadow-xl overflow-hidden">
              <DotLottieReact
                src="https://lottie.host/b8d19a8d-77b9-483d-b624-73da7a109331/rk4CJBUFSA.lottie"
                loop
                autoplay
                className="w-full h-full"
                style={{
                  filter: "hue-rotate(180deg) saturate(1.2)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
