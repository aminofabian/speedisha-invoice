'use client';

import { motion } from 'framer-motion';
import { 
  FileText, Clock, CreditCard, BarChart, 
  Mail, Shield, Globe, Zap,
  ArrowRight, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  {
    title: 'Smart Templates',
    description: 'Professional invoice templates with customizable designs and branding options.',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    delay: 0,
  },
  {
    title: 'Automated Reminders',
    description: 'Set up automatic payment reminders and follow-ups for overdue invoices.',
    icon: Clock,
    color: 'from-purple-500 to-pink-500',
    delay: 0.1,
  },
  {
    title: 'Multiple Payments',
    description: 'Accept payments via M-Pesa, credit cards, bank transfers, and more.',
    icon: CreditCard,
    color: 'from-green-500 to-emerald-500',
    delay: 0.2,
  },
  {
    title: 'Real-time Analytics',
    description: 'Track payments, generate reports, and gain insights into your business.',
    icon: BarChart,
    color: 'from-orange-500 to-yellow-500',
    delay: 0.3,
  },
  {
    title: 'Email Integration',
    description: 'Send professional invoices directly through email with tracking.',
    icon: Mail,
    color: 'from-red-500 to-rose-500',
    delay: 0.4,
  },
  {
    title: 'Secure Platform',
    description: 'Enterprise-grade security with encrypted data and secure payments.',
    icon: Shield,
    color: 'from-indigo-500 to-violet-500',
    delay: 0.5,
  },
  {
    title: 'Global Currency',
    description: 'Support for multiple currencies and automatic exchange rates.',
    icon: Globe,
    color: 'from-teal-500 to-cyan-500',
    delay: 0.6,
  },
  {
    title: 'Quick Setup',
    description: 'Get started in minutes with our easy-to-use platform.',
    icon: Zap,
    color: 'from-amber-500 to-yellow-500',
    delay: 0.7,
  },
];

export default function FeaturesGrid() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Flowing Wave Pattern */}
        <svg className="absolute w-full h-full" viewBox="0 0 1440 1024" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.05 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,320 C480,240 960,400 1440,320 L1440,1024 L0,1024 Z"
            fill="url(#grid-gradient)"
            className="text-primary"
          />
          <defs>
            <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Connecting Lines Pattern */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px',
              color: 'var(--primary)',
            }}
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
            transition={{ duration: 0.5 }}
            className="font-orbitron text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Everything You Need
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Powerful features to help you manage invoices, track payments, and grow your business.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="relative p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-accent/50 transition-all group"
            >
              {/* Connecting Lines */}
              {index < features.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: feature.delay + 0.3 }}
                  className="absolute top-1/2 -right-3 w-6 h-px bg-primary/20 origin-left hidden lg:block"
                />
              )}
              {index < features.length - 4 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: feature.delay + 0.3 }}
                  className="absolute top-[90%] left-1/2 w-px h-6 bg-primary/20 origin-top hidden lg:block"
                />
              )}

              {/* Feature Icon */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-4 group-hover:shadow-lg transition-shadow`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>
                
                {/* Hover Effect */}
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${feature.color} blur-lg group-hover:opacity-20 transition-opacity`}
                />
              </div>

              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link href="/register">
            <Button size="lg" className="gap-2 hover:from-primary/90 hover:to-primary/70 group">
              Start Creating Invoices
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
