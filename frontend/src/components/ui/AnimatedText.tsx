"use client";

import { useState, useEffect } from "react";

export function AnimatedText() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ["U-BIT", "UNIVERSITY"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentIndex < currentWord.length) {
            setDisplayText(currentWord.substring(0, currentIndex + 1));
            setCurrentIndex(prev => prev + 1);
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Deleting
          if (currentIndex > 0) {
            setDisplayText(currentWord.substring(0, currentIndex - 1));
            setCurrentIndex(prev => prev - 1);
          } else {
            // Finished deleting, move to next word
            setIsDeleting(false);
            setCurrentWordIndex(prev => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentWordIndex, words]);

  return (
    <span className="text-white">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
