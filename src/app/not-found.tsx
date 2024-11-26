'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-10">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-x-2 rounded-full bg-primary/10 px-4 py-1 mb-8"
          >
            <span className="text-sm font-medium text-primary">404 Error</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-orbitron mt-10 text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Page Not{' '}
            <span className="text-primary">Found</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Oops! The page you're looking for seems to have vanished into thin air. Let's get you back on track.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex items-center gap-x-6"
          >
            <Link href="/">
              <button className="gap-2 relative group inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <span className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/80 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-200" />
                Return Home <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}