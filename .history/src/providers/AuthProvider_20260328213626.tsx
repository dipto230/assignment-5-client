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

  // ✅ refresh token if expired (cookies are handled by the server now)
  const refreshToken = async () => {
    try {
      if (typeof window === "undefined") return false;

      // With cookie-based auth, credentials are automatically included
      const res = await apiClient.post("/auth/refresh-token", {});

      // Response will contain new tokens set in cookies server-side
      return true;
    } catch {
      return false;
    }
  };


  const initAuth = async () => {
    setLoading(true);

    try {
      // Try to fetch user info (cookies should be included automatically)
      await fetchUser();
    } catch (err) {
      console.log("❌ Initial fetch failed, trying token refresh...", err);
      // If fetch fails, try to refresh token first
      try {
        const refreshed = await refreshToken();
        if (refreshed) {
          console.log("✅ Token refreshed, fetching user...");
          await fetchUser();
        } else {
          console.log("❌ Token refresh failed");
          setUser(null);
        }
      } catch (refreshErr) {
        console.log("❌ Refresh also failed", refreshErr);
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
    // Cookies are cleared server-side on logout
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