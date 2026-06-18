import { z } from "zod";

export const urlSchema = z.object({
  originalUrl: z
    .string()
    .min(1, "URL is required")
    .url()
    .refine((val) => /^https?:\/\//.test(val), {
      message: "URL must start with http or https",
    }),
});
