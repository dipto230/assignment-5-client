"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { cookies } from "next/headers"; // 🔥 ADD THIS

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

    // 🔥 ADD THIS BLOCK
    const { user, accessToken, refreshToken } = response.data;

    const cookieStore = await cookies();

    if (accessToken) {
      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }
    // 🔥 END

    const { role, emailVerified, needPasswordChange, email } = user;

    if (!emailVerified) {
      redirect(`/verify-email?email=${email}`);
    }

    if (needPasswordChange) {
      redirect(`/reset-password?email=${email}`);
    }

    const targetPath =
      redirectPath &&
      isValidRedirectForRole(redirectPath, role as UserRole)
        ? redirectPath
        : getDefaultDashboardRoute(role as UserRole);

    redirect(targetPath);
  } catch (error: any) {
    console.log(error);

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
      message: `Registration failed: ${error.message}`,
    };
  }
};