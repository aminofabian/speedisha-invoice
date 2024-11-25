import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Jost, Commissioner, Orbitron } from 'next/font/google';

const jost = Jost({
  subsets: ["latin"],
  display: 'swap',
});

const commissioner = Commissioner({
  subsets: ["latin"],
  variable: '--font-commissioner',
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: '--font-orbitron',
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
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
