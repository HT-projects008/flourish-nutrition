import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
});

const escHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Flourish <onboarding@resend.dev>",
      to: "henrytaylor.projects@gmail.com",
      replyTo: data.email,
      subject: `New contact message from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `<p><strong>Name:</strong> ${escHtml(data.name)}</p><p><strong>Email:</strong> ${escHtml(data.email)}</p><hr/><p>${escHtml(data.message).replace(/\n/g, "<br/>")}</p>`,
    });
    return { success: true };
  });
