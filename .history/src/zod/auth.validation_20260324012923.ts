
import { z } from "zod";

/**
 * =========================
 * 🔐 LOGIN VALIDATION (UNCHANGED ✅)
 * =========================
 */
export const loginZodSchema = z.object({
  email: z.email("Invalid email address"), // ✅ same as yours
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;


/**
 * =========================
 * 📝 REGISTER VALIDATION
 * =========================
 */
export const registerZodSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

export type IRegisterPayload = z.infer<typeof registerZodSchema>;


/**
 * =========================
 * 📧 VERIFY EMAIL (OTP)
 * =========================
 */
export const verifyEmailZodSchema = z.object({
  email: z.string().email("Invalid email"),

  otp: z
    .string()
    .min(4, "OTP must be at least 4 digits")
    .max(6, "OTP must be at most 6 digits"),
});

export type IVerifyEmailPayload = z.infer<typeof verifyEmailZodSchema>;


/**
 * =========================
 * 🔑 FORGET PASSWORD
 * =========================
 */
export const forgetPasswordZodSchema = z.object({
  email: z.string().email("Invalid email"),
});

export type IForgetPasswordPayload = z.infer<
  typeof forgetPasswordZodSchema
>;


/**
 * =========================
 * 🔄 RESET PASSWORD
 * =========================
 */
export const resetPasswordZodSchema = z.object({
  email: z.string().email("Invalid email"),

  otp: z
    .string()
    .min(4, "OTP must be at least 4 digits")
    .max(6, "OTP must be at most 6 digits"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

export type IResetPasswordPayload = z.infer<
  typeof resetPasswordZodSchema
>;


/**
 * =========================
 * 🔒 CHANGE PASSWORD
 * =========================
 */
export const changePasswordZodSchema = z.object({
  currentPassword: z.string().min(8, "Invalid current password"),

  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters long"),
});

export type IChangePasswordPayload = z.infer<
  typeof changePasswordZodSchema
>;