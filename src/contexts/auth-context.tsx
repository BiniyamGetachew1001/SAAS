"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define user type
type User = {
  id: string;
  username: string;
  role: "user" | "admin";
};

// Define context type
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
});

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: "1",
    username: "admin",
    password: "admin123", // In a real app, passwords would be hashed
    role: "admin" as const,
  },
  {
    id: "2",
    username: "user",
    password: "user123",
    role: "user" as const,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user with matching credentials
    const matchedUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (matchedUser) {
      // Create user object without password
      const { password, ...userWithoutPassword } = matchedUser;
      setUser(userWithoutPassword);
      
      // Store in localStorage (in a real app, you'd use cookies or tokens)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
