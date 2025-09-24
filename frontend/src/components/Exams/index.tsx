import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, TrendingUp, Play, Globe } from "lucide-react";
import {
  getRealisticTestDate,
  isRegistrationOpen,
} from "@/utils/testDateService";

// Enhanced exam interface with additional fields
interface Exam {
  name: string;
  fullName: string;
  sections: string[];
  nextDate: string;
  preparation: string;
  difficulty: string;
  category: string;
  website: string;
  registrationUrl: string;
  notes?: string;
  isAvailable?: boolean;
  registrationDeadline?: string;
}

export const Exams = () => {
  // Get realistic test date using our fact-checked service
  const getRealisticDate = (examName: string) => {
    const testDateInfo = getRealisticTestDate(examName);
    return testDateInfo.nextDate;
  };

  // Get full test date info including notes
  const getTestDateInfo = (examName: string) => {
    return getRealisticTestDate(examName);
  };

  // Get registration status
  const getRegistrationStatus = (examName: string) => {
    return isRegistrationOpen(examName);
  };

  const exams = [
    // Undergraduate Admissions
    {
      name: "SAT",
      fullName: "Scholastic Assessment Test",
      sections: ["Reading", "Writing", "Math"],
      nextDate: getRealisticDate("SAT"),
      preparation: "3-6 months",
      difficulty: "High",
      category: "Undergraduate",
      website: "https://satsuite.collegeboard.org/sat",
      registrationUrl: "https://satsuite.collegeboard.org/sat/registration",
      notes: getTestDateInfo("SAT").notes,
      isAvailable: getTestDateInfo("SAT").isAvailable,
      registrationDeadline: getTestDateInfo("SAT").registrationDeadline,
    },
    {
      name: "ACT",
      fullName: "American College Testing",
      sections: ["English", "Math", "Reading", "Science", "Writing"],
      nextDate: getRealisticDate("ACT"),
      preparation: "2-4 months",
      difficulty: "High",
      category: "Undergraduate",
      website: "https://www.act.org",
      registrationUrl: "https://www.act.org/register",
      notes: getTestDateInfo("ACT").notes,
      isAvailable: getTestDateInfo("ACT").isAvailable,
      registrationDeadline: getTestDateInfo("ACT").registrationDeadline,
    },
    {
      name: "AP Exams",
      fullName: "Advanced Placement Exams",
      sections: ["Various Subjects (38 subjects available)"],
      nextDate: getRealisticDate("AP Exams"),
      preparation: "6-12 months",
      difficulty: "High",
      category: "Undergraduate",
      website: "https://apstudents.collegeboard.org",
      registrationUrl: "https://apstudents.collegeboard.org/register",
      notes: getTestDateInfo("AP Exams").notes,
      isAvailable: getTestDateInfo("AP Exams").isAvailable,
      registrationDeadline: getTestDateInfo("AP Exams").registrationDeadline,
    },
    {
      name: "IB Exams",
      fullName: "International Baccalaureate Exams",
      sections: ["Various Subjects (6 subject groups)"],
      nextDate: getRealisticDate("IB Exams"),
      preparation: "2 years",
      difficulty: "High",
      category: "Undergraduate",
      website: "https://www.ibo.org",
      registrationUrl:
        "https://www.ibo.org/programmes/diploma-programme/assessment-and-exams",
      notes: getTestDateInfo("IB Exams").notes,
      isAvailable: getTestDateInfo("IB Exams").isAvailable,
      registrationDeadline: getTestDateInfo("IB Exams").registrationDeadline,
    },
    {
      name: "A-Levels",
      fullName: "Advanced Level Qualifications",
      sections: ["Various Subjects (50+ subjects available)"],
      nextDate: getRealisticDate("A-Levels"),
      preparation: "2 years",
      difficulty: "High",
      category: "Undergraduate",
      website: "https://www.cambridgeinternational.org",
      registrationUrl:
        "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-advanced/cambridge-international-as-and-a-levels",
      notes: getTestDateInfo("A-Levels").notes,
      isAvailable: getTestDateInfo("A-Levels").isAvailable,
      registrationDeadline: getTestDateInfo("A-Levels").registrationDeadline,
    },

    // Asian Countries Tests
    {
      name: "EJU",
      fullName: "Examination for Japanese University Admission",
      sections: [
        "Japanese as a Foreign Language",
        "Science",
        "Japan and the World",
        "Mathematics",
      ],
      nextDate: getRealisticDate("EJU"),
      preparation: "1-2 years",
      difficulty: "High",
      category: "Asian Entrance Exams",
      website: "https://eju.mn",
      registrationUrl: "https://eju.mn/login",
      notes: getTestDateInfo("EJU").notes,
      isAvailable: getTestDateInfo("EJU").isAvailable,
      registrationDeadline: getTestDateInfo("EJU").registrationDeadline,
    },
    {
      name: "JLPT",
      fullName: "Japanese Language Proficiency Test",
      sections: ["Vocabulary", "Grammar", "Reading", "Listening"],
      nextDate: getRealisticDate("JLPT"),
      preparation: "6-12 months",
      difficulty: "Medium",
      category: "Asian Language Tests",
      website: "https://jlpt.mn",
      registrationUrl: "https://jlpt.mn",
      notes: getTestDateInfo("JLPT").notes,
      isAvailable: getTestDateInfo("JLPT").isAvailable,
      registrationDeadline: getTestDateInfo("JLPT").registrationDeadline,
    },
    {
      name: "TOPIK",
      fullName: "Test of Proficiency in Korean",
      sections: ["Vocabulary & Grammar", "Writing", "Reading", "Listening"],
      nextDate: getRealisticDate("TOPIK"),
      preparation: "6-12 months",
      difficulty: "Medium",
      category: "Asian Language Tests",
      website: "https://topik.mn",
      registrationUrl: "https://topik.mn",
      notes: getTestDateInfo("TOPIK").notes,
      isAvailable: getTestDateInfo("TOPIK").isAvailable,
      registrationDeadline: getTestDateInfo("TOPIK").registrationDeadline,
    },
    {
      name: "HSK",
      fullName: "Hanyu Shuiping Kaoshi",
      sections: ["Listening", "Reading", "Writing"],
      nextDate: getRealisticDate("HSK"),
      preparation: "6-12 months",
      difficulty: "Medium",
      category: "Asian Language Tests",
      website: "https://www.chinesetest.cn",
      registrationUrl: "https://www.chinesetest.cn/userorder.do",
      notes: getTestDateInfo("HSK").notes,
      isAvailable: getTestDateInfo("HSK").isAvailable,
      registrationDeadline: getTestDateInfo("HSK").registrationDeadline,
    },

    // English Language Tests
    {
      name: "TOEFL",
      fullName: "Test of English as a Foreign Language",
      sections: ["Reading", "Listening", "Speaking", "Writing"],
      nextDate: getRealisticDate("TOEFL"),
      preparation: "2-4 months",
      difficulty: "Medium",
      category: "English Language",
      website: "https://www.ets.org/toefl",
      registrationUrl: "https://www.ets.org/toefl/test-takers/ibt/register",
      notes: getTestDateInfo("TOEFL").notes,
      isAvailable: getTestDateInfo("TOEFL").isAvailable,
      registrationDeadline: getTestDateInfo("TOEFL").registrationDeadline,
    },
    {
      name: "IELTS",
      fullName: "International English Language Testing System",
      sections: ["Reading", "Listening", "Speaking", "Writing"],
      nextDate: getRealisticDate("IELTS"),
      preparation: "2-4 months",
      difficulty: "Medium",
      category: "English Language",
      website: "https://www.ielts.org",
      registrationUrl: "https://www.ielts.org/book-a-test",
      notes: getTestDateInfo("IELTS").notes,
      isAvailable: getTestDateInfo("IELTS").isAvailable,
      registrationDeadline: getTestDateInfo("IELTS").registrationDeadline,
    },
    {
      name: "Duolingo English Test",
      fullName: "Duolingo English Test",
      sections: ["Reading", "Writing", "Speaking", "Listening"],
      nextDate: getRealisticDate("Duolingo English Test"),
      preparation: "1-2 months",
      difficulty: "Medium",
      category: "English Language",
      website: "https://englishtest.duolingo.com",
      registrationUrl: "https://englishtest.duolingo.com/register",
      notes: getTestDateInfo("Duolingo English Test").notes,
      isAvailable: getTestDateInfo("Duolingo English Test").isAvailable,
      registrationDeadline: getTestDateInfo("Duolingo English Test")
        .registrationDeadline,
    },
    {
      name: "PTE Academic",
      fullName: "Pearson Test of English Academic",
      sections: ["Speaking & Writing", "Reading", "Listening"],
      nextDate: getRealisticDate("PTE Academic"),
      preparation: "1-3 months",
      difficulty: "Medium",
      category: "English Language",
      website: "https://pearsonpte.com",
      registrationUrl: "https://pearsonpte.com/book-now",
      notes: getTestDateInfo("PTE Academic").notes,
      isAvailable: getTestDateInfo("PTE Academic").isAvailable,
      registrationDeadline:
        getTestDateInfo("PTE Academic").registrationDeadline,
    },
    {
      name: "Cambridge English",
      fullName: "Cambridge English Qualifications",
      sections: ["Reading", "Writing", "Listening", "Speaking"],
      nextDate: getRealisticDate("Cambridge English"),
      preparation: "2-6 months",
      difficulty: "Medium",
      category: "English Language",
      website: "https://www.cambridgeenglish.org",
      registrationUrl: "https://www.cambridgeenglish.org/exams-and-tests",
      notes: getTestDateInfo("Cambridge English").notes,
      isAvailable: getTestDateInfo("Cambridge English").isAvailable,
      registrationDeadline:
        getTestDateInfo("Cambridge English").registrationDeadline,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Standardized Exams
          </h1>
          <p className="text-muted-foreground">
            Track your exam preparation and scores for university admissions
          </p>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList>
            <TabsTrigger value="available">Available Exams</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            {/* Undergraduate Admissions */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Undergraduate Admissions
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {exams
                  .filter(exam => exam.category === "Undergraduate")
                  .map((exam, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader>
                        <div>
                          <CardTitle className="text-xl">{exam.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {exam.fullName}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Sections:</p>
                          <p className="text-sm text-muted-foreground">
                            {exam.sections.join(", ")}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Next Test Date
                            </span>
                            <span className="font-medium">{exam.nextDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Prep Time Needed
                            </span>
                            <span className="font-medium">
                              {exam.preparation}
                            </span>
                          </div>
                          {exam.registrationDeadline && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Registration Deadline
                              </span>
                              <span className="font-medium text-orange-600">
                                {exam.registrationDeadline}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Availability
                            </span>
                            <span
                              className={`font-medium ${exam.isAvailable ? "text-green-600" : "text-red-600"}`}
                            >
                              {exam.isAvailable ? "Available" : "Not Available"}
                            </span>
                          </div>
                        </div>

                        {exam.notes && (
                          <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
                            <p className="text-sm text-gray-800">
                              {exam.notes}
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Button
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => {
                              // Track exam registration
                              const examRegistrations = JSON.parse(
                                localStorage.getItem("examRegistrations") ||
                                  "[]"
                              );
                              const newRegistration = {
                                examName: exam.name,
                                examType: exam.category,
                                registrationDate: new Date().toISOString(),
                                registrationUrl: exam.registrationUrl,
                              };

                              // Check if already registered
                              const alreadyRegistered = examRegistrations.some(
                                (reg: { examName: string }) =>
                                  reg.examName === exam.name
                              );

                              if (!alreadyRegistered) {
                                examRegistrations.push(newRegistration);
                                localStorage.setItem(
                                  "examRegistrations",
                                  JSON.stringify(examRegistrations)
                                );
                                console.log(`Registered for ${exam.name}`);
                              }

                              window.open(exam.registrationUrl, "_blank");
                            }}
                            disabled={!exam.isAvailable}
                          >
                            <Target className="h-4 w-4 mr-2" />
                            {exam.isAvailable
                              ? `Register for ${exam.name}`
                              : "Registration Closed"}
                          </Button>

                          {!exam.isAvailable && (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() =>
                                window.open(exam.website, "_blank")
                              }
                            >
                              <Globe className="h-4 w-4 mr-2" />
                              Visit Website
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* English Language Tests */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                English Language Tests
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {exams
                  .filter(exam => exam.category === "English Language")
                  .map((exam, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader>
                        <div>
                          <CardTitle className="text-xl">{exam.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {exam.fullName}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Sections:</p>
                          <p className="text-sm text-muted-foreground">
                            {exam.sections.join(", ")}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Next Test Date
                            </span>
                            <span className="font-medium">{exam.nextDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Prep Time Needed
                            </span>
                            <span className="font-medium">
                              {exam.preparation}
                            </span>
                          </div>
                          {exam.registrationDeadline && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Registration Deadline
                              </span>
                              <span className="font-medium text-orange-600">
                                {exam.registrationDeadline}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Availability
                            </span>
                            <span
                              className={`font-medium ${exam.isAvailable ? "text-green-600" : "text-red-600"}`}
                            >
                              {exam.isAvailable ? "Available" : "Not Available"}
                            </span>
                          </div>
                        </div>

                        {exam.notes && (
                          <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
                            <p className="text-sm text-gray-800">
                              {exam.notes}
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Button
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => {
                              // Track exam registration
                              const examRegistrations = JSON.parse(
                                localStorage.getItem("examRegistrations") ||
                                  "[]"
                              );
                              const newRegistration = {
                                examName: exam.name,
                                examType: exam.category,
                                registrationDate: new Date().toISOString(),
                                registrationUrl: exam.registrationUrl,
                              };

                              // Check if already registered
                              const alreadyRegistered = examRegistrations.some(
                                (reg: { examName: string }) =>
                                  reg.examName === exam.name
                              );

                              if (!alreadyRegistered) {
                                examRegistrations.push(newRegistration);
                                localStorage.setItem(
                                  "examRegistrations",
                                  JSON.stringify(examRegistrations)
                                );
                                console.log(`Registered for ${exam.name}`);
                              }

                              window.open(exam.registrationUrl, "_blank");
                            }}
                            disabled={!exam.isAvailable}
                          >
                            <Target className="h-4 w-4 mr-2" />
                            {exam.isAvailable
                              ? `Register for ${exam.name}`
                              : "Registration Closed"}
                          </Button>

                          {!exam.isAvailable && (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() =>
                                window.open(exam.website, "_blank")
                              }
                            >
                              <Globe className="h-4 w-4 mr-2" />
                              Visit Website
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Asian Entrance Exams */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Asian Entrance Exams
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {exams
                  .filter(exam => exam.category === "Asian Entrance Exams")
                  .map((exam, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader>
                        <div>
                          <CardTitle className="text-xl">{exam.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {exam.fullName}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Sections:</p>
                          <p className="text-sm text-muted-foreground">
                            {exam.sections.join(", ")}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Next Test Date
                            </span>
                            <span className="font-medium">{exam.nextDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Prep Time Needed
                            </span>
                            <span className="font-medium">
                              {exam.preparation}
                            </span>
                          </div>
                          {exam.registrationDeadline && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Registration Deadline
                              </span>
                              <span className="font-medium text-orange-600">
                                {exam.registrationDeadline}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Availability
                            </span>
                            <span
                              className={`font-medium ${exam.isAvailable ? "text-green-600" : "text-red-600"}`}
                            >
                              {exam.isAvailable ? "Available" : "Not Available"}
                            </span>
                          </div>
                        </div>

                        {exam.notes && (
                          <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
                            <p className="text-sm text-gray-800">
                              {exam.notes}
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Button
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => {
                              // Track exam registration
                              const examRegistrations = JSON.parse(
                                localStorage.getItem("examRegistrations") ||
                                  "[]"
                              );
                              const newRegistration = {
                                examName: exam.name,
                                examType: exam.category,
                                registrationDate: new Date().toISOString(),
                                registrationUrl: exam.registrationUrl,
                              };

                              // Check if already registered
                              const alreadyRegistered = examRegistrations.some(
                                (reg: { examName: string }) =>
                                  reg.examName === exam.name
                              );

                              if (!alreadyRegistered) {
                                examRegistrations.push(newRegistration);
                                localStorage.setItem(
                                  "examRegistrations",
                                  JSON.stringify(examRegistrations)
                                );
                                console.log(`Registered for ${exam.name}`);
                              }

                              window.open(exam.registrationUrl, "_blank");
                            }}
                            disabled={!exam.isAvailable}
                          >
                            <Target className="h-4 w-4 mr-2" />
                            {exam.isAvailable
                              ? `Register for ${exam.name}`
                              : "Registration Closed"}
                          </Button>

                          {!exam.isAvailable && (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() =>
                                window.open(exam.website, "_blank")
                              }
                            >
                              <Globe className="h-4 w-4 mr-2" />
                              Visit Website
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Asian Language Tests */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Asian Language Tests
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {exams
                  .filter(exam => exam.category === "Asian Language Tests")
                  .map((exam, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader>
                        <div>
                          <CardTitle className="text-xl">{exam.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {exam.fullName}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Sections:</p>
                          <p className="text-sm text-muted-foreground">
                            {exam.sections.join(", ")}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Next Test Date
                            </span>
                            <span className="font-medium">{exam.nextDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Prep Time Needed
                            </span>
                            <span className="font-medium">
                              {exam.preparation}
                            </span>
                          </div>
                          {exam.registrationDeadline && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Registration Deadline
                              </span>
                              <span className="font-medium text-orange-600">
                                {exam.registrationDeadline}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                              Availability
                            </span>
                            <span
                              className={`font-medium ${exam.isAvailable ? "text-green-600" : "text-red-600"}`}
                            >
                              {exam.isAvailable ? "Available" : "Not Available"}
                            </span>
                          </div>
                        </div>

                        {exam.notes && (
                          <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
                            <p className="text-sm text-gray-800">
                              {exam.notes}
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Button
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => {
                              // Track exam registration
                              const examRegistrations = JSON.parse(
                                localStorage.getItem("examRegistrations") ||
                                  "[]"
                              );
                              const newRegistration = {
                                examName: exam.name,
                                examType: exam.category,
                                registrationDate: new Date().toISOString(),
                                registrationUrl: exam.registrationUrl,
                              };

                              // Check if already registered
                              const alreadyRegistered = examRegistrations.some(
                                (reg: { examName: string }) =>
                                  reg.examName === exam.name
                              );

                              if (!alreadyRegistered) {
                                examRegistrations.push(newRegistration);
                                localStorage.setItem(
                                  "examRegistrations",
                                  JSON.stringify(examRegistrations)
                                );
                                console.log(`Registered for ${exam.name}`);
                              }

                              window.open(exam.registrationUrl, "_blank");
                            }}
                            disabled={!exam.isAvailable}
                          >
                            <Target className="h-4 w-4 mr-2" />
                            {exam.isAvailable
                              ? `Register for ${exam.name}`
                              : "Registration Closed"}
                          </Button>

                          {!exam.isAvailable && (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() =>
                                window.open(exam.website, "_blank")
                              }
                            >
                              <Globe className="h-4 w-4 mr-2" />
                              Visit Website
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            {/* SAT Practice Tests */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                SAT Practice Tests
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      SAT Full Practice Test
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Complete 3-hour practice test
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Reading, Writing, Math sections
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://satsuite.collegeboard.org/sat/practice-preparation/practice-tests",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Full Test
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      SAT Math Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Math section focused practice
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      80 minutes, 58 questions
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://satsuite.collegeboard.org/sat/practice-preparation/practice-tests",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Math Test
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      SAT Reading Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Reading comprehension practice
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      65 minutes, 52 questions
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://satsuite.collegeboard.org/sat/practice-preparation/practice-tests",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Reading Test
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* TOEFL Practice Tests */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                TOEFL Practice Tests
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      TOEFL Full Practice Test
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Complete 4-hour practice test
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Reading, Listening, Speaking, Writing
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://www.ets.org/toefl/test-takers/ibt/prepare/practice-tests",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Full Test
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      TOEFL Speaking Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Speaking section practice
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      17 minutes, 4 tasks
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://www.ets.org/toefl/test-takers/ibt/prepare/practice-tests",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Speaking
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      TOEFL Writing Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Writing section practice
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      50 minutes, 2 tasks
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://www.ets.org/toefl/test-takers/ibt/prepare/practice-tests",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Writing
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* IELTS Practice Tests */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                IELTS Practice Tests
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      IELTS Academic Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Academic module practice test
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Reading, Writing, Listening, Speaking
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://www.ielts.org/for-test-takers/sample-test-questions",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Academic Test
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      IELTS General Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      General training practice test
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Reading, Writing, Listening, Speaking
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://www.ielts.org/for-test-takers/sample-test-questions",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start General Test
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      IELTS Progress Tracker
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Track your improvement over time
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Monitor scores and weak areas
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://www.ielts.org/for-test-takers/sample-test-questions",
                          "_blank"
                        )
                      }
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Progress
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* GRE Practice Tests */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                GRE Practice Tests
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      GRE Full Practice Test
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Complete GRE practice test
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Verbal, Quantitative, Analytical Writing
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://www.ets.org/gre/test-takers/general-test/prepare/practice-tests",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Full Test
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      GRE Verbal Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Verbal reasoning practice
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      60 minutes, 2 sections
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://www.ets.org/gre/test-takers/general-test/prepare/practice-tests",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Verbal Test
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      GRE Math Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Quantitative reasoning practice
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      70 minutes, 2 sections
                    </p>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() =>
                        window.open(
                          "https://www.ets.org/gre/test-takers/general-test/prepare/practice-tests",
                          "_blank"
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Math Test
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
