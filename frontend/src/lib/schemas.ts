import z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email().min(1).max(255),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters",
      })
      .max(255),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email().min(1).max(255),
  password: z
    .string()
    .min(1, {
      message: "Required",
    })
    .max(255),
});
