import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { DefaultSession, User as NextAuthUser } from "next-auth";
import nodemailer from "nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import type { Provider } from "next-auth/providers";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationRequest = async ({ identifier: email, url }: { identifier: string; url: string }) => {
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Sign in to Speedisha",
      html: `
        <body style="background: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #333; text-align: center; margin-bottom: 30px;">Welcome to Speedisha!</h1>
            <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px; text-align: center;">
              Click the button below to sign in to your account.
            </p>
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="${url}" 
                 style="background: #0070f3; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: 500;
                        display: inline-block;">
                Sign in to Speedisha
              </a>
            </div>
            <p style="color: #999; font-size: 14px; text-align: center; margin-bottom: 0;">
              If you didn't request this email, you can safely ignore it.
            </p>
          </div>
        </body>
      `,
    });

    console.log('Verification email sent:', result.messageId);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

const emailProvider = {
  id: "email",
  type: "email",
  name: "Email",
  server: {
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  from: process.env.EMAIL_USER,
  maxAge: 24 * 60 * 60, // 24 hours
  sendVerificationRequest,
} satisfies Provider;

export const config = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [emailProvider],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-request',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl });
      
      // Always redirect to dashboard after successful email verification
      if (url.includes('/api/auth/callback/email')) {
        return '/dashboard';
      }
      
      // Keep user on verify request page
      if (url.includes('/verify-request')) {
        return url;
      }
      
      // Default redirect behavior
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log('Sign in event:', { user, account, isNewUser });
    },
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(config);

export { auth as getServerSession } from "./auth";