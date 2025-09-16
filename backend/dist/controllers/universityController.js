"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUniversity = exports.updateUniversity = exports.createUniversity = exports.searchUniversities = exports.getUniversityById = exports.getAllUniversities = void 0;
const universities = [
    {
        id: "mit",
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
        description: "A world-class institution known for its cutting-edge research and innovation.",
        website: "https://web.mit.edu",
        founded: 1861,
        type: "private",
        size: "medium",
    },
    {
        id: "stanford",
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
        description: "Located in the heart of Silicon Valley, Stanford fosters innovation and entrepreneurship.",
        website: "https://stanford.edu",
        founded: 1885,
        type: "private",
        size: "large",
    },
    {
        id: "harvard",
        name: "Harvard University",
        location: "Cambridge, MA, USA",
        ranking: 3,
        rating: 4.9,
        tuition: "$57,261/year",
        acceptance: "3.4%",
        students: "23,731",
        image: "/harvard-campus.jpg",
        programs: ["Liberal Arts", "Medicine", "Law", "Business"],
        highlights: ["Ivy League prestige", "World-class faculty", "Rich history"],
        deadline: "Jan 1, 2025",
        description: "The oldest institution of higher education in the United States.",
        website: "https://harvard.edu",
        founded: 1636,
        type: "private",
        size: "large",
    },
    {
        id: "oxford",
        name: "University of Oxford",
        location: "Oxford, UK",
        ranking: 4,
        rating: 4.7,
        tuition: "£26,770/year",
        acceptance: "17.5%",
        students: "24,515",
        image: "/oxford-university-campus.jpg",
        programs: ["Philosophy", "Literature", "Medicine", "Law"],
        highlights: [
            "Ancient history",
            "Tutorial system",
            "Beautiful architecture",
        ],
        deadline: "Oct 15, 2024",
        description: "One of the oldest universities in the English-speaking world.",
        website: "https://ox.ac.uk",
        founded: 1096,
        type: "public",
        size: "large",
    },
];
const getAllUniversities = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort = "ranking", order = "asc" } = req.query;
        const sortedUniversities = [...universities].sort((a, b) => {
            const aValue = a[sort];
            const bValue = b[sort];
            if (typeof aValue === "string" && typeof bValue === "string") {
                return order === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            if (typeof aValue === "number" && typeof bValue === "number") {
                return order === "asc" ? aValue - bValue : bValue - aValue;
            }
            return 0;
        });
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUniversities = sortedUniversities.slice(startIndex, endIndex);
        const response = {
            success: true,
            data: paginatedUniversities,
            pagination: {
                page,
                limit,
                total: universities.length,
                pages: Math.ceil(universities.length / limit),
            },
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUniversities = getAllUniversities;
const getUniversityById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const university = universities.find((uni) => uni.id === id);
        if (!university) {
            res.status(404).json({
                success: false,
                data: {},
                message: "University not found",
            });
            return;
        }
        const response = {
            success: true,
            data: university,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getUniversityById = getUniversityById;
const searchUniversities = async (req, res, next) => {
    try {
        const { q = "", country, program, minRating, maxTuition } = req.query;
        let filteredUniversities = [...universities];
        if (q) {
            const searchTerm = q.toLowerCase();
            filteredUniversities = filteredUniversities.filter((uni) => uni.name.toLowerCase().includes(searchTerm) ||
                uni.location.toLowerCase().includes(searchTerm) ||
                uni.programs.some((prog) => prog.toLowerCase().includes(searchTerm)));
        }
        if (country) {
            filteredUniversities = filteredUniversities.filter((uni) => uni.location.toLowerCase().includes(country.toLowerCase()));
        }
        if (program) {
            filteredUniversities = filteredUniversities.filter((uni) => uni.programs.some((prog) => prog.toLowerCase().includes(program.toLowerCase())));
        }
        if (minRating) {
            filteredUniversities = filteredUniversities.filter((uni) => uni.rating >= parseFloat(minRating.toString()));
        }
        if (maxTuition) {
            filteredUniversities = filteredUniversities.filter((uni) => {
                const tuitionNumber = parseFloat(uni.tuition.replace(/[^0-9.]/g, ""));
                return tuitionNumber <= parseFloat(maxTuition.toString());
            });
        }
        const response = {
            success: true,
            data: filteredUniversities,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.searchUniversities = searchUniversities;
const createUniversity = async (req, res, next) => {
    try {
        const newUniversity = {
            ...req.body,
            id: `uni_${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        universities.push(newUniversity);
        const response = {
            success: true,
            data: newUniversity,
            message: "University created successfully",
        };
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.createUniversity = createUniversity;
const updateUniversity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const universityIndex = universities.findIndex((uni) => uni.id === id);
        if (universityIndex === -1) {
            res.status(404).json({
                success: false,
                data: {},
                message: "University not found",
            });
            return;
        }
        universities[universityIndex] = {
            ...universities[universityIndex],
            ...req.body,
            updatedAt: new Date(),
        };
        const response = {
            success: true,
            data: universities[universityIndex],
            message: "University updated successfully",
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUniversity = updateUniversity;
const deleteUniversity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const universityIndex = universities.findIndex((uni) => uni.id === id);
        if (universityIndex === -1) {
            res.status(404).json({
                success: false,
                data: {},
                message: "University not found",
            });
            return;
        }
        universities.splice(universityIndex, 1);
        const response = {
            success: true,
            data: {},
            message: "University deleted successfully",
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUniversity = deleteUniversity;
//# sourceMappingURL=universityController.js.map