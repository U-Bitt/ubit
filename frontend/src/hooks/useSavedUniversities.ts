import { useState, useEffect } from 'react';

export const useSavedUniversities = () => {
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);

  // Load saved universities from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedUniversities');
    if (saved) {
      try {
        setSavedUniversities(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved universities:', error);
        setSavedUniversities([]);
      }
    }
  }, []);

  // Save to localStorage whenever savedUniversities changes
  useEffect(() => {
    localStorage.setItem('savedUniversities', JSON.stringify(savedUniversities));
  }, [savedUniversities]);

  const toggleSave = (universityId: string) => {
    setSavedUniversities(prev => {
      if (prev.includes(universityId)) {
        return prev.filter(id => id !== universityId);
      } else {
        return [...prev, universityId];
      }
    });
  };

  const isSaved = (universityId: string) => {
    return savedUniversities.includes(universityId);
  };

  const clearAll = () => {
    setSavedUniversities([]);
  };

  return {
    savedUniversities,
    toggleSave,
    isSaved,
    clearAll
  };
};