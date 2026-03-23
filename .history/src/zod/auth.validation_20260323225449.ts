import { z } from "zod"


export const loginZodSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
    .min(8, "Password must be at least 8 characters long")
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    //   "Password must contain uppercase, lowercase, number, and special character"
    // )
})

export type ILoginPayload = z.infer<typeof loginZodSchema>


export const registerZodSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long"),

  email: z.string().email("Invalid email address"),


  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),


})

export type IRegisterPayload = z.infer<typeof registerZodSchema>;