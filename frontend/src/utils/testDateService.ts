/**
 * Real-time Test Date Service
 * Provides realistic and fact-checked test dates based on actual exam schedules
 */

export interface TestDateInfo {
  nextDate: string;
  isAvailable: boolean;
  registrationDeadline?: string;
  notes?: string;
}

export interface ExamSchedule {
  name: string;
  category: string;
  frequency: "monthly" | "weekly" | "seasonal" | "continuous";
  typicalSchedule: string[];
  blackoutPeriods?: string[];
  registrationLeadTime: number; // days before test
  notes: string;
}

// Real exam schedules based on actual patterns
const examSchedules: ExamSchedule[] = [
  {
    name: "SAT",
    category: "Undergraduate",
    frequency: "monthly",
    typicalSchedule: ["1st Saturday", "3rd Saturday"],
    registrationLeadTime: 30,
    notes: "Usually offered 7 times per year",
  },
  {
    name: "ACT",
    category: "Undergraduate",
    frequency: "monthly",
    typicalSchedule: ["2nd Saturday", "4th Saturday"],
    registrationLeadTime: 35,
    notes: "Usually offered 6 times per year",
  },
  {
    name: "TOEFL",
    category: "English Language",
    frequency: "weekly",
    typicalSchedule: ["Saturday", "Sunday"],
    registrationLeadTime: 7,
    notes: "Available almost every weekend",
  },
  {
    name: "IELTS",
    category: "English Language",
    frequency: "weekly",
    typicalSchedule: ["Saturday", "Thursday"],
    registrationLeadTime: 5,
    notes: "Available multiple times per week",
  },
  {
    name: "GRE",
    category: "Graduate",
    frequency: "weekly",
    typicalSchedule: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    registrationLeadTime: 4,
    notes: "Available year-round at test centers",
  },
  {
    name: "GMAT",
    category: "Graduate",
    frequency: "weekly",
    typicalSchedule: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    registrationLeadTime: 3,
    notes: "Available year-round at test centers",
  },
  {
    name: "AP Exams",
    category: "Undergraduate",
    frequency: "seasonal",
    typicalSchedule: ["May 1-15"],
    blackoutPeriods: [
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
      "April",
    ],
    registrationLeadTime: 120,
    notes: "Only offered in May each year",
  },
  {
    name: "IB Exams",
    category: "Undergraduate",
    frequency: "seasonal",
    typicalSchedule: ["May 1-20"],
    blackoutPeriods: [
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
      "April",
    ],
    registrationLeadTime: 150,
    notes: "Only offered in May each year",
  },
  {
    name: "A-Levels",
    category: "Undergraduate",
    frequency: "seasonal",
    typicalSchedule: ["May 1-30", "October 1-30"],
    blackoutPeriods: [
      "November",
      "December",
      "January",
      "February",
      "March",
      "April",
    ],
    registrationLeadTime: 90,
    notes: "Offered twice per year: May and October",
  },
  {
    name: "LSAT",
    category: "Graduate",
    frequency: "monthly",
    typicalSchedule: ["2nd Saturday"],
    registrationLeadTime: 45,
    notes: "Offered 6 times per year",
  },
  {
    name: "MCAT",
    category: "Graduate",
    frequency: "monthly",
    typicalSchedule: ["3rd Saturday"],
    registrationLeadTime: 60,
    notes: "Offered 5 times per year",
  },
  {
    name: "PTE Academic",
    category: "English Language",
    frequency: "weekly",
    typicalSchedule: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    registrationLeadTime: 1,
    notes: "Available daily at most test centers",
  },
  {
    name: "Cambridge English",
    category: "English Language",
    frequency: "monthly",
    typicalSchedule: ["1st Saturday", "3rd Saturday"],
    registrationLeadTime: 14,
    notes: "Available 2-3 times per month",
  },
  {
    name: "Duolingo English Test",
    category: "English Language",
    frequency: "continuous",
    typicalSchedule: ["24/7 Online"],
    registrationLeadTime: 0,
    notes: "Available anytime, results in 2 days",
  },
  // Asian Countries Tests
  {
    name: "EJU",
    category: "Asian Entrance Exams",
    frequency: "seasonal",
    typicalSchedule: ["June 15", "November 9"],
    blackoutPeriods: [
      "January",
      "March",
      "April",
      "May",
      "July",
      "August",
      "September",
      "October",
      "December",
    ],
    registrationLeadTime: 30,
    notes:
      "2025 1st Session: Application Feb 10-Mar 6, Exam June 15, Results July 23. 2025 2nd Session: Application July 7-31, Exam November 9, Results December 17. For private study in Japan.",
  },
  {
    name: "JLPT",
    category: "Asian Language Tests",
    frequency: "seasonal",
    typicalSchedule: ["July 6", "December 7"],
    blackoutPeriods: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "August",
      "September",
      "October",
      "November",
    ],
    registrationLeadTime: 30,
    notes:
      "2025 July Session: Registration Mar 18-24, Exam July 6. 2025 December Session: Registration Aug 28-Sep 5, Exam December 7. N1-N2: 70,000₮, N3: 65,000₮, N4-N5: 55,000₮",
  },
  {
    name: "TOPIK",
    category: "Asian Language Tests",
    frequency: "seasonal",
    typicalSchedule: ["April 1", "October 1"],
    blackoutPeriods: [
      "January",
      "February",
      "March",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ],
    registrationLeadTime: 45,
    notes:
      "Offered twice per year: April and October. Available as PBT (Paper Based Test) and IBT (Internet Based Test). Organized by Mongolian TOPIK Committee.",
  },
  {
    name: "HSK",
    category: "Asian Language Tests",
    frequency: "monthly",
    typicalSchedule: ["2nd Saturday", "4th Saturday"],
    registrationLeadTime: 30,
    notes: "Offered multiple times per year",
  },
];

/**
 * Get realistic next test date for an exam
 */
export function getRealisticTestDate(examName: string): TestDateInfo {
  const schedule = examSchedules.find(s => s.name === examName);
  if (!schedule) {
    return {
      nextDate: "Contact Test Center",
      isAvailable: false,
      notes: "Schedule not available",
    };
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  switch (schedule.frequency) {
    case "continuous":
      return {
        nextDate: "Available Anytime",
        isAvailable: true,
        notes: schedule.notes,
      };

    case "seasonal":
      return getSeasonalDate(schedule, now, currentMonth, currentYear);

    case "weekly":
      return getWeeklyDate(schedule, now);

    case "monthly":
      return getMonthlyDate(schedule, now, currentMonth, currentYear);

    default:
      return {
        nextDate: "Contact Test Center",
        isAvailable: false,
        notes: "Schedule not available",
      };
  }
}

/**
 * Get next available weekly test date
 */
function getWeeklyDate(schedule: ExamSchedule, now: Date): TestDateInfo {
  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);

  // Find next available weekend for most English tests
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const targetDays = schedule.typicalSchedule;

  const nextDate = new Date(now);
  let found = false;

  // Look for next available date in the next 2 weeks
  for (let i = 0; i < 14 && !found; i++) {
    nextDate.setDate(now.getDate() + i);
    const dayName = daysOfWeek[nextDate.getDay()];

    if (targetDays.includes(dayName)) {
      found = true;
      break;
    }
  }

  if (!found) {
    nextDate.setDate(now.getDate() + 7); // Default to next week
  }

  const registrationDeadline = new Date(nextDate);
  registrationDeadline.setDate(
    nextDate.getDate() - schedule.registrationLeadTime
  );

  return {
    nextDate: nextDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    isAvailable: true,
    registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    notes: schedule.notes,
  };
}

/**
 * Get next available monthly test date
 */
function getMonthlyDate(
  schedule: ExamSchedule,
  now: Date,
  currentMonth: number,
  currentYear: number
): TestDateInfo {
  const today = now.getDate();

  // Try current month first
  for (const scheduleDay of schedule.typicalSchedule) {
    const dayNumber = getDayNumberFromSchedule(
      scheduleDay,
      currentMonth,
      currentYear
    );
    if (dayNumber > today) {
      const testDate = new Date(currentYear, currentMonth, dayNumber);
      const registrationDeadline = new Date(testDate);
      registrationDeadline.setDate(
        testDate.getDate() - schedule.registrationLeadTime
      );

      return {
        nextDate: testDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: true,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    }
  }

  // Try next month
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const scheduleDay = schedule.typicalSchedule[0]; // Take first available day
  const dayNumber = getDayNumberFromSchedule(scheduleDay, nextMonth, nextYear);
  const testDate = new Date(nextYear, nextMonth, dayNumber);
  const registrationDeadline = new Date(testDate);
  registrationDeadline.setDate(
    testDate.getDate() - schedule.registrationLeadTime
  );

  return {
    nextDate: testDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    isAvailable: true,
    registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    notes: schedule.notes,
  };
}

/**
 * Get next available seasonal test date (like AP, IB, A-Levels)
 */
function getSeasonalDate(
  schedule: ExamSchedule,
  now: Date,
  currentMonth: number,
  currentYear: number
): TestDateInfo {
  const currentDate = now.getDate();

  // For seasonal exams, look for the next available period
  if (schedule.name === "AP Exams" || schedule.name === "IB Exams") {
    // These are only in May
    if (currentMonth < 4) {
      // Before May
      const testDate = new Date(currentYear, 4, 1); // May 1st
      const registrationDeadline = new Date(testDate);
      registrationDeadline.setDate(
        testDate.getDate() - schedule.registrationLeadTime
      );

      return {
        nextDate: testDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: true,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    } else {
      // Past May, next year
      const testDate = new Date(currentYear + 1, 4, 1); // Next year May 1st
      const registrationDeadline = new Date(testDate);
      registrationDeadline.setDate(
        testDate.getDate() - schedule.registrationLeadTime
      );

      return {
        nextDate: testDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: true,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    }
  }

  // For JLPT (July 6 and December 7)
  if (schedule.name === "JLPT") {
    const currentDate = now.getDate();
    const july6 = new Date(currentYear, 6, 6); // July 6th
    const december7 = new Date(currentYear, 11, 7); // December 7th

    // Check if we're before July 6
    if (currentMonth < 6 || (currentMonth === 6 && currentDate < 6)) {
      // First session: July 6
      const registrationDeadline = new Date(currentYear, 2, 24); // March 24th

      return {
        nextDate: july6.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: now < registrationDeadline,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    }
    // Check if we're before December 7
    else if (currentMonth < 11 || (currentMonth === 11 && currentDate < 7)) {
      // Second session: December 7
      const registrationDeadline = new Date(currentYear, 8, 5); // September 5th

      return {
        nextDate: december7.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: now < registrationDeadline,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    }
    // Past December 7, next year's first session
    else {
      const nextJuly6 = new Date(currentYear + 1, 6, 6); // Next year July 6th
      const registrationDeadline = new Date(currentYear + 1, 2, 24); // Next year March 24th

      return {
        nextDate: nextJuly6.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: true,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    }
  }

  // For EJU (June 15 and November 9)
  if (schedule.name === "EJU") {
    const currentDate = now.getDate();
    const june15 = new Date(currentYear, 5, 15); // June 15th
    const november9 = new Date(currentYear, 10, 9); // November 9th

    // Check if we're before June 15
    if (currentMonth < 5 || (currentMonth === 5 && currentDate < 15)) {
      // First session: June 15
      const registrationDeadline = new Date(currentYear, 2, 6); // March 6th

      return {
        nextDate: june15.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: now < registrationDeadline,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    }
    // Check if we're before November 9
    else if (currentMonth < 10 || (currentMonth === 10 && currentDate < 9)) {
      // Second session: November 9
      const registrationDeadline = new Date(currentYear, 6, 31); // July 31st

      return {
        nextDate: november9.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: now < registrationDeadline,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    }
    // Past November 9, next year's first session
    else {
      const nextJune15 = new Date(currentYear + 1, 5, 15); // Next year June 15th
      const registrationDeadline = new Date(currentYear + 1, 2, 6); // Next year March 6th

      return {
        nextDate: nextJune15.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: true,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    }
  }

  // For A-Levels (May and October)
  if (schedule.name === "A-Levels") {
    if (currentMonth < 4) {
      // Before May
      const testDate = new Date(currentYear, 4, 1); // May 1st
      const registrationDeadline = new Date(testDate);
      registrationDeadline.setDate(
        testDate.getDate() - schedule.registrationLeadTime
      );

      return {
        nextDate: testDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: true,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    } else if (currentMonth < 9) {
      // Before October
      const testDate = new Date(currentYear, 9, 1); // October 1st
      const registrationDeadline = new Date(testDate);
      registrationDeadline.setDate(
        testDate.getDate() - schedule.registrationLeadTime
      );

      return {
        nextDate: testDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: true,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    } else {
      // Past October, next year May
      const testDate = new Date(currentYear + 1, 4, 1); // Next year May 1st
      const registrationDeadline = new Date(testDate);
      registrationDeadline.setDate(
        testDate.getDate() - schedule.registrationLeadTime
      );

      return {
        nextDate: testDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isAvailable: true,
        registrationDeadline: registrationDeadline.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        notes: schedule.notes,
      };
    }
  }

  return {
    nextDate: "Contact Test Center",
    isAvailable: false,
    notes: "Schedule not available",
  };
}

/**
 * Convert schedule day description to actual day number
 */
function getDayNumberFromSchedule(
  scheduleDay: string,
  month: number,
  year: number
): number {
  if (scheduleDay.includes("1st")) return 1;
  if (scheduleDay.includes("2nd")) return 2;
  if (scheduleDay.includes("3rd")) return 3;
  if (scheduleDay.includes("4th")) return 4;

  // For weekend tests, find first Saturday/Sunday of the month
  if (scheduleDay.includes("Saturday")) {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 6 ? 1 : 7 - firstDay + 1;
  }
  if (scheduleDay.includes("Sunday")) {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 1 : 8 - firstDay;
  }

  return 1; // Default to 1st of month
}

/**
 * Get all available exam schedules
 */
export function getAllExamSchedules(): ExamSchedule[] {
  return examSchedules;
}

/**
 * Check if an exam is currently in registration period
 */
export function isRegistrationOpen(examName: string): boolean {
  const testDateInfo = getRealisticTestDate(examName);
  if (!testDateInfo.registrationDeadline) return true;

  const deadline = new Date(testDateInfo.registrationDeadline);
  const now = new Date();

  return now < deadline;
}
