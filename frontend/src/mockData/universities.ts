export interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  rating: number;
  tuition: string;
  acceptance: string;
  students: string;
  image: string;
  programs: string[];
  highlights: string[];
  description: string;
  website: string;
  country: string;
  city: string;
  established: string;
  type: string;
  language: string;
  deadline: string;
  requirements: {
    gpa: string;
    toefl: string;
    ielts: string;
    sat: string;
    gre: string;
    gmat: string;
    documents: string[];
  };
  scholarships: string[];
  acceptsMongolianStudents: boolean;
}

export const universities: University[] = [
  {
    id: "1",
    name: "Harvard University",
    location: "Cambridge, Massachusetts, USA",
    ranking: 1,
    rating: 4.9,
    tuition: "$54,269/year",
    acceptance: "3.4%",
    students: "23,731",
    image: "/harvard-campus.jpg",
    programs: [
      "Liberal Arts",
      "Engineering",
      "Business",
      "Medicine",
      "Law",
      "Education",
      "Public Health",
    ],
    highlights: [
      "Ivy League",
      "World's #1 University",
      "Nobel Prize Winners",
      "Research Excellence",
    ],
    description:
      "Harvard University is the oldest institution of higher education in the United States and among the most prestigious in the world.",
    website: "https://www.harvard.edu",
    country: "USA",
    city: "Cambridge",
    established: "1636",
    type: "Private",
    language: "English",
    deadline: "January 1",
    requirements: {
      gpa: "3.9+",
      toefl: "100+",
      ielts: "7.0+",
      sat: "1500+",
      gre: "Not required for undergrad",
      gmat: "Not required for undergrad",
      documents: [
        "High School Transcript",
        "SAT/ACT",
        "TOEFL/IELTS",
        "Letters of Recommendation",
        "Personal Statement",
      ],
    },
    scholarships: [
      "Harvard Financial Aid",
      "International Student Aid",
      "Merit Scholarships",
    ],
    acceptsMongolianStudents: true,
  },
  {
    id: "2",
    name: "MIT",
    location: "Cambridge, Massachusetts, USA",
    ranking: 2,
    rating: 4.8,
    tuition: "$57,986/year",
    acceptance: "4.1%",
    students: "11,934",
    image: "/mit-campus-aerial-view.jpg",
    programs: [
      "Engineering",
      "Computer Science",
      "Physics",
      "Mathematics",
      "Business",
      "Architecture",
    ],
    highlights: [
      "Technology Leader",
      "Innovation Hub",
      "Nobel Laureates",
      "Research Excellence",
    ],
    description:
      "MIT is a world leader in science and technology education, known for its cutting-edge research and innovation.",
    website: "https://web.mit.edu",
    country: "USA",
    city: "Cambridge",
    established: "1861",
    type: "Private",
    language: "English",
    deadline: "January 1",
    requirements: {
      gpa: "3.8+",
      toefl: "100+",
      ielts: "7.0+",
      sat: "1500+",
      gre: "Not required for undergrad",
      gmat: "Not required for undergrad",
      documents: [
        "High School Transcript",
        "SAT/ACT",
        "TOEFL/IELTS",
        "Letters of Recommendation",
        "Personal Statement",
      ],
    },
    scholarships: [
      "MIT Financial Aid",
      "International Student Aid",
      "Merit Scholarships",
    ],
    acceptsMongolianStudents: true,
  },
  {
    id: "3",
    name: "Stanford University",
    location: "Stanford, California, USA",
    ranking: 3,
    rating: 4.8,
    tuition: "$61,731/year",
    acceptance: "4.3%",
    students: "17,381",
    image: "/stanford-campus.jpg",
    programs: [
      "Engineering",
      "Business",
      "Medicine",
      "Law",
      "Education",
      "Humanities",
      "Sciences",
    ],
    highlights: [
      "Silicon Valley",
      "Entrepreneurship",
      "Research Excellence",
      "Innovation",
    ],
    description:
      "Stanford University is a leading research university known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world's top universities.",
    website: "https://www.stanford.edu",
    country: "USA",
    city: "Stanford",
    established: "1885",
    type: "Private",
    language: "English",
    deadline: "January 2",
    requirements: {
      gpa: "3.9+",
      toefl: "100+",
      ielts: "7.0+",
      sat: "1500+",
      gre: "Not required for undergrad",
      gmat: "Not required for undergrad",
      documents: [
        "High School Transcript",
        "SAT/ACT",
        "TOEFL/IELTS",
        "Letters of Recommendation",
        "Personal Statement",
      ],
    },
    scholarships: [
      "Stanford Financial Aid",
      "International Student Aid",
      "Merit Scholarships",
    ],
    acceptsMongolianStudents: true,
  },
  {
    id: "4",
    name: "Oxford University",
    location: "Oxford, England, UK",
    ranking: 4,
    rating: 4.7,
    tuition: "£26,770/year",
    acceptance: "17.5%",
    students: "24,515",
    image: "/oxford-university-campus.jpg",
    programs: [
      "Humanities",
      "Sciences",
      "Medicine",
      "Law",
      "Business",
      "Engineering",
      "Social Sciences",
    ],
    highlights: [
      "Ancient University",
      "Academic Excellence",
      "Nobel Laureates",
      "Research Excellence",
    ],
    description:
      "Oxford University is the oldest university in the English-speaking world and is regarded as one of the leading academic institutions in the world.",
    website: "https://www.ox.ac.uk",
    country: "UK",
    city: "Oxford",
    established: "1096",
    type: "Public",
    language: "English",
    deadline: "January 15",
    requirements: {
      gpa: "3.7+",
      toefl: "110+",
      ielts: "7.5+",
      sat: "1450+",
      gre: "Not required for undergrad",
      gmat: "Not required for undergrad",
      documents: [
        "High School Transcript",
        "A-levels/IB",
        "IELTS/TOEFL",
        "Letters of Recommendation",
        "Personal Statement",
      ],
    },
    scholarships: [
      "Oxford Financial Aid",
      "International Student Aid",
      "Merit Scholarships",
    ],
    acceptsMongolianStudents: true,
  },
  {
    id: "5",
    name: "Cambridge University",
    location: "Cambridge, England, UK",
    ranking: 5,
    rating: 4.7,
    tuition: "£25,272/year",
    acceptance: "21%",
    students: "23,247",
    image: "/cambridge-university-campus.jpg",
    programs: [
      "Humanities",
      "Sciences",
      "Medicine",
      "Law",
      "Engineering",
      "Mathematics",
      "Social Sciences",
    ],
    highlights: [
      "Ancient University",
      "Academic Excellence",
      "Nobel Laureates",
      "Research Excellence",
    ],
    description:
      "Cambridge University is one of the oldest universities in the world and one of the largest in the United Kingdom.",
    website: "https://www.cam.ac.uk",
    country: "UK",
    city: "Cambridge",
    established: "1209",
    type: "Public",
    language: "English",
    deadline: "January 15",
    requirements: {
      gpa: "3.7+",
      toefl: "110+",
      ielts: "7.5+",
      sat: "1450+",
      gre: "Not required for undergrad",
      gmat: "Not required for undergrad",
      documents: [
        "High School Transcript",
        "A-levels/IB",
        "IELTS/TOEFL",
        "Letters of Recommendation",
        "Personal Statement",
      ],
    },
    scholarships: [
      "Cambridge Financial Aid",
      "International Student Aid",
      "Merit Scholarships",
    ],
    acceptsMongolianStudents: true,
  },
  {
    id: "6",
    name: "University of Toronto",
    location: "Toronto, Ontario, Canada",
    ranking: 18,
    rating: 4.5,
    tuition: "CAD $58,160/year",
    acceptance: "43%",
    students: "97,000",
    image: "/university-of-toronto-campus.png",
    programs: [
      "Engineering",
      "Business",
      "Medicine",
      "Law",
      "Arts & Science",
      "Architecture",
      "Music",
    ],
    highlights: [
      "Research Excellence",
      "Diversity",
      "Innovation",
      "Global Recognition",
    ],
    description:
      "The University of Toronto is one of Canada's top universities and a leading research institution with a strong international reputation.",
    website: "https://www.utoronto.ca",
    country: "Canada",
    city: "Toronto",
    established: "1827",
    type: "Public",
    language: "English",
    deadline: "January 15",
    requirements: {
      gpa: "3.5+",
      toefl: "100+",
      ielts: "6.5+",
      sat: "1300+",
      gre: "Not required for undergrad",
      gmat: "Not required for undergrad",
      documents: [
        "High School Transcript",
        "SAT/ACT",
        "TOEFL/IELTS",
        "Letters of Recommendation",
        "Personal Statement",
      ],
    },
    scholarships: [
      "UofT Financial Aid",
      "International Student Aid",
      "Merit Scholarships",
    ],
    acceptsMongolianStudents: true,
  },
];
