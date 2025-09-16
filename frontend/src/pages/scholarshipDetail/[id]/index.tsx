import { ScholarshipDetails } from "@/components/ScholarshipDetails";
import { useRouter } from "next/router";

export default function ScholarshipDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  // Show loading while router is not ready or id is not available
  if (!router.isReady || !id) {
    return <div>Loading...</div>;
  }

  return <ScholarshipDetails scholarshipId={id as string} />;
}