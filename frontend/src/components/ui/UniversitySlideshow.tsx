"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface UniversitySlideshowProps {
  images: string[];
  interval?: number;
}

export function UniversitySlideshow({
  images,
  interval = 8000,
}: UniversitySlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`University campus ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </div>
  );
}
