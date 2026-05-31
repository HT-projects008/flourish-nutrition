import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

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
      html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><hr/><p>${data.message.replace(/\n/g, "<br/>")}</p>`,
    });
    return { success: true };
  });
