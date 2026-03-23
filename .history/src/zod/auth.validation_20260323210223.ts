import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;