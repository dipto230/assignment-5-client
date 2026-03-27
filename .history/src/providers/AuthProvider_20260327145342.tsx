"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  // ✅ logout function
  const logout = async () => {
    try {
      await fetch("https://assignment-5-backend-nine.vercel.app/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      router.replace("/login"); // redirect after logout
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      console.log("🚀 FETCH START");

      try {
        const res = await fetch("https://assignment-5-backend-nine.vercel.app/api/v1/auth/me", {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });

        console.log("✅ RESPONSE:", res.status);

        if (!res.ok) {
          setUser(null);
          return;
        }

        const json = await res.json();
        console.log("👤 USER DATA:", json);

        setUser(json.data || null);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("❌ FETCH ERROR:", err);
          setUser(null);
        }
      } finally {
        console.log("⏳ SET LOADING FALSE");
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};