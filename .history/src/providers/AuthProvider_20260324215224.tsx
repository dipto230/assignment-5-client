"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: "ADMIN" | "SUPER_ADMIN" | "LAWYER" | "USER";
  image?: string;
  client?: {
    contactNumber?: string;
    address?: string;
    appointments?: unknown[];
    legalDocuments?: unknown[];
    consultationNotes?: unknown[];
    profile?: unknown;
  };
};

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

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("GLOBAL USER 👉", json?.data);
        setUser(json?.data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};