import { use } from "react";
import { UniversityDetails } from "@/components/UniversityDetails";

export default function UniversityDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const universityId = resolvedParams.id;

  return <UniversityDetails universityId={universityId} />;
}