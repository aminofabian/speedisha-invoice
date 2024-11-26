'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Receipt, Coins, Clock, Repeat, FileSpreadsheet, Star, Shield } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-16 lg:flex lg:px-8 lg:py-10">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-x-2 rounded-full bg-primary/10 px-4 py-1 mb-8"
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Trusted by 10,000+ businesses</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-orbitron mt-10 text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Professional Invoices{' '}
            <span className="text-primary">in Seconds</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Create, send, and track professional invoices instantly. Perfect for freelancers, small businesses, and enterprises. Get paid faster with automated reminders and multiple payment options.
          </motion.p>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 space-y-4"
          >
            <div className="flex items-center gap-x-3">
              <Receipt className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Beautiful, customizable invoice templates</span>
            </div>
            <div className="flex items-center gap-x-3">
              <Repeat className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Automated recurring invoices</span>
            </div>
            <div className="flex items-center gap-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Smart payment reminders</span>
            </div>
            <div className="flex items-center gap-x-3">
              <Coins className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Multiple currency support</span>
            </div>
            <div className="flex items-center gap-x-3">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Detailed financial reports</span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex items-center gap-x-6"
          >
            {!session ? (
              <>
                <Link href="/register">
                  <Button size="lg" className="gap-2 relative group">
                    <span className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/80 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-200" />
                    Start Free Trial <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" size="lg">
                    Sign in
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Create Invoice <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>100% Free</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative w-[40rem] h-[35rem] rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-background border border-primary/10"
            >
              {/* Add invoice preview or illustration here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-primary/20 text-9xl font-bold font-orbitron">
                  SPEEDISHA
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}