"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";

type User = any;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  refetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ fetch user info from backend
  const fetchUser = async () => {
    try {
      const res = await apiClient.get("/auth/me", {
        withCredentials: true, 
      });
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  // ✅ refresh token if expired
  const refreshToken = async () => {
    try {
      await apiClient.post(
        "/auth/refresh-token",
        {},
        {
          withCredentials: true, 
        }
      );
      return true;
    } catch {
      return false;
    }
  };

  // ✅ initialize authentication
  const initAuth = async () => {
    setLoading(true);

    try {
      await fetchUser();
    } catch {
      // if fetching user fails, try refreshing token
      const refreshed = await refreshToken();

      if (refreshed) {
        await fetchUser();
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  // ✅ logout user
  const logout = async () => {
    try {
      await apiClient.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, refetchUser: fetchUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};