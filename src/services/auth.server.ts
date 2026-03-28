"use server";

import { cookies } from "next/headers";
import { setTokenInCookies } from "@/lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// ✅ make async
async function getCookieHeader() {
  const cookieStore = await cookies(); 

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

export async function getNewTokensWithRefreshToken(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: await getCookieHeader(),
        "Content-Type": "application/json", 
      },
      credentials: "include", 
    });

    if (!res.ok) {
      console.error("Refresh token request failed:", res.status);
      return false;
    }

    const { data } = await res.json();
    const { accessToken, refreshToken } = data;

    if (accessToken) await setTokenInCookies("accessToken", accessToken);
    if (refreshToken) await setTokenInCookies("refreshToken", refreshToken);

    return true;
  } catch (err) {
    console.error("getNewTokensWithRefreshToken error:", err);
    return false;
  }
}

export async function getUserInfo() {
  try {
    console.log("🔹 Fetching user info from backend...");
    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: await getCookieHeader(),
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status);
      throw new Error("Failed to fetch user");
    }

    const { data } = await res.json();

    console.log("🔹 User info data:", data);
    return data;
  } catch (error) {
    console.error("Server getUserInfo error:", error);
    return null;
  }
}