"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsersForce = exports.seedUsers = exports.userSeedData = void 0;
const User_1 = __importDefault(require("../models/User"));
exports.userSeedData = [
    {
        email: "john.doe@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        phone: "+97612345678",
        dateOfBirth: new Date("1995-01-15"),
        nationality: "Mongolian",
        avatar: "/placeholder-user.jpg",
        personalInfo: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+97612345678",
            dateOfBirth: new Date("1995-01-15"),
            nationality: "Mongolian",
        },
        academicInfo: {
            gpa: 3.8,
            highSchoolName: "Ulaanbaatar International School",
            graduationYear: 2024,
            intendedMajors: ["Computer Science", "Software Engineering"],
        },
        areasOfInterest: ["Programming", "Machine Learning", "Web Development", "Mobile Apps"],
        testScores: [
            {
                id: "test_1",
                testName: "TOEFL",
                score: "108",
                date: new Date("2023-11-15"),
                maxScore: "120",
                percentile: 85,
            },
            {
                id: "test_2",
                testName: "SAT",
                score: "1450",
                date: new Date("2023-10-01"),
                maxScore: "1600",
                percentile: 92,
            },
            {
                id: "test_3",
                testName: "AP Computer Science A",
                score: "5",
                date: new Date("2023-05-15"),
                maxScore: "5",
                percentile: 95,
            },
        ],
        documents: [
            {
                id: "doc_1",
                name: "High School Transcript",
                type: "transcript",
                url: "/documents/transcript.pdf",
                uploadedAt: new Date("2024-09-01"),
                status: "verified",
            },
            {
                id: "doc_2",
                name: "Recommendation Letter - Math Teacher",
                type: "recommendation",
                url: "/documents/recommendation_math.pdf",
                uploadedAt: new Date("2024-09-15"),
                status: "verified",
            },
            {
                id: "doc_3",
                name: "Personal Statement",
                type: "essay",
                url: "/documents/personal_statement.pdf",
                uploadedAt: new Date("2024-09-20"),
                status: "draft",
            },
        ],
        savedUniversities: [
            {
                id: "saved_1",
                universityId: "mit",
                universityName: "Massachusetts Institute of Technology",
                savedAt: new Date("2024-08-15"),
                notes: "Top choice - excellent CS program",
            },
            {
                id: "saved_2",
                universityId: "stanford",
                universityName: "Stanford University",
                savedAt: new Date("2024-08-20"),
                notes: "Great location and research opportunities",
            },
            {
                id: "saved_3",
                universityId: "berkeley",
                universityName: "University of California, Berkeley",
                savedAt: new Date("2024-09-01"),
                notes: "Strong engineering program, good financial aid",
            },
        ],
        preferences: {
            countries: ["usa", "uk", "canada"],
            programs: ["Computer Science", "Engineering"],
            budget: {
                min: 20000,
                max: 50000,
                currency: "USD",
            },
            examScores: {
                toefl: 108,
                sat: 1450,
                ap_cs: 5,
            },
        },
        applications: [
            {
                id: "app_1",
                universityId: "mit",
                program: "Computer Science",
                status: "submitted",
                documents: ["transcript", "recommendation_1", "recommendation_2"],
                submittedAt: new Date("2024-10-01"),
                deadline: new Date("2025-01-01"),
            },
            {
                id: "app_2",
                universityId: "stanford",
                program: "Engineering",
                status: "under_review",
                documents: [
                    "transcript",
                    "recommendation_1",
                    "recommendation_2",
                    "portfolio",
                ],
                submittedAt: new Date("2024-10-15"),
                deadline: new Date("2025-01-02"),
            },
        ],
        isActive: true,
        isEmailVerified: true,
        lastLogin: new Date("2024-12-01"),
    },
    {
        email: "jane.smith@example.com",
        password: "password123",
        firstName: "Jane",
        lastName: "Smith",
        phone: "+15550123",
        dateOfBirth: new Date("1998-03-22"),
        nationality: "American",
        avatar: "/placeholder-user.jpg",
        personalInfo: {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            phone: "+15550123",
            dateOfBirth: new Date("1998-03-22"),
            nationality: "American",
        },
        academicInfo: {
            gpa: 3.9,
            highSchoolName: "Lincoln High School",
            graduationYear: 2024,
            intendedMajors: ["Business Administration", "Economics"],
        },
        areasOfInterest: ["Business Strategy", "Finance", "Marketing", "Leadership"],
        testScores: [
            {
                id: "test_4",
                testName: "IELTS",
                score: "8.0",
                date: new Date("2023-12-01"),
                maxScore: "9.0",
                percentile: 90,
            },
            {
                id: "test_5",
                testName: "GMAT",
                score: "650",
                date: new Date("2023-10-15"),
                maxScore: "800",
                percentile: 75,
            },
        ],
        documents: [
            {
                id: "doc_4",
                name: "High School Transcript",
                type: "transcript",
                url: "/documents/jane_transcript.pdf",
                uploadedAt: new Date("2024-08-15"),
                status: "verified",
            },
            {
                id: "doc_5",
                name: "Business Essay",
                type: "essay",
                url: "/documents/business_essay.pdf",
                uploadedAt: new Date("2024-09-01"),
                status: "verified",
            },
        ],
        savedUniversities: [
            {
                id: "saved_4",
                universityId: "cambridge",
                universityName: "University of Cambridge",
                savedAt: new Date("2024-07-20"),
                notes: "Excellent business program",
            },
            {
                id: "saved_5",
                universityId: "london",
                universityName: "London School of Economics",
                savedAt: new Date("2024-08-01"),
                notes: "Great for economics",
            },
        ],
        preferences: {
            countries: ["uk", "australia", "germany"],
            programs: ["Business", "Economics"],
            budget: {
                min: 15000,
                max: 40000,
                currency: "USD",
            },
            examScores: {
                ielts: 8.0,
                gmat: 650,
            },
        },
        applications: [
            {
                id: "app_3",
                universityId: "cambridge",
                program: "Business Administration",
                status: "accepted",
                documents: ["transcript", "recommendation_1", "essay"],
                submittedAt: new Date("2024-09-15"),
                deadline: new Date("2024-12-01"),
            },
        ],
        isActive: true,
        isEmailVerified: true,
        lastLogin: new Date("2024-11-28"),
    },
    {
        email: "ahmed.hassan@example.com",
        password: "password123",
        firstName: "Ahmed",
        lastName: "Hassan",
        phone: "+201234567890",
        dateOfBirth: new Date("1996-07-10"),
        nationality: "Egyptian",
        avatar: "/placeholder-user.jpg",
        personalInfo: {
            firstName: "Ahmed",
            lastName: "Hassan",
            email: "ahmed.hassan@example.com",
            phone: "+201234567890",
            dateOfBirth: new Date("1996-07-10"),
            nationality: "Egyptian",
        },
        academicInfo: {
            gpa: 3.7,
            highSchoolName: "Cairo International School",
            graduationYear: 2024,
            intendedMajors: ["Medicine", "Public Health"],
        },
        areasOfInterest: ["Medical Research", "Public Health", "Biotechnology", "Healthcare"],
        testScores: [
            {
                id: "test_6",
                testName: "TOEFL",
                score: "95",
                date: new Date("2023-09-20"),
                maxScore: "120",
                percentile: 80,
            },
            {
                id: "test_7",
                testName: "MCAT",
                score: "510",
                date: new Date("2023-08-15"),
                maxScore: "528",
                percentile: 75,
            },
        ],
        documents: [
            {
                id: "doc_6",
                name: "High School Transcript",
                type: "transcript",
                url: "/documents/ahmed_transcript.pdf",
                uploadedAt: new Date("2024-08-20"),
                status: "verified",
            },
            {
                id: "doc_7",
                name: "Medical Essay",
                type: "essay",
                url: "/documents/medical_essay.pdf",
                uploadedAt: new Date("2024-09-10"),
                status: "draft",
            },
        ],
        savedUniversities: [
            {
                id: "saved_6",
                universityId: "toronto",
                universityName: "University of Toronto",
                savedAt: new Date("2024-08-25"),
                notes: "Excellent medical program",
            },
        ],
        preferences: {
            countries: ["canada", "australia", "netherlands"],
            programs: ["Medicine", "Public Health"],
            budget: {
                min: 25000,
                max: 60000,
                currency: "USD",
            },
            examScores: {
                toefl: 95,
                mcat: 510,
            },
        },
        applications: [
            {
                id: "app_4",
                universityId: "toronto",
                program: "Medicine",
                status: "draft",
                documents: ["transcript", "mcat_score"],
                deadline: new Date("2025-02-15"),
            },
        ],
        isActive: true,
        isEmailVerified: false,
        lastLogin: new Date("2024-11-25"),
    },
    {
        email: "maria.garcia@example.com",
        password: "password123",
        firstName: "Maria",
        lastName: "Garcia",
        phone: "+34612345678",
        dateOfBirth: new Date("1997-11-05"),
        nationality: "Spanish",
        avatar: "/placeholder-user.jpg",
        personalInfo: {
            firstName: "Maria",
            lastName: "Garcia",
            email: "maria.garcia@example.com",
            phone: "+34612345678",
            dateOfBirth: new Date("1997-11-05"),
            nationality: "Spanish",
        },
        academicInfo: {
            gpa: 3.6,
            highSchoolName: "Instituto de Educación Secundaria",
            graduationYear: 2024,
            intendedMajors: ["Fine Arts", "Graphic Design"],
        },
        areasOfInterest: ["Digital Art", "Illustration", "Brand Design", "Photography"],
        testScores: [
            {
                id: "test_8",
                testName: "IELTS",
                score: "6.5",
                date: new Date("2023-11-10"),
                maxScore: "9.0",
                percentile: 70,
            },
        ],
        documents: [
            {
                id: "doc_8",
                name: "Portfolio",
                type: "portfolio",
                url: "/documents/maria_portfolio.pdf",
                uploadedAt: new Date("2024-09-05"),
                status: "verified",
            },
        ],
        savedUniversities: [],
        preferences: {
            countries: ["usa", "uk", "france"],
            programs: ["Art", "Design"],
            budget: {
                min: 10000,
                max: 35000,
                currency: "USD",
            },
            examScores: {
                ielts: 6.5,
            },
        },
        applications: [],
        isActive: true,
        isEmailVerified: true,
        lastLogin: new Date("2024-12-02"),
    },
    {
        email: "li.wei@example.com",
        password: "password123",
        firstName: "Li",
        lastName: "Wei",
        phone: "+8613800138000",
        dateOfBirth: new Date("1994-05-18"),
        nationality: "Chinese",
        avatar: "/placeholder-user.jpg",
        personalInfo: {
            firstName: "Li",
            lastName: "Wei",
            email: "li.wei@example.com",
            phone: "+8613800138000",
            dateOfBirth: new Date("1994-05-18"),
            nationality: "Chinese",
        },
        academicInfo: {
            gpa: 3.9,
            highSchoolName: "Beijing International School",
            graduationYear: 2024,
            intendedMajors: ["Computer Science", "Data Science"],
        },
        areasOfInterest: ["Machine Learning", "Data Analysis", "Artificial Intelligence", "Statistics"],
        testScores: [
            {
                id: "test_9",
                testName: "TOEFL",
                score: "105",
                date: new Date("2023-10-05"),
                maxScore: "120",
                percentile: 88,
            },
            {
                id: "test_10",
                testName: "GRE",
                score: "330",
                date: new Date("2023-09-20"),
                maxScore: "340",
                percentile: 90,
            },
        ],
        documents: [
            {
                id: "doc_9",
                name: "High School Transcript",
                type: "transcript",
                url: "/documents/li_transcript.pdf",
                uploadedAt: new Date("2024-08-30"),
                status: "verified",
            },
            {
                id: "doc_10",
                name: "Research Paper",
                type: "other",
                url: "/documents/research_paper.pdf",
                uploadedAt: new Date("2024-09-15"),
                status: "verified",
            },
        ],
        savedUniversities: [
            {
                id: "saved_7",
                universityId: "berkeley",
                universityName: "University of California, Berkeley",
                savedAt: new Date("2024-08-10"),
                notes: "Strong CS program, rejected but still interested",
            },
            {
                id: "saved_8",
                universityId: "waterloo",
                universityName: "University of Waterloo",
                savedAt: new Date("2024-09-15"),
                notes: "Accepted! Great co-op program",
            },
        ],
        preferences: {
            countries: ["usa", "canada", "australia"],
            programs: ["Computer Science", "Data Science"],
            budget: {
                min: 30000,
                max: 70000,
                currency: "USD",
            },
            examScores: {
                toefl: 105,
                gre: 330,
            },
        },
        applications: [
            {
                id: "app_5",
                universityId: "berkeley",
                program: "Computer Science",
                status: "rejected",
                documents: ["transcript", "recommendation_1", "recommendation_2", "portfolio"],
                submittedAt: new Date("2024-09-01"),
                deadline: new Date("2024-12-01"),
            },
            {
                id: "app_6",
                universityId: "waterloo",
                program: "Data Science",
                status: "accepted",
                documents: ["transcript", "recommendation_1", "recommendation_2"],
                submittedAt: new Date("2024-10-01"),
                deadline: new Date("2024-12-15"),
            },
        ],
        isActive: true,
        isEmailVerified: true,
        lastLogin: new Date("2024-11-30"),
    },
];
const seedUsers = async () => {
    try {
        const existingUsers = await User_1.default.countDocuments();
        if (existingUsers > 0) {
            console.log(`⚠️  ${existingUsers} users already exist. Skipping user seeding to preserve existing data.`);
            console.log("💡 Use seedUsersForce() if you want to replace all users.");
            return;
        }
        await User_1.default.insertMany(exports.userSeedData);
        console.log("✅ User seed data inserted successfully");
    }
    catch (error) {
        console.error("❌ Error seeding user data:", error);
    }
};
exports.seedUsers = seedUsers;
const seedUsersForce = async () => {
    try {
        console.log("⚠️  Force seeding: This will delete ALL existing users!");
        await User_1.default.deleteMany({});
        await User_1.default.insertMany(exports.userSeedData);
        console.log("✅ User seed data force-inserted successfully");
    }
    catch (error) {
        console.error("❌ Error force-seeding user data:", error);
    }
};
exports.seedUsersForce = seedUsersForce;
//# sourceMappingURL=userSeedData.js.map