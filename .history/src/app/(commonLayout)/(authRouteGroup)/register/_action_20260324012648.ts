"use server";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import {
  IRegisterPayload,
  registerZodSchema,
} from "@/zod/auth.validation";
import { redirect } from "next/navigation";
import { IRegisterResponse } from "@/types/auth.types";

export const registerAction = async (
  payload: IRegisterPayload,
  redirectPath?: string
): Promise<{ success: boolean; message?: string } | ApiErrorResponse> => {
  
  const parsedPayload = registerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message,
    };
  }

  try {
    const response = await httpClient.post<IRegisterResponse>(
      "/auth/register",
      parsedPayload.data
    );

    const { user } = response.data;
    const { role, emailVerified, needPasswordChange, email } = user;

    // ✅ Email যাচাই না থাকলে
    if (!emailVerified) {
      redirect(`/verify-email?email=${email}`);
    }

    // ✅ Force password change
    if (needPasswordChange) {
      redirect(`/reset-password?email=${email}`);
    }

    // ✅ Role based redirect
    const targetPath =
      redirectPath &&
      isValidRedirectForRole(redirectPath, role as UserRole)
        ? redirectPath
        : getDefaultDashboardRoute(role as UserRole);

    redirect(targetPath);
  } catch (error: any) {
    // ⚠️ MUST for Next redirect
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Registration failed",
    };
  }
};