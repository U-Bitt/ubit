interface UserProfile {
  personalInfo: Record<string, unknown>;
  academicInfo: Record<string, unknown>;
  testScores?: Record<string, unknown>[];
  interests: string[];
}

interface CVSection {
  title: string;
  content: string;
  improved: string;
  suggestions: string[];
  score: number;
  maxScore: number;
}

interface CVAnalysis {
  overallScore: number;
  sections: CVSection[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export const generateCVAnalysis = (userProfile: UserProfile): CVAnalysis => {
  const sections: CVSection[] = [
    {
      title: "Personal Statement",
      content: `I am ${userProfile.personalInfo.firstName as string} ${userProfile.personalInfo.lastName as string}, a ${userProfile.academicInfo.major as string} student with a GPA of ${userProfile.academicInfo.gpa as string}. I am interested in ${userProfile.interests.join(", ")}.`,
      improved: `Dedicated ${userProfile.academicInfo.major as string} student with a strong academic record (GPA: ${userProfile.academicInfo.gpa as string}) and passion for ${userProfile.interests.join(", ")}. Seeking to leverage technical skills and innovative thinking to contribute to cutting-edge projects in technology and research.`,
      suggestions: [
        "Use more action verbs (leverage, contribute, seeking)",
        "Quantify achievements where possible",
        "Show passion and specific goals",
        "Keep it concise but impactful",
      ],
      score: calculatePersonalStatementScore(userProfile),
      maxScore: 10,
    },
    {
      title: "Education",
      content: `${userProfile.academicInfo.major as string} - ${userProfile.academicInfo.university as string}\nGPA: ${userProfile.academicInfo.gpa as string}`,
      improved: `Bachelor of Science in ${userProfile.academicInfo.major as string}\n${userProfile.academicInfo.university as string} | ${(userProfile.academicInfo.graduationYear as string) || "2024"}\nGPA: ${userProfile.academicInfo.gpa as string}/4.0 | Magna Cum Laude\nRelevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems`,
      suggestions: [
        "Include graduation year",
        "Add academic honors if applicable",
        "List relevant coursework",
        "Use proper degree formatting",
      ],
      score: calculateEducationScore(userProfile),
      maxScore: 10,
    },
    {
      title: "Experience",
      content: "No work experience listed",
      improved: `Software Development Intern | Tech Company | Summer 2023
• Developed web applications using React and Node.js
• Collaborated with team of 5 developers on client projects
• Improved application performance by 25% through code optimization

Research Assistant | University Lab | 2022-2023
• Conducted research on machine learning algorithms
• Published findings in peer-reviewed journal
• Mentored 2 undergraduate students`,
      suggestions: [
        "Include internships and part-time work",
        "Add research experience",
        "Quantify achievements with numbers",
        "Use bullet points for clarity",
      ],
      score: calculateExperienceScore(userProfile),
      maxScore: 10,
    },
    {
      title: "Skills",
      content: `${userProfile.interests.join(", ")}`,
      improved: `Technical Skills:
• Programming Languages: Python, JavaScript, Java, C++
• Frameworks: React, Node.js, Django, Spring Boot
• Tools: Git, Docker, AWS, MongoDB, PostgreSQL
• Languages: English (Fluent), Mongolian (Native)

Soft Skills:
• Leadership, Teamwork, Problem-solving, Communication`,
      suggestions: [
        "Categorize skills (Technical, Soft, Languages)",
        "Be specific about proficiency levels",
        "Include relevant tools and technologies",
        "Add language skills",
      ],
      score: calculateSkillsScore(userProfile),
      maxScore: 10,
    },
    {
      title: "Projects",
      content: "No projects listed",
      improved: `E-commerce Website | Personal Project | 2023
• Built full-stack web application using React and Node.js
• Implemented user authentication and payment processing
• Deployed on AWS with 99.9% uptime

Machine Learning Model | Academic Project | 2022
• Developed predictive model for student performance
• Achieved 85% accuracy using Python and scikit-learn
• Presented findings at university research symposium`,
      suggestions: [
        "Include personal and academic projects",
        "Describe technologies used",
        "Quantify results and impact",
        "Show progression and learning",
      ],
      score: calculateProjectsScore(userProfile),
      maxScore: 10,
    },
  ];

  const overallScore = Math.round(
    sections.reduce((sum, section) => sum + section.score, 0) / sections.length
  );

  const strengths = generateStrengths(userProfile, sections);
  const weaknesses = generateWeaknesses(sections);
  const recommendations = generateRecommendations(sections, overallScore);

  return {
    overallScore,
    sections,
    strengths,
    weaknesses,
    recommendations,
  };
};

const calculatePersonalStatementScore = (userProfile: UserProfile): number => {
  let score = 3; // Base score

  // Check for action verbs
  const content = userProfile.interests.join(" ").toLowerCase();
  const actionVerbs = [
    "develop",
    "create",
    "build",
    "design",
    "implement",
    "lead",
    "manage",
  ];
  const hasActionVerbs = actionVerbs.some(verb => content.includes(verb));
  if (hasActionVerbs) score += 2;

  // Check for quantified achievements
  const hasNumbers = /\d+/.test(userProfile.academicInfo.gpa as string);
  if (hasNumbers) score += 2;

  // Check for specific goals
  if (userProfile.interests.length > 2) score += 2;

  // Check for passion indicators
  const passionWords = ["passion", "love", "enjoy", "excited", "motivated"];
  const hasPassion = passionWords.some(word => content.includes(word));
  if (hasPassion) score += 1;

  return Math.min(score, 10);
};

const calculateEducationScore = (userProfile: UserProfile): number => {
  let score = 4; // Base score for having education info

  // Check for GPA
  const gpa = parseFloat(userProfile.academicInfo.gpa as string);
  if (gpa >= 3.5) score += 3;
  else if (gpa >= 3.0) score += 2;
  else if (gpa >= 2.5) score += 1;

  // Check for university name
  if (userProfile.academicInfo.university) score += 2;

  // Check for graduation year
  if (userProfile.academicInfo.graduationYear) score += 1;

  return Math.min(score, 10);
};

const calculateExperienceScore = (userProfile: UserProfile): number => {
  // This would typically check for work experience in user profile
  // For now, return a low score as most students don't have extensive experience
  return 3;
};

const calculateSkillsScore = (userProfile: UserProfile): number => {
  let score = 2; // Base score

  // Check for technical skills
  const technicalSkills = [
    "programming",
    "coding",
    "development",
    "software",
    "technology",
  ];
  const hasTechnicalSkills = technicalSkills.some(skill =>
    userProfile.interests.some(interest =>
      interest.toLowerCase().includes(skill)
    )
  );
  if (hasTechnicalSkills) score += 3;

  // Check for number of interests (more interests = more diverse skills)
  if (userProfile.interests.length >= 3) score += 2;
  if (userProfile.interests.length >= 5) score += 2;

  // Check for language skills
  const languageSkills = [
    "english",
    "mongolian",
    "chinese",
    "japanese",
    "korean",
  ];
  const hasLanguageSkills = languageSkills.some(lang =>
    userProfile.interests.some(interest =>
      interest.toLowerCase().includes(lang)
    )
  );
  if (hasLanguageSkills) score += 1;

  return Math.min(score, 10);
};

const calculateProjectsScore = (userProfile: UserProfile): number => {
  // This would typically check for projects in user profile
  // For now, return a low score as most students don't have extensive project portfolios
  return 2;
};

const generateStrengths = (
  userProfile: UserProfile,
  sections: CVSection[]
): string[] => {
  const strengths: string[] = [];

  // Academic strengths
  const gpa = parseFloat(userProfile.academicInfo.gpa as string);
  if (gpa >= 3.5) {
    strengths.push("Strong academic background with high GPA");
  }

  // Interest diversity
  if (userProfile.interests.length >= 3) {
    strengths.push("Diverse interests and well-rounded profile");
  }

  // Technical interests
  const technicalInterests = userProfile.interests.filter(interest =>
    ["programming", "technology", "software", "development", "coding"].some(
      tech => interest.toLowerCase().includes(tech)
    )
  );
  if (technicalInterests.length > 0) {
    strengths.push("Clear interest in technology and programming");
  }

  // Good sections
  const goodSections = sections.filter(section => section.score >= 7);
  if (goodSections.length > 0) {
    strengths.push(
      `Strong ${goodSections.map(s => s.title).join(", ")} sections`
    );
  }

  return strengths;
};

const generateWeaknesses = (sections: CVSection[]): string[] => {
  const weaknesses: string[] = [];

  const lowScoreSections = sections.filter(section => section.score < 6);
  lowScoreSections.forEach(section => {
    switch (section.title) {
      case "Experience":
        weaknesses.push("Limited work experience");
        break;
      case "Projects":
        weaknesses.push("No project portfolio");
        break;
      case "Skills":
        weaknesses.push("Generic skill descriptions");
        break;
      case "Personal Statement":
        weaknesses.push("Weak personal statement");
        break;
    }
  });

  // General weaknesses
  if (sections.some(s => s.title === "Experience" && s.score < 5)) {
    weaknesses.push("Missing quantifiable achievements");
  }

  return weaknesses;
};

const generateRecommendations = (
  sections: CVSection[],
  overallScore: number
): string[] => {
  const recommendations: string[] = [];

  // Overall recommendations based on score
  if (overallScore < 5) {
    recommendations.push(
      "Focus on building a strong foundation for all CV sections"
    );
  } else if (overallScore < 7) {
    recommendations.push("Improve weak sections while maintaining strong ones");
  } else {
    recommendations.push("Fine-tune details to make your CV stand out");
  }

  // Section-specific recommendations
  sections.forEach(section => {
    if (section.score < 5) {
      switch (section.title) {
        case "Experience":
          recommendations.push(
            "Add 2-3 personal projects with detailed descriptions"
          );
          recommendations.push("Include any internships or volunteer work");
          break;
        case "Projects":
          recommendations.push(
            "Create a portfolio of personal and academic projects"
          );
          break;
        case "Skills":
          recommendations.push("Categorize and specify your technical skills");
          break;
        case "Personal Statement":
          recommendations.push(
            "Rewrite personal statement with action verbs and specific goals"
          );
          break;
      }
    }
  });

  // General recommendations
  recommendations.push(
    "Quantify achievements with specific numbers and metrics"
  );
  recommendations.push("Tailor skills to target job requirements");
  recommendations.push("Add a professional summary section");

  return recommendations;
};
