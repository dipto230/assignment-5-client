"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // ✅ fetch user info from backend
  const fetchUser = async () => {
    try {
      const res = await apiClient.get("/auth/me");
      console.log("✅ User data received from /auth/me:", res.data.data);
      setUser(res.data.data);
    } catch (err: any) {
      console.log("❌ fetchUser failed:", err?.response?.status);
      setUser(null);
      throw err; // Re-throw so caller knows it failed
    }
  };

  // ✅ refresh token if expired
  const refreshToken = async () => {
    try {
      if (typeof window === "undefined") return false;

      console.log("🔄 Attempting to refresh token...");
      
      const refreshTokenValue = localStorage.getItem("refreshToken");
      if (!refreshTokenValue) {
        console.log("❌ No refresh token found in localStorage");
        return false;
      }

      console.log("📤 Sending refresh token to backend...");
      
      // Send refresh token to backend
      const res = await apiClient.post("/auth/refresh-token", {
        refreshToken: refreshTokenValue
      });

      console.log("✅ Token refreshed successfully, response:", res.data);
      
      // Extract new tokens from response - try different response structures
      const newAccessToken = res.data?.data?.accessToken || res.data?.accessToken;
      const newRefreshToken = res.data?.data?.refreshToken || res.data?.refreshToken;
      
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        console.log("✅ New access token stored in localStorage");
      } else {
        console.log("⚠️ No new access token in refresh response:", res.data);
      }
      
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
        console.log("✅ New refresh token stored in localStorage");
      }
      
      return !!newAccessToken;
    } catch (err: any) {
      console.log("❌ Token refresh failed:", err?.response?.status, err?.message);
      console.log("   Response data:", err?.response?.data);
      return false;
    }
  };


  const initAuth = async () => {
    setLoading(true);

    try {
      // First, check if tokens exist in localStorage (from previous login)
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.log("❌ No token in localStorage - clearing user");
          setUser(null);
          setLoading(false);
          return;
        }
        console.log("✅ Found token in localStorage, restoring session...");
      }

      // Try to fetch user info
      console.log("🔄 Fetching user info with token...");
      await fetchUser();
      console.log("✅ User fetched successfully from /auth/me");
    } catch (err: any) {
      console.log("❌ Fetch failed:", err?.response?.status, err?.message);
      
      // Token might be expired, try to refresh
      try {
        console.log("🔄 Token might be expired (401), attempting refresh...");
        const refreshed = await refreshToken();
        if (refreshed) {
          console.log("✅ Token refreshed successfully, trying to fetch user again...");
          await fetchUser();
          console.log("✅ User fetched after refresh");
        } else {
          console.log("❌ Refresh returned false, clearing auth...");
          setUser(null);
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        }
      } catch (refreshErr: any) {
        console.log("❌ Refresh failed with error:", refreshErr?.response?.status, refreshErr?.message);
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
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
    console.log("🚪 Starting logout...");
    
    // Clear client-side storage FIRST
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log("✅ Tokens removed from localStorage");
    }
    
    // Clear user state
    setUser(null);
    console.log("✅ User state cleared");
    
    // Call logout endpoint (optional, doesn't block)
    try {
      await apiClient.post("/auth/logout", {});
      console.log("✅ Logout endpoint called successfully");
    } catch (err: any) {
      console.log("⚠️ Logout endpoint failed (non-blocking):", err?.response?.status);
    }
    
    // Redirect to login
    console.log("🔄 Redirecting to /login...");
    router.push("/login");
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