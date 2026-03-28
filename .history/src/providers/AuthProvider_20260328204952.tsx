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
      const res = await apiClient.get("/auth/me");
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  // ✅ refresh token if expired
  const refreshToken = async () => {
    try {
      if (typeof window === "undefined") return false;

      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) return false;

      const res = await apiClient.post("/auth/refresh-token", {
        refreshToken: storedRefreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = res.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      return true;
    } catch {
      return false;
    }
  };


  const initAuth = async () => {
    setLoading(true);

  
    if (typeof window !== "undefined" && !localStorage.getItem("accessToken")) {
      setLoading(false);
      return;
    }

    try {
      await fetchUser();
    } catch {
      const refreshed = await refreshToken();
      if (refreshed) {
        await fetchUser();
      } else {
        // refresh ও fail হলে সব clear করো
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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
      await apiClient.post("/auth/logout", {});
    } catch (err) {
      console.error("Logout failed:", err);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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