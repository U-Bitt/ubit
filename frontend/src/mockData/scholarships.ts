export interface Scholarship {
  id: string;
  name: string;
  university: string;
  amount: string;
  type: string;
  deadline: string;
  requirements: string[];
  description: string;
  category: string;
  country: string;
}

export const scholarships: Scholarship[] = [
  {
    id: "1",
    name: "International Excellence Scholarship",
    university: "Harvard University",
    amount: "$50,000/year",
    type: "Merit-based",
    deadline: "January 15, 2025",
    requirements: ["GPA 3.8+", "TOEFL 100+", "SAT 1500+"],
    description:
      "Full tuition scholarship for outstanding international students",
    category: "Undergraduate",
    country: "USA",
  },
  {
    id: "2",
    name: "Global Leaders Program",
    university: "MIT",
    amount: "$45,000/year",
    type: "Need-based",
    deadline: "February 1, 2025",
    requirements: [
      "Financial need",
      "Academic excellence",
      "Leadership potential",
    ],
    description: "Comprehensive support for future global leaders",
    category: "Undergraduate",
    country: "USA",
  },
  {
    id: "3",
    name: "Oxford International Scholarship",
    university: "Oxford University",
    amount: "£25,000/year",
    type: "Merit-based",
    deadline: "January 10, 2025",
    requirements: ["Academic excellence", "IELTS 7.0+", "Personal statement"],
    description: "Scholarship for exceptional international students",
    category: "Undergraduate",
    country: "UK",
  },
];
