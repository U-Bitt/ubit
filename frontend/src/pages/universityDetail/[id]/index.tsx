import { UniversityDetails } from "@/components/UniversityDetails";
import { useRouter } from "next/router";

export default function UniversityDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  // Show loading while router is not ready or id is not available
  if (!router.isReady || !id) {
    return <div>Loading...</div>;
  }

  return <UniversityDetails universityId={id as string} />;
}