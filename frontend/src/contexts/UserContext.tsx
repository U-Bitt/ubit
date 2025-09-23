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
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // Try to get the first user from the database
          try {
            const users = await userApi.getAll();
            if (users && users.length > 0) {
              const firstUser = users[0];
              // Ensure the user has a valid ID
              if (firstUser.id) {
                setUser(firstUser);
                localStorage.setItem('user', JSON.stringify(firstUser));
              } else {
                // If user doesn't have ID, use the first user's ID
                const userWithId = { ...firstUser, id: (firstUser as { _id?: string; id?: string })._id || firstUser.id };
                setUser(userWithId);
                localStorage.setItem('user', JSON.stringify(userWithId));
              }
            } else {
              // Fallback to default user if no users in database
              const defaultUser: User = {
                id: 'default_user_id',
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
              localStorage.setItem('user', JSON.stringify(defaultUser));
            }
          } catch (error) {
            console.error('Error loading user from API:', error);
            // Fallback to default user
            const defaultUser: User = {
              id: 'default_user_id',
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
            localStorage.setItem('user', JSON.stringify(defaultUser));
          }
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
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
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
      localStorage.setItem('user', JSON.stringify(apiUser));
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