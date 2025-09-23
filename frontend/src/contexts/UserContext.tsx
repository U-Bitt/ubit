"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userApi, User as ApiUser } from '@/utils/api';

interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  avatar?: string;
  personalInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    nationality?: string;
  };
  academicInfo?: {
    gpa?: number;
    highSchoolName?: string;
    graduationYear?: number;
    intendedMajors?: string[];
  };
  areasOfInterest?: string[];
  savedUniversities?: Array<{
    id: string;
    universityId: string;
    universityName: string;
    savedAt: string;
    notes?: string;
  }>;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
  loadUser: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId) {
          const storedUser = localStorage.getItem(`user_${currentUserId}`);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoading(false);
            return;
          }
        }
        
        // Fallback to default user
        const defaultUser: User = {
          id: '68d24c510a783721f2e82368', // John Doe's ID from backend
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+97612345678',
          dateOfBirth: '1995-01-15',
          nationality: 'Mongolian',
          personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+97612345678',
            dateOfBirth: '1995-01-15',
            nationality: 'Mongolian',
          },
          academicInfo: {
            gpa: 3.8,
            highSchoolName: 'Ulaanbaatar International School',
            graduationYear: 2024,
            intendedMajors: ['Computer Science'],
          },
          areasOfInterest: ['Programming', 'Machine Learning', 'Web Development', 'Mobile Apps'],
        };
        setUser(defaultUser);
        if (defaultUser.id) {
          localStorage.setItem('currentUserId', defaultUser.id);
        }
        if (defaultUser.id) {
        localStorage.setItem(`user_${defaultUser.id}`, JSON.stringify(defaultUser));
      }

      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem('currentUserId', user.id);
      localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (updates: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      return { ...prevUser, ...updates };
    });
  };

  const loadUser = async (userId: string) => {
    try {
      setIsLoading(true);
      const apiUser = await userApi.getById(userId);
      setUser(apiUser);
      localStorage.setItem('currentUserId', userId);
      localStorage.setItem(`user_${userId}`, JSON.stringify(apiUser));
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: UserContextType = {
    user,
    setUser,
    updateUser,
    isLoading,
    loadUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};