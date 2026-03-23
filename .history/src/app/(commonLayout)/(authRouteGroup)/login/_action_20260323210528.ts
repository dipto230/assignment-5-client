"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { redirect } from "next/navigation";
import { loginZodSchema, ILoginPayload } from "@/zod/auth.validation";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";

export const loginAction = async (
  payload: ILoginPayload,
  redirectPath?: string
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsed = loginZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0].message,
    };
  }

  try {
    const response = await httpClient.post("/auth/login", parsed.data);

    // 🔥 tor backend format
    const { token, accessToken, refreshToken, user } = response.data;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token, 86400);

    if (!user.emailVerified) {
      redirect(`/verify-email?email=${user.email}`);
    }

    if (user.needPasswordChange) {
      redirect(`/reset-password?email=${user.email}`);
    }

    redirect(redirectPath || "/dashboard");
  } catch (error: any) {
    if (error?.response?.data?.message === "Email not verified") {
      redirect(`/verify-email?email=${payload.email}`);
    }

    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};