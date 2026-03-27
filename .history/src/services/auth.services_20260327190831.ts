"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

/**
 * Refresh accessToken and session token
 */
export async function getNewTokensWithRefreshToken(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include", // ✅ auto cookie send
    });

    if (!res.ok) {
      console.error("Refresh token request failed:", res.status);
      return false;
    }

    const { data } = await res.json();

    const { accessToken, refreshToken, token } = data;

    // ✅ optionally set cookies again (server side)
    if (accessToken) {
      setTokenInCookies("accessToken", accessToken);
    }

    if (refreshToken) {
      setTokenInCookies("refreshToken", refreshToken);
    }

    if (token) {
      setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

/**
 * Get current user info
 */
export async function getUserInfo() {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      credentials: "include", // ✅ auto cookie send
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status);
      return null;
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}