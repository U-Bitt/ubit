import { ScholarshipDetails } from "@/components/ScholarshipDetails";
import { useRouter } from "next/router";

export default function ScholarshipDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  // Show loading while router is not ready or id is not available
  if (!router.isReady || !id) {
    return <div>Loading...</div>;
  }

  // Ensure id is a string and not undefined
  const scholarshipId = Array.isArray(id) ? id[0] : id;

  // Don't render the component if scholarshipId is undefined
  if (!scholarshipId) {
    return <div>Loading...</div>;
  }

  return <ScholarshipDetails scholarshipId={scholarshipId} />;
}