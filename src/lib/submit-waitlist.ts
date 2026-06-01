import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "./supabase";

const schema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address." }).max(254),
  source: z.enum(["homepage", "waitlist-page", "footer"]).default("waitlist-page"),
});

export type WaitlistResult =
  | { success: true }
  | { success: false; error: string; code: "DUPLICATE" | "ERROR" };

export const submitWaitlist = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }): Promise<WaitlistResult> => {
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: data.email.toLowerCase().trim(), source: data.source });

    if (error) {
      if (error.code === "23505") {
        return {
          success: false,
          error: "You're already on the list! We'll be in touch soon.",
          code: "DUPLICATE",
        };
      }
      return { success: false, error: "Something went wrong. Please try again.", code: "ERROR" };
    }

    return { success: true };
  });
