import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Jost, Commissioner, Orbitron } from 'next/font/google';
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const jost = Jost({
  subsets: ["latin"],
  display: 'swap',
});

const commissioner = Commissioner({
  subsets: ['latin'],
  variable: '--font-commissioner',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Speedisha",
  description: "Welcome to Speedisha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jost.className} ${commissioner.variable} ${orbitron.variable} antialiased text-slate-700`}>
        <Providers>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
