'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  isArtisan: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, isArtisan: boolean) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: { name?: string; currentPassword?: string; newPassword?: string }) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users for demo purposes
  const mockUsers = [
    {
      id: '1',
      name: 'Demo User',
      email: 'user@example.com',
      password: 'password',
      isArtisan: false
    },
    {
      id: '2',
      name: 'Demo Artisan',
      email: 'artisan@example.com',
      password: 'password',
      isArtisan: true
    }
  ];

  // Check for existing session on load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    // Simulate network delay for demo purposes
    setTimeout(checkAuth, 500);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  // Mock register function
  const register = async (name: string, email: string, password: string, isArtisan: boolean): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          resolve(false);
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
          isArtisan
        };
        
        // In a real app, this would be saved to a database
        mockUsers.push(newUser);
        
        // Set current user (without password)
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        resolve(true);
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update profile function
  const updateProfile = async (data: { name?: string; currentPassword?: string; newPassword?: string }): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          resolve(false);
          return;
        }
        
        // Update user data
        if (data.name) {
          const updatedUser = { ...user, name: data.name };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        // In a real app, password change would be handled by the backend
        // with proper authentication
        
        resolve(true);
      }, 800);
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}