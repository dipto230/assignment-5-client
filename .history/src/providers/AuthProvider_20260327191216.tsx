"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo, getNewTokensWithRefreshToken } from "@/services/auth.services";

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
    const fetchUser = async () => {
      try {
        // ❌ cookie read korbo na ekhane
        // browser automatically cookie pathabe

        // OPTIONAL: try refresh (backend handle korbe)
        await getNewTokensWithRefreshToken();

        // user fetch
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
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};