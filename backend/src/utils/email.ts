import nodemailer from "nodemailer";
import { config } from "@/config";
import { logger } from "./logger";

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: config.email.smtp.host,
    port: config.email.smtp.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.email.smtp.user,
      pass: config.email.smtp.pass,
    },
  });
};

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Ubit Education" <${config.email.smtp.user}>`,
      to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully", { messageId: info.messageId });
    return true;
  } catch (error) {
    logger.error("Failed to send email", error);
    return false;
  }
};

// Email templates
export const emailTemplates = {
  welcome: (firstName: string) => ({
    subject: "Welcome to Ubit Education!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Ubit Education, ${firstName}!</h2>
        <p>Thank you for joining our platform. We're excited to help you with your educational journey.</p>
        <p>You can now explore universities, exams, and packages to find the perfect fit for your goals.</p>
        <p>Best regards,<br>The Ubit Team</p>
      </div>
    `,
  }),

  passwordReset: (firstName: string, resetLink: string) => ({
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hello ${firstName},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The Ubit Team</p>
      </div>
    `,
  }),

  emailVerification: (firstName: string, verificationLink: string) => ({
    subject: "Verify Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email Address</h2>
        <p>Hello ${firstName},</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Ubit Team</p>
      </div>
    `,
  }),
};
