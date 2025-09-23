import { useState, useEffect } from "react";
import { userApi } from "@/utils/api";
import { useUser } from "@/contexts/UserContext";

interface SavedUniversity {
  id: string;
  universityId: string;
  universityName: string;
  savedAt: string;
  notes?: string;
}

export const useSavedUniversities = () => {
  const { user } = useUser();
  const [savedUniversities, setSavedUniversities] = useState<SavedUniversity[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved universities from backend on mount
  useEffect(() => {
    console.log("useSavedUniversities: User changed to:", user?.id);

    // Always clear saved universities first when user changes
    console.log(
      "useSavedUniversities: Clearing saved universities immediately"
    );
    setSavedUniversities([]);
    setError(null);

    if (user?.id) {
      // Load saved universities without delay to avoid rate limiting
      loadSavedUniversities();
    } else {
      // Clear saved universities when no user is logged in
      console.log(
        "useSavedUniversities: Clearing saved universities - no user"
      );
    }
  }, [user?.id]);

  const loadSavedUniversities = async () => {
    if (!user?.id) {
      console.log("useSavedUniversities: No user ID, skipping load");
      return;
    }

    try {
      console.log(
        "useSavedUniversities: Loading saved universities for user:",
        user.id
      );
      console.log("useSavedUniversities: User object:", user);
      setLoading(true);
      setError(null);
      const saved = await userApi.getSavedUniversities(user.id);
      console.log("useSavedUniversities: API returned:", saved);
      console.log(
        "useSavedUniversities: API returned length:",
        saved?.length || 0
      );
      const mappedSaved = (saved || []).map(item => ({
        id: item.id as string,
        universityId: item.universityId as string,
        universityName: item.universityName as string,
        savedAt: item.savedAt as string,
        notes: item.notes as string | undefined,
      }));
      console.log(
        "useSavedUniversities: Mapped saved universities:",
        mappedSaved
      );
      console.log(
        "useSavedUniversities: Setting savedUniversities to:",
        mappedSaved
      );
      setSavedUniversities(mappedSaved);
    } catch (err) {
      console.error("Error loading saved universities:", err);
      setError("Failed to load saved universities");
      setSavedUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = async (
    universityId: string,
    universityName: string,
    notes?: string
  ) => {
    if (!user?.id) return;

    try {
      setError(null);

      // Check if already saved
      const existingSaved = savedUniversities.find(
        su => su.universityId === universityId
      );

      if (existingSaved) {
        // Unsave the university
        await userApi.unsaveUniversity(user.id, existingSaved.id);
        setSavedUniversities(prev =>
          prev.filter(su => su.universityId !== universityId)
        );
      } else {
        // Save the university
        const newSaved = await userApi.saveUniversity(
          user.id,
          universityId,
          universityName,
          notes
        );
        setSavedUniversities(prev => [
          ...prev,
          {
            id: newSaved.id as string,
            universityId: newSaved.universityId as string,
            universityName: newSaved.universityName as string,
            savedAt: newSaved.savedAt as string,
            notes: newSaved.notes as string | undefined,
          },
        ]);
      }
    } catch (err) {
      console.error("Error toggling saved university:", err);
      setError("Failed to update saved universities");
    }
  };

  const isSaved = (universityId: string) => {
    return savedUniversities.some(su => su.universityId === universityId);
  };

  const getSavedUniversity = (universityId: string) => {
    return savedUniversities.find(su => su.universityId === universityId);
  };

  const clearAll = async () => {
    if (!user?.id) return;

    try {
      setError(null);
      // Remove all saved universities one by one
      for (const saved of savedUniversities) {
        await userApi.unsaveUniversity(user.id, saved.id);
      }
      setSavedUniversities([]);
    } catch (err) {
      console.error("Error clearing saved universities:", err);
      setError("Failed to clear saved universities");
    }
  };

  const clearState = () => {
    setSavedUniversities([]);
    setError(null);
  };

  const forceRefresh = () => {
    if (user?.id) {
      loadSavedUniversities();
    }
  };

  return {
    savedUniversities,
    loading,
    error,
    toggleSave,
    isSaved,
    getSavedUniversity,
    clearAll,
    clearState,
    refresh: loadSavedUniversities,
    forceRefresh,
  };
};
