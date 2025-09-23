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
        "Би ганцаараа биш гэдгээ ойлгосон. Энэ замаар олон хүн явдаг, бид бүгд амжилттай давж чаддаг .",
      avatar: "B",
      country: "USA",
    },
    {
      name: "Enkhjin",
      university: "MIT",
      program: "Engineering PhD",
      message:
        "Их сургуулийн шаардлагуудыг харьцуулахад их цаг ордог. Манай платформ чамд тэр харьцуулалтыг хялбархан харуулна.",
      avatar: "E",
      country: "USA",
    },
    {
      name: "Sukhbat",
      university: "Stanford University",
      program: "Business Administration",
      message:
        "Тэтгэлэг хайхдаа зөвхөн том сургуулиудыг биш, жижиг хотын их сургуулиудыг ч шалгаарай. Ихэнхдээ илүү дэмжлэг өгдөг шүү.",
      avatar: "S",
      country: "USA",
    },
    {
      name: "Nomin",
      university: "Oxford University",
      program: "Economics",
      message:
        "Мэдээллээ тарамдуулж хайх бус, энд нэг дор төвлөрүүлж харах нь илүү үр дүнтэй.",
      avatar: "N",
      country: "UK",
    },
    {
      name: "Tuguldur",
      university: "University of Toronto",
      program: "Business Administration",
      message:
        "Тэтгэлгийн ихэнх нь зөвхөн дүн бус, эссэ болон хичээлээс гадуурх үйл ажиллагааг хардаг. Бэлтгэхдээ энэ тал дээрээ анхаарах нь илүү үр дүнтэй.",
      avatar: "T",
      country: "Canada",
    },
    {
      name: "Oyunchimeg",
      university: "University of Melbourne",
      program: "Medicine",
      message:
        "Бичиг баримт илгээхдээ хамгийн сүүлийн хувилбараа шалга. Жижиг алдаа ч өргөдлийг хүчингүй болгох эрсдэлтэй.",
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
                        {card.message}
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
                        {card.message}
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
