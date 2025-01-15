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
    confirmPassword: z.string().min(1, {
      message: "Required",
    }),
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

export const feedbackSchema = z.object({
  folderName: z.string().min(1, "Required"),
  authorName: z.string().optional(),
  feedbackTitle: z.string().optional(),
  feedbackContent: z.string().optional(),
  rating: z.number().optional(),
});
