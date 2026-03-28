/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authUtils";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { cookies } from "next/headers";

interface LoginActionResponse {
    success: boolean;
    message?: string;
    user?: any;
    role?: string;
    needPasswordChange?: boolean;
    email?: string;
    redirectPath?: string;
    emailNotVerified?: boolean;
    accessToken?: string;
    refreshToken?: string;
}

export const loginAction = async (payload : ILoginPayload, redirectPath ?: string ) : Promise<LoginActionResponse> =>{
    const parsedPayload = loginZodSchema.safeParse(payload);

    if(!parsedPayload.success){
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        }
    }
    try {
        console.log("🔹 Sending login request with:", parsedPayload.data);

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        
        // Use fetch with credentials to allow backend to set cookies
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedPayload.data),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.message === "Email not verified") {
                return {
                    success: false,
                    message: "Email not verified",
                    emailNotVerified: true,
                    email: payload.email
                };
            }
            throw new Error(errorData.message || "Login failed");
        }

        const result = await response.json();
        console.log("🔹 Backend response:", result);
        
        const { accessToken, refreshToken, token, user} = result.data;
        const {role,  needPasswordChange, email} = user;
        
        // Set cookies in Next.js server-side storage for middleware
        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
        
        console.log("✅ Cookies set server-side");
        
        // Return tokens to client so they can be stored in localStorage as backup
        return {
            success: true,
            user,
            role,
            needPasswordChange,
            email,
            accessToken,      // Send to client for localStorage
            refreshToken,      // Send to client for localStorage
            redirectPath: needPasswordChange 
                ? `/reset-password?email=${email}`
                : (redirectPath && isValidRedirectForRole(redirectPath, role as UserRole) 
                    ? redirectPath 
                    : getDefaultDashboardRoute(role as UserRole))
        };
        
    } catch (error : any) {
        console.log("❌ Login error:", error);
        
        return {
            success: false,
            message: `Login failed: ${error.message}`,
        }
    }
}