import { z } from "zod";

export const registrerSchema = z.object({
  username: z.string({
    message: "Username expected string, received number",
  }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = z.object({
  email: z
    .string({ requiered_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({
      requiered_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" }),
});
