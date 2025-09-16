import UniversityModel from "../models/University";

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

export default seedUniversities;
