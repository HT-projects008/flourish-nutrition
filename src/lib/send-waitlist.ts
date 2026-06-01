import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email().max(254),
});

export const sendWaitlistEmail = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Flourish <onboarding@resend.dev>",
      to: "henrytaylor.projects@gmail.com",
      subject: "New waitlist signup",
      text: `New waitlist signup:\n\n${data.email}`,
      html: `<p>New waitlist signup:</p><p><strong>${data.email}</strong></p>`,
    });
    return { success: true };
  });
