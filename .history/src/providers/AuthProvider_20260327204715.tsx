// file: context/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo, getNewTokensWithRefreshToken } from "@/services/auth.services";
import { cookies } from "next/headers";
import { isTokenExpiringSoon } from "@/lib/tokenUtils";

type User = any;

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Logout function
  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      router.replace("/login");
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        // Get cookies from browser
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        const refreshToken = cookieStore.get("refreshToken")?.value;

        // Refresh token if expiring
        if (accessToken && refreshToken) {
          const expiring = await isTokenExpiringSoon(accessToken);
          if (expiring) {
            await getNewTokensWithRefreshToken(refreshToken);
          }
        }

        // Fetch current user
        const data = await getUserInfo();
        setUser(data || null);
      } catch (error) {
        console.error("Fetch user error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};