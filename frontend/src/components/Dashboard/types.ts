// Application related types
export interface Application {
  id: number;
  image: string;
  university: string;
  program: string;
  ranking: number;
  status: string;
  location: string;
  tuition: string;
  acceptance: string;
  deadline: string;
  progress: number;
  description: string;
  requirements: string[];
  documents: Document[];
  milestones: Milestone[];
  website: string;
}

export interface Document {
  name: string;
  status: string;
  required: boolean;
}

export interface Milestone {
  title: string;
  date: string;
  completed: boolean;
}

// Exam related types
export interface Exam {
  id: number;
  exam: string;
  fullName: string;
  status: string;
  daysLeft: number;
  date: string;
  location: string;
  duration: string;
  registrationId?: string;
  progress: number;
  score?: string;
  target: string;
  sections: Section[];
  practiceTests: PracticeTest[];
  studyPlan: StudyTopic[];
  resources: Resource[];
}

export interface Section {
  name: string;
  score?: number;
  target: number;
  progress: number;
  status: string;
}

export interface PracticeTest {
  name: string;
  score: number;
  date: string;
  status: string;
  improvement?: string;
}

export interface StudyTopic {
  topic: string;
  progress: number;
  priority: string;
  status: string;
}

export interface Resource {
  name: string;
  type: string;
  url: string;
  status: string;
}

// University related types
export interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  tuition: string;
  acceptance: string;
  deadline: string;
  image: string;
  programs: string[];
}

// Scholarship related types
export interface Scholarship {
  id: number;
  title: string;
  amount: string;
  deadline: string;
  daysLeft: number;
  match: number;
  applied: boolean;
}

// Task related types
export interface Task {
  task: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

export interface Deadline {
  id: number;
  title: string;
  deadline: string;
  daysLeft: number;
  priority: string;
  type: string;
}

import { LucideIcon } from "lucide-react";

export interface ActivityItem {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
}

// Stats related types
export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface QuickAction {
  label: string;
  icon: LucideIcon;
  action: string;
  color: string;
}
