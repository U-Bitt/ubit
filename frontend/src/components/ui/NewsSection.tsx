import React from "react";
import Image from "next/image";

export function NewsSection() {
  const newsCards = [
    {
      id: 1,
      content:
        "Harvard University announces new early action deadline for international students - applications due November 1st",
      size: "medium",
    },
    {
      id: 2,
      content:
        "MIT offers excellence across 30+ departments with a culture of learning by doing...",
      size: "medium",
    },
    {
      id: 3,
      content:
        "Stanford University launches new AI and Machine Learning program with full scholarship opportunities for international applicants",
      size: "tall",
    },
    {
      id: 4,
      content:
        "Grade 12 is a very important year in your high school career. Think of applying for university as applying for a job...",
      size: "medium",
    },
    {
      id: 5,
      content:
        "University of Toronto introduces new pathway program for international students with guaranteed admission and scholarship support",
      size: "large",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl font-bold text-foreground mb-16 text-center">
          News
        </h2>

        {/* News Cards Grid - Exact Sketch Layout */}
        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1 - Top Left */}
          <div className="col-span-1">
            <div className="relative rounded-lg border border-gray-300 h-64 overflow-hidden">
              {/* Background Image */}
              <Image
                src="/unib1.jpg"
                alt="University news background"
                fill
                className="object-cover"
              />
              {/* Dark overlay like recommended universities */}
              <div className="absolute inset-0 bg-black opacity-20"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div>
                  <p className="text-white text-xs font-light mb-2 opacity-80">
                    Today
                  </p>
                  <p className="text-white leading-relaxed font-semibold text-lg drop-shadow-lg">
                    {newsCards[0].content}
                  </p>
                </div>
                <a
                  href="https://www.harvard.edu/admissions/apply/early-action"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-white text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors self-start inline-block"
                >
                  Read
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 - Top Middle */}
          <div className="col-span-1">
            <div className="relative rounded-lg border border-gray-300 h-64 overflow-hidden">
              {/* Background Image */}
              <Image
                src="/unib3.jpg"
                alt="University news background"
                fill
                className="object-cover"
              />
              {/* Dark overlay like recommended universities */}
              <div className="absolute inset-0 bg-black opacity-20"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div>
                  <p className="text-white text-xs font-light mb-2 opacity-80">
                    2 days ago
                  </p>
                  <p className="text-white leading-relaxed font-semibold text-lg drop-shadow-lg">
                    {newsCards[1].content}
                  </p>
                </div>
                <a
                  href="http://web.mit.edu/education/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-white text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors self-start inline-block"
                >
                  Read
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 - Top Right (Tall - spans both rows) */}
          <div className="col-span-1 row-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-4">
                <h3 className="text-lg font-semibold">Latest Updates</h3>
                <p className="text-sm opacity-90">
                  News and opportunities for all students
                </p>
              </div>

              {/* News List */}
              <div className="flex-1 p-6">
                <div className="space-y-4">
                  {/* News 1 */}
                  <div className="flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        New Scholarship Fund Launched
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        $2M donation for international students
                      </p>
                    </div>
                  </div>

                  {/* News 2 */}
                  <div className="flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Partnership with Top Universities
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Direct admission pathways now available
                      </p>
                    </div>
                  </div>

                  {/* News 3 */}
                  <div className="flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <div className="w-2.5 h-2.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Visa Support Program
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Free consultation for all applicants
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Bottom Left */}
          <div className="col-span-1">
            <div className="relative rounded-lg border border-gray-300 h-64 overflow-hidden">
              {/* Background Image */}
              <Image
                src="/docu1.jpg"
                alt="University news background"
                fill
                className="object-cover"
              />
              {/* Dark overlay like recommended universities */}
              <div className="absolute inset-0 bg-black opacity-20"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <p className="text-white text-xs font-light opacity-80">
                      3 days ago
                    </p>
                    <span className="text-white text-xs font-medium opacity-90 italic">
                      • medium.com
                    </span>
                  </div>
                  <p className="text-white leading-relaxed font-semibold text-lg drop-shadow-lg">
                    {newsCards[3].content}
                  </p>
                </div>
                <a
                  href="https://medium.com/@thehonourablejeffrey/preparing-for-university-in-grade-12-53040f456c5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-white text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors self-start inline-block"
                >
                  Read
                </a>
              </div>
            </div>
          </div>

          {/* Card 5 - Bottom Middle */}
          <div className="col-span-1">
            <div className="relative rounded-lg border border-gray-300 h-64 overflow-hidden">
              {/* Background Image */}
              <Image
                src="/unib2.jpg"
                alt="University news background"
                fill
                className="object-cover"
              />
              {/* Dark overlay like recommended universities */}
              <div className="absolute inset-0 bg-black opacity-20"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div>
                  <p className="text-white text-xs font-light mb-2 opacity-80">
                    Yesterday
                  </p>
                  <p className="text-white leading-relaxed font-semibold text-lg drop-shadow-lg">
                    {newsCards[4].content}
                  </p>
                </div>
                <a
                  href="https://alumni.utoronto.ca/career-support?_gl=1*1wmk238*_ga*NTIxNzc0NjcwLjE3NTg0Mzc3OTg.*_ga_YW6S0CZ9Q1*czE3NTg0Mzc3OTgkbzEkZzAkdDE3NTg0Mzc3OTgkajYwJGwwJGgxOTY2NDE4OTk1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-white text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white hover:text-black transition-colors self-start inline-block"
                >
                  Read
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
