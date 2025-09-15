"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const universityImages = [
  "/uni1.jpg",
  "/uni2.jpg", 
  "/uni3.jpg",
  "/harvard-campus.jpg",
  "/canadian-university-campus.png",
  "/australian-university-campus.png",
  "/german-university-campus.png",
  "/netherlands-university-campus.jpg"
];

export function RecommendedUniversities() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % universityImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            We Recommend University Scholarship Based on Your Materials
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover universities that offer scholarships and support for students like you.
          </p>
        </div>

        <div className="relative w-full h-96 overflow-hidden rounded-2xl">
          {universityImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`University ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
      </div>
    </section>
  );
}
