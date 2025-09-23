import { Universities } from "@/components/Universities";
import { useUser } from "@/contexts/UserContext";

const UniversitiesPage = () => {
  const { user } = useUser();
  
  return (
    <div className="w-full min-h-screen">
      <Universities key={user?.id || 'no-user'} />
    </div>
  );
};

export default UniversitiesPage;