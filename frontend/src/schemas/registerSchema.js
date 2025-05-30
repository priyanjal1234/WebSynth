import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  agreeToTerms: z
    .literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) }),
});

export default registerSchema;
