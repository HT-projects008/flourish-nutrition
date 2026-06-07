import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  requestType: z.string().trim().min(1).max(100),
  orderNumber: z.string().trim().max(50).optional(),
  message: z.string().trim().min(1).max(5000),
});

const escHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const orderLine = data.orderNumber ? `\nOrder #: ${data.orderNumber}` : "";
    const orderLineHtml = data.orderNumber
      ? `<p><strong>Order #:</strong> ${escHtml(data.orderNumber)}</p>`
      : "";
    await resend.emails.send({
      from: "Flourish <onboarding@resend.dev>",
      to: "hello@flourishdrink.co.uk",
      replyTo: data.email,
      subject: `[${data.requestType}] New message from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nTopic: ${data.requestType}${orderLine}\n\nMessage:\n${data.message}`,
      html: `<p><strong>Name:</strong> ${escHtml(data.name)}</p><p><strong>Email:</strong> ${escHtml(data.email)}</p><p><strong>Topic:</strong> ${escHtml(data.requestType)}</p>${orderLineHtml}<hr/><p>${escHtml(data.message).replace(/\n/g, "<br/>")}</p>`,
    });
    return { success: true };
  });
