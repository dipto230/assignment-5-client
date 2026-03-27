import { cookies } from "next/headers";
import { setTokenInCookies } from "@/lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

/**
 * 👉 helper to build cookie header
 */
function getCookieHeader() {
  const cookieStore = cookies();

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

/**
 * Refresh accessToken and session token (SERVER SAFE)
 */
export async function getNewTokensWithRefreshToken(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: getCookieHeader(), // ✅ manually send cookie
      },
    });

    if (!res.ok) {
      console.error("Refresh token request failed:", res.status);
      return false;
    }

    const { data } = await res.json();

    const { accessToken, refreshToken, token } = data;

    // ✅ set cookies again (server-side)
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
 * Get current user info (SERVER SAFE)
 */
export async function getUserInfo() {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: getCookieHeader(), // ✅ important
      },
      cache: "no-store",
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
