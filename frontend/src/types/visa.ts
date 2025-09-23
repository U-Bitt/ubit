export interface Visa {
  id: string;
  country: string;
  type: string;
  processingTime: string;
  cost: string;
  validity: string;
  requirements: string[];
  documents: string[];
  officialWebsite: string;
  description: string;
  eligibility: string[];
  restrictions: string[];
  benefits: string[];
  workRights?: string;
  studyRights?: string;
  familyRights?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
