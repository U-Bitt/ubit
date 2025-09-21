import { VisaDetail } from "@/components/VisaDetail";
import { useRouter } from "next/router";

const VisaDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return <VisaDetail visaId={id} />;
};

export default VisaDetailPage;