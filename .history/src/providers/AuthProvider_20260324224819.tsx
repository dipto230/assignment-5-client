"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = any;

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/auth/me", {
          method: "GET",
          credentials: "include", // 🔥 VERY IMPORTANT
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const json = await res.json();
        console.log("USER DATA:", json);

        setUser(json.data || null);
      } catch (err) {
        console.error("FETCH USER ERROR:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};