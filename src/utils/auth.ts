import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { DefaultSession, User as NextAuthUser } from "next-auth";
import nodemailer from "nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import type { Provider } from "next-auth/providers";
import { EmailTemplate } from '@/lib/email-template';

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
    console.log('Sending verification email to:', email);
    console.log('Verification URL:', url);

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Sign in to Speedisha",
      html: EmailTemplate({ verificationUrl: url }),
    });

    console.log('Email sent successfully:', result.messageId);
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
      
      // After email verification, redirect to dashboard
      if (url.includes('/api/auth/callback/email')) {
        return `${baseUrl}/dashboard`;
      }
      
      // Keep user on verify request page
      if (url.includes('/verify-request')) {
        return url;
      }
      
      // Handle dashboard redirect
      if (url.includes('/dashboard')) {
        return `${baseUrl}/dashboard`;
      }
      
      // Default redirect behavior
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
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