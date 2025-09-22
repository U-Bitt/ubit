import UniversityModel from "../models/University";

// Sample scholarship data for seeding
export const scholarshipData = [
  {
    id: "1",
    title: "MIT Presidential Scholarship",
    description: "Full tuition scholarship for outstanding international students at MIT",
    amount: "$57,986",
    university: "Massachusetts Institute of Technology",
    country: "United States",
    deadline: "2025-01-15",
    requirements: ["Academic excellence", "Leadership potential", "Financial need"],
    type: "Merit-based",
    coverage: "Full tuition",
    duration: "4 years",
    applicationProcess: "Online application with essays and recommendations",
    eligibility: "International students with exceptional academic records",
    benefits: ["Full tuition coverage", "Research opportunities", "Mentorship program"],
    image: "/mit-campus-aerial.png"
  },
  {
    id: "2",
    title: "Stanford Knight-Hennessy Scholars",
    description: "Graduate scholarship program for future global leaders",
    amount: "$75,000",
    university: "Stanford University",
    country: "United States",
    deadline: "2025-10-10",
    requirements: ["Graduate degree", "Leadership experience", "Global perspective"],
    type: "Leadership-based",
    coverage: "Full funding",
    duration: "2-3 years",
    applicationProcess: "Multi-stage application with interviews",
    eligibility: "Graduate students from any country",
    benefits: ["Full funding", "Leadership development", "Global network"],
    image: "/stanford-campus.jpg"
  },
  {
    id: "3",
    title: "Oxford Clarendon Scholarship",
    description: "Fully-funded graduate scholarship at Oxford University",
    amount: "£15,000",
    university: "University of Oxford",
    country: "United Kingdom",
    deadline: "2025-01-20",
    requirements: ["First-class degree", "Research potential", "Academic excellence"],
    type: "Merit-based",
    coverage: "Full funding",
    duration: "3-4 years",
    applicationProcess: "Departmental application with research proposal",
    eligibility: "Graduate students worldwide",
    benefits: ["Full funding", "Research support", "Academic community"],
    image: "/oxford-university-campus.jpg"
  },
  {
    id: "4",
    title: "Cambridge Gates Scholarship",
    description: "Full-cost scholarship for graduate study at Cambridge",
    amount: "£20,000",
    university: "University of Cambridge",
    country: "United Kingdom",
    deadline: "2025-10-15",
    requirements: ["Academic excellence", "Leadership potential", "Social commitment"],
    type: "Merit-based",
    coverage: "Full funding",
    duration: "1-3 years",
    applicationProcess: "University application plus Gates application",
    eligibility: "Graduate students from outside the UK",
    benefits: ["Full funding", "Leadership development", "Global community"],
    image: "/cambridge-university-campus.jpg"
  },
  {
    id: "5",
    title: "Harvard Presidential Scholarship",
    description: "Undergraduate scholarship for exceptional international students",
    amount: "$54,269",
    university: "Harvard University",
    country: "United States",
    deadline: "2025-01-01",
    requirements: ["Academic excellence", "Extracurricular achievements", "Character"],
    type: "Merit-based",
    coverage: "Full tuition",
    duration: "4 years",
    applicationProcess: "Standard Harvard application",
    eligibility: "International undergraduate applicants",
    benefits: ["Full tuition", "Research opportunities", "Alumni network"],
    image: "/harvard-campus.jpg"
  }
];

// Sample university data for seeding
const sampleUniversities = [
  {
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, MA, USA",
    ranking: 1,
    rating: 4.9,
    tuition: "$57,986/year",
    acceptance: "6.7%",
    students: "11,934",
    image: "/mit-campus-aerial.png",
    programs: ["Computer Science", "Engineering", "Physics", "Mathematics"],
    highlights: [
      "World-renowned research",
      "Innovation hub",
      "Strong industry connections",
    ],
    deadline: "Jan 1, 2025",
    description:
      "A world-class institution known for its cutting-edge research and innovation.",
    website: "https://web.mit.edu",
    founded: 1861,
    type: "private" as const,
    size: "medium" as const,
  },
  {
    name: "Stanford University",
    location: "Stanford, CA, USA",
    ranking: 2,
    rating: 4.8,
    tuition: "$61,731/year",
    acceptance: "4.3%",
    students: "17,381",
    image: "/stanford-campus.jpg",
    programs: ["Computer Science", "Business", "Medicine", "Engineering"],
    highlights: [
      "Silicon Valley location",
      "Entrepreneurship focus",
      "Beautiful campus",
    ],
    deadline: "Jan 2, 2025",
    description:
      "Located in the heart of Silicon Valley, Stanford fosters innovation and entrepreneurship.",
    website: "https://stanford.edu",
    founded: 1885,
    type: "private" as const,
    size: "large" as const,
  },
  {
    name: "Harvard University",
    location: "Cambridge, MA, USA",
    ranking: 3,
    rating: 4.9,
    tuition: "$54,269/year",
    acceptance: "3.4%",
    students: "23,731",
    image: "/harvard-campus.jpg",
    programs: ["Medicine", "Law", "Business", "Engineering"],
    highlights: [
      "World's most prestigious university",
      "Strong alumni network",
      "Excellent research facilities",
    ],
    deadline: "Jan 1, 2025",
    description:
      "Harvard University is America's oldest institution of higher learning, founded in 1636.",
    website: "https://harvard.edu",
    founded: 1636,
    type: "private" as const,
    size: "large" as const,
  },
  {
    name: "University College Dublin",
    location: "Dublin, Ireland",
    ranking: 181,
    rating: 4.1,
    tuition: "$15,000-25,000/year",
    acceptance: "12.3%",
    students: "33,000",
    image: "/ucd-campus.jpg",
    programs: ["Business", "Engineering", "Medicine", "Arts", "Computer Science"],
    highlights: ["Large international community", "Diverse programs", "Research excellence"],
    deadline: "Feb 1, 2025",
    description: "A comprehensive university with significant international student presence and diverse programs.",
    website: "https://www.ucd.ie",
    founded: 1854,
    type: "public",
    size: "large"
  },
  {
    name: "Université Paris-Saclay",
    location: "Paris, France",
    ranking: 64,
    rating: 4.5,
    tuition: "$200-500/year",
    acceptance: "15%",
    students: "48,000",
    image: "/paris-saclay-campus.jpg",
    programs: ["Science", "Technology", "Engineering", "Mathematics", "Physics"],
    highlights: ["Science and technology focus", "Research cluster", "Innovation hub"],
    deadline: "Mar 1, 2025",
    description: "A leading research university cluster specializing in science and technology.",
    website: "https://www.universite-paris-saclay.fr/en",
    founded: 2019,
    type: "public",
    size: "large"
  },
  {
    name: "Fudan University",
    location: "Shanghai, China",
    ranking: 34,
    rating: 4.5,
    tuition: "$8,000-12,000/year",
    acceptance: "0.5%",
    students: "35,000",
    image: "/fudan-university-campus.jpg",
    programs: ["Business Administration", "International Relations", "Medicine", "Journalism", "Economics"],
    highlights: ["Diverse international community", "Strong business programs", "Cultural exchange focus"],
    deadline: "Dec 31, 2024",
    description: "A comprehensive university offering diverse programs with significant international student presence.",
    website: "https://www.fudan.edu.cn/en",
    founded: 1905,
    type: "public",
    size: "large"
  },
  {
    name: "University College London",
    location: "London, UK",
    ranking: 8,
    rating: 4.7,
    tuition: "$25,000-45,000/year",
    acceptance: "18%",
    students: "42,000",
    image: "/ucl-campus.jpg",
    programs: ["Arts and Humanities", "Science", "Engineering", "Medicine", "Social Sciences"],
    highlights: ["Diverse programs", "International community", "Research excellence"],
    deadline: "Jan 15, 2025",
    description: "A comprehensive university offering diverse programs with significant international student presence.",
    website: "https://www.ucl.ac.uk",
    founded: 1826,
    type: "public",
    size: "large"
  },
  {
    name: "Imperial College London",
    location: "London, UK",
    ranking: 6,
    rating: 4.8,
    tuition: "$30,000-50,000/year",
    acceptance: "14%",
    students: "19,000",
    image: "/imperial-college-campus.jpg",
    programs: ["Engineering", "Science", "Medicine", "Business", "Computer Science"],
    highlights: ["Science and engineering focus", "Research excellence", "Innovation hub"],
    deadline: "Jan 15, 2025",
    description: "A world-leading science and engineering university with strong focus on research and innovation.",
    website: "https://www.imperial.ac.uk",
    founded: 1907,
    type: "public",
    size: "medium"
  }
];

// Sample scholarship data for seeding
const sampleScholarships = [
  {
    title: "MIT Alumni Engineering Excellence Scholarship",
    donor: {
      name: "Dr. Sarah Chen",
      title: "MIT '95, Senior VP at Google",
      avatar: "SC",
      company: "Google",
      linkedin: "https://linkedin.com/in/sarahchen",
      email: "sarah.chen@alumni.mit.edu",
      bio: "Dr. Sarah Chen is a distinguished MIT alumna with over 25 years of experience in technology leadership. She currently serves as Senior Vice President at Google, where she leads strategic initiatives in artificial intelligence and machine learning. Sarah is passionate about supporting the next generation of engineers and has personally funded this scholarship to help students pursue their dreams in engineering.",
      location: "San Francisco, CA",
      education: "MIT '95 - Computer Science, Stanford MBA '98"
    },
    amount: "$25,000",
    duration: "4 years",
    deadline: "March 15, 2024",
    description: "Awarded to outstanding students pursuing engineering degrees with demonstrated leadership potential and community involvement.",
    requirements: [
      "3.8+ GPA",
      "Engineering major",
      "Leadership experience",
      "Community service"
    ],
    field: "Engineering",
    level: "Undergraduate",
    country: "United States",
    university: "MIT",
    applications: 245,
    spots: 3
  },
  {
    title: "Harvard Business School Alumni Fellowship",
    donor: {
      name: "Michael Rodriguez",
      title: "Harvard MBA '98, CEO at TechCorp",
      avatar: "MR",
      company: "TechCorp",
      linkedin: "https://linkedin.com/in/michaelrodriguez",
      email: "m.rodriguez@alumni.harvard.edu",
      bio: "Michael Rodriguez is a successful entrepreneur and Harvard Business School alumnus who founded TechCorp, a leading technology consulting firm. With over 20 years of experience in business development and strategic planning, Michael is committed to supporting students from underrepresented backgrounds who show entrepreneurial potential.",
      location: "New York, NY",
      education: "Harvard MBA '98, Columbia University '96"
    },
    amount: "$50,000",
    duration: "2 years",
    deadline: "April 30, 2024",
    description: "Supporting exceptional students from underrepresented backgrounds pursuing MBA degrees with entrepreneurial aspirations.",
    requirements: [
      "GMAT 700+",
      "Entrepreneurial experience",
      "Underrepresented background",
      "Leadership potential"
    ],
    field: "Business",
    level: "Graduate",
    country: "United States",
    university: "Harvard",
    applications: 189,
    spots: 2
  },
  {
    title: "Oxford Alumni Medical Research Grant",
    donor: {
      name: "Dr. Emily Watson",
      title: "Oxford '92, Chief Medical Officer",
      avatar: "EW",
      company: "Global Health Institute",
      linkedin: "https://linkedin.com/in/emilywatson",
      email: "e.watson@alumni.oxford.edu",
      bio: "Dr. Emily Watson is a renowned medical researcher and Oxford alumna who has dedicated her career to combating infectious diseases. As Chief Medical Officer at the Global Health Institute, she has led numerous research initiatives that have saved countless lives worldwide.",
      location: "London, UK",
      education: "Oxford '92 - Medicine, Johns Hopkins '95"
    },
    amount: "$30,000",
    duration: "3 years",
    deadline: "May 20, 2024",
    description: "Funding for medical students conducting groundbreaking research in infectious diseases and public health.",
    requirements: [
      "Medical school enrollment",
      "Research proposal",
      "Academic excellence",
      "Public health focus"
    ],
    field: "Medicine",
    level: "Graduate",
    country: "United Kingdom",
    university: "Oxford",
    applications: 156,
    spots: 4
  },
  {
    title: "Stanford Computer Science Innovation Award",
    donor: {
      name: "Alex Kim",
      title: "Stanford '00, CTO at InnovateAI",
      avatar: "AK",
      company: "InnovateAI",
      linkedin: "https://linkedin.com/in/alexkim",
      email: "a.kim@alumni.stanford.edu",
      bio: "Alex Kim is a technology innovator and Stanford alumnus who co-founded InnovateAI, a leading artificial intelligence company. With expertise in machine learning and software engineering, Alex is passionate about supporting students who are developing cutting-edge AI solutions.",
      location: "Palo Alto, CA",
      education: "Stanford '00 - Computer Science"
    },
    amount: "$20,000",
    duration: "1 year",
    deadline: "June 10, 2024",
    description: "Supporting students developing innovative AI and machine learning solutions with real-world applications.",
    requirements: [
      "CS major",
      "AI/ML project",
      "Innovation potential",
      "Technical excellence"
    ],
    field: "Computer Science",
    level: "Undergraduate",
    country: "United States",
    university: "Stanford",
    applications: 312,
    spots: 5
  },
  {
    title: "Cambridge International Student Support Fund",
    donor: {
      name: "James Thompson",
      title: "Cambridge '89, Investment Banker",
      avatar: "JT",
      company: "Thompson & Associates",
      linkedin: "https://linkedin.com/in/jamesthompson",
      email: "j.thompson@alumni.cambridge.edu",
      bio: "James Thompson is a successful investment banker and Cambridge alumnus who believes in the power of international education. Having witnessed the challenges faced by international students, he established this fund to provide financial support to those in need.",
      location: "London, UK",
      education: "Cambridge '89 - Economics"
    },
    amount: "$15,000",
    duration: "2 years",
    deadline: "July 1, 2024",
    description: "Financial assistance for international students facing economic hardship while pursuing their studies at Cambridge.",
    requirements: [
      "International student",
      "Financial need",
      "Academic merit",
      "Community contribution"
    ],
    field: "Any",
    level: "Any",
    country: "United Kingdom",
    university: "Cambridge",
    applications: 278,
    spots: 8
  },
  {
    title: "Yale Arts & Humanities Excellence Scholarship",
    donor: {
      name: "Maria Santos",
      title: "Yale '94, Museum Director",
      avatar: "MS",
      company: "Metropolitan Museum",
      linkedin: "https://linkedin.com/in/mariasantos",
      email: "m.santos@alumni.yale.edu",
      bio: "Maria Santos is a cultural preservationist and Yale alumna who serves as Director of the Metropolitan Museum. With a deep appreciation for arts and humanities, Maria established this scholarship to support students who are passionate about cultural preservation and creative expression.",
      location: "New York, NY",
      education: "Yale '94 - Art History, Sorbonne '96"
    },
    amount: "$18,000",
    duration: "4 years",
    deadline: "August 15, 2024",
    description: "Supporting talented students in arts and humanities with a focus on cultural preservation and creative expression.",
    requirements: [
      "Arts/Humanities major",
      "Portfolio submission",
      "Cultural impact",
      "Academic excellence"
    ],
    field: "Arts & Humanities",
    level: "Undergraduate",
    country: "United States",
    university: "Yale",
    applications: 134,
    spots: 3
  }
];

// Sample country data for seeding
const sampleCountries = [
  {
    name: "United States",
    flag: "🇺🇸",
    popularCities: ["New York", "Los Angeles", "Chicago", "Boston", "San Francisco"],
    rating: 4.8,
    description: "Home to world-renowned universities like Harvard, MIT, and Stanford.",
    visaType: "F-1 Student Visa",
    workRights: "CPT/OPT available",
    avgTuition: "$50,000/year",
    livingCost: "$15,000/year",
    isEnglishSpeaking: true,
    isLowCost: false,
    hasWorkRights: true,
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    popularCities: ["London", "Cambridge", "Oxford", "Manchester", "Edinburgh"],
    rating: 4.7,
    description: "Rich academic tradition with universities like Oxford and Cambridge.",
    visaType: "Student Visa",
    workRights: "20 hours/week",
    avgTuition: "£25,000/year",
    livingCost: "£12,000/year",
    isEnglishSpeaking: true,
    isLowCost: false,
    hasWorkRights: true,
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    popularCities: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"],
    rating: 4.6,
    description: "Welcoming immigration policies and high-quality education system.",
    visaType: "Study Permit",
    workRights: "20 hours/week",
    avgTuition: "C$30,000/year",
    livingCost: "C$15,000/year",
    isEnglishSpeaking: true,
    isLowCost: false,
    hasWorkRights: true,
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    popularCities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
    rating: 4.5,
    description: "Free tuition at public universities and strong engineering programs.",
    visaType: "Student Visa",
    workRights: "20 hours/week",
    avgTuition: "€0/year",
    livingCost: "€8,000/year",
    isEnglishSpeaking: false,
    isLowCost: true,
    hasWorkRights: true,
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    popularCities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    rating: 4.4,
    description: "High-quality education and post-study work opportunities.",
    visaType: "Student Visa",
    workRights: "20 hours/week",
    avgTuition: "A$35,000/year",
    livingCost: "A$18,000/year",
    isEnglishSpeaking: true,
    isLowCost: false,
    hasWorkRights: true,
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    popularCities: ["Amsterdam", "Rotterdam", "Utrecht", "The Hague", "Eindhoven"],
    rating: 4.3,
    description: "English-taught programs and excellent research opportunities.",
    visaType: "Student Visa",
    workRights: "16 hours/week",
    avgTuition: "€15,000/year",
    livingCost: "€10,000/year",
    isEnglishSpeaking: true,
    isLowCost: true,
    hasWorkRights: true,
  },
];

export const seedUniversities = async (): Promise<void> => {
  try {
    // Check if universities already exist
    const existingCount = await UniversityModel.countDocuments();

    if (existingCount === 0) {
      console.log("🌱 Seeding universities...");
      await UniversityModel.insertMany(sampleUniversities);
      console.log(`✅ Seeded ${sampleUniversities.length} universities`);
    } else {
      console.log(
        `📊 ${existingCount} universities already exist, skipping seed`
      );
    }
  } catch (error) {
    console.error("❌ Error seeding universities:", error);
    throw error;
  }
};

// Scholarship and country seeding functions removed as models don't exist
// The scholarshipData is exported for use in controllers

// Main seeding function that seeds all data
export const seedAllData = async (): Promise<void> => {
  try {
    await seedUniversities();
    console.log("🎉 All data seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    throw error;
  }
};

export default seedAllData;
