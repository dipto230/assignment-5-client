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