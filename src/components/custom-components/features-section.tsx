'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Sparkles, Receipt, Clock, CreditCard, BarChart, Mail } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Smart Templates',
    description: 'Choose from professionally designed templates or create your own custom invoice designs.',
    icon: Receipt,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Automated Reminders',
    description: 'Set up automatic payment reminders to ensure timely payments from your clients.',
    icon: Clock,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Multiple Payment Options',
    description: 'Accept payments through various methods including M-Pesa, cards, and bank transfers.',
    icon: CreditCard,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Detailed Analytics',
    description: 'Track your business performance with comprehensive financial reports and insights.',
    icon: BarChart,
    color: 'from-orange-500 to-yellow-500',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Wave Background */}
        <svg className="absolute w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,150 C320,50 420,250 640,200 C860,150 960,50 1280,150 L1440,150 L1440,600 L0,600 Z"
            fill="url(#gradient1)"
            className="text-primary/5"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Connecting Lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="w-[600px] h-[600px] rounded-full border-2 border-dashed border-primary"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Powerful Features for Your Business
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Everything you need to create and manage professional invoices, track payments, and grow your business.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative p-6 rounded-2xl border bg-card hover:bg-accent/50 transition-colors group"
            >
              {/* Feature Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-4`}>
                <feature.icon className="w-full h-full text-white" />
              </div>

              {/* Connecting Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-1/2 -right-4 w-8 h-px bg-primary/20 origin-left hidden md:block"
              />

              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link href="/register">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 group">
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
