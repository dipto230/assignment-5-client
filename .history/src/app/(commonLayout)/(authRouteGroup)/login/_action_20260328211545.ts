/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const loginAction = async (payload : ILoginPayload, redirectPath ?: string ) : Promise<ILoginResponse | ApiErrorResponse> =>{
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

        const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data);
        console.log("🔹 Backend response:", response.data);
        const { accessToken, refreshToken, token, user} = response.data;
        const {role,  needPasswordChange, email} = user;
        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
        
        // Return user data and success status (don't redirect yet)
        // Redirect will be handled client-side so AuthProvider can update state
        return {
            success: true,
            user,
            role,
            needPasswordChange,
            email,
            redirectPath: needPasswordChange 
                ? `/reset-password?email=${email}`
                : (redirectPath && isValidRedirectForRole(redirectPath, role as UserRole) 
                    ? redirectPath 
                    : getDefaultDashboardRoute(role as UserRole))
        };
        
    } catch (error : any) {
        console.log(error, "error");
        if(error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")){
            throw error;
        }

        if (error && error.response && error.response.data.message === "Email not verified") {
            return {
                success: false,
                message: "Email not verified",
                emailNotVerified: true,
                email: payload.email
            };
        }
        return {
            success: false,
            message: `Login failed: ${error.message}`,
        }
    }
}