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

  // ✅ fetch user
  const fetchUser = async () => {
    try {
      const res = await apiClient.get("/api/v1/auth/me");
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  // ✅ try refresh token
  const refreshToken = async () => {
    try {
      await apiClient.post("/api/v1/auth/refresh-token");
      return true;
    } catch {
      return false;
    }
  };

  // ✅ init auth
  const initAuth = async () => {
    setLoading(true);

    try {
      await fetchUser();
    } catch {
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

  // ✅ logout
  const logout = async () => {
    try {
      await apiClient.post("/api/v1/auth/logout");
    } catch {}

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};