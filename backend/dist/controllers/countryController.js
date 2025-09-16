"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCountries = exports.getCountryById = exports.getAllCountries = void 0;
const countries = [
    {
        id: "usa",
        name: "United States",
        flag: "🇺🇸",
        popularCities: ["New York", "Los Angeles", "Boston", "San Francisco"],
        rating: 4.5,
        description: "Home to world-renowned universities and diverse opportunities.",
        visaType: "F-1 Student Visa",
        workRights: "OPT/CPT available",
        avgTuition: "$50,000/year",
        livingCost: "$15,000-25,000/year",
        currency: "USD",
        language: ["English"],
        climate: "Varied",
    },
    {
        id: "uk",
        name: "United Kingdom",
        flag: "🇬🇧",
        popularCities: ["London", "Oxford", "Cambridge", "Edinburgh"],
        rating: 4.3,
        description: "Rich academic tradition with prestigious universities.",
        visaType: "Student Visa",
        workRights: "Part-time work allowed",
        avgTuition: "£25,000/year",
        livingCost: "£12,000-18,000/year",
        currency: "GBP",
        language: ["English"],
        climate: "Temperate",
    },
    {
        id: "canada",
        name: "Canada",
        flag: "🇨🇦",
        popularCities: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
        rating: 4.4,
        description: "High-quality education with welcoming immigration policies.",
        visaType: "Study Permit",
        workRights: "Work during studies",
        avgTuition: "CAD $30,000/year",
        livingCost: "CAD $12,000-20,000/year",
        currency: "CAD",
        language: ["English", "French"],
        climate: "Cold winters, mild summers",
    },
    {
        id: "australia",
        name: "Australia",
        flag: "🇦🇺",
        popularCities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
        rating: 4.2,
        description: "Beautiful country with excellent universities and quality of life.",
        visaType: "Student Visa",
        workRights: "Part-time work allowed",
        avgTuition: "AUD $35,000/year",
        livingCost: "AUD $15,000-25,000/year",
        currency: "AUD",
        language: ["English"],
        climate: "Warm and sunny",
    },
];
const getAllCountries = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort = "rating", order = "desc" } = req.query;
        const sortedCountries = [...countries].sort((a, b) => {
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
        const paginatedCountries = sortedCountries.slice(startIndex, endIndex);
        const response = {
            success: true,
            data: paginatedCountries,
            pagination: {
                page,
                limit,
                total: countries.length,
                pages: Math.ceil(countries.length / limit),
            },
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCountries = getAllCountries;
const getCountryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const country = countries.find((c) => c.id === id);
        if (!country) {
            res.status(404).json({
                success: false,
                data: {},
                message: "Country not found",
            });
            return;
        }
        const response = {
            success: true,
            data: country,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getCountryById = getCountryById;
const searchCountries = async (req, res, next) => {
    try {
        const { q = "" } = req.query;
        let filteredCountries = [...countries];
        if (q) {
            const searchTerm = q.toLowerCase();
            filteredCountries = filteredCountries.filter((country) => country.name.toLowerCase().includes(searchTerm) ||
                country.popularCities.some((city) => city.toLowerCase().includes(searchTerm)) ||
                country.description.toLowerCase().includes(searchTerm));
        }
        const response = {
            success: true,
            data: filteredCountries,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.searchCountries = searchCountries;
//# sourceMappingURL=countryController.js.map