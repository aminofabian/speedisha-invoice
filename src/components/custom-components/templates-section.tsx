'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, FileText, PaintBucket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const templates = [
  {
    id: 1,
    name: 'Professional',
    description: 'Clean and modern design for professional businesses',
    image: '/1.png',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Creative',
    description: 'Unique and artistic design for creative industries',
    image: '/2.png',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    name: 'Minimal',
    description: 'Simple and elegant design for a timeless look',
    image: '/3.png',
    color: 'from-green-500 to-emerald-500',
  },
];

export default function TemplatesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Wave Background */}
        <svg className="absolute w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.05 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,150 C320,250 420,50 640,100 C860,150 960,250 1280,150 L1440,150 L1440,600 L0,600 Z"
            fill="url(#template-gradient)"
            className="text-primary"
          />
          <defs>
            <linearGradient id="template-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{ y: [-20, 20, -20] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              right: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
          >
            <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${
              i === 0 ? 'from-blue-500/5 to-cyan-500/5' :
              i === 1 ? 'from-purple-500/5 to-pink-500/5' :
              'from-green-500/5 to-emerald-500/5'
            } blur-3xl`} />
          </motion.div>
        ))}
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
            <PaintBucket className="w-6 h-6 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60"
          >
            Beautiful Invoice Templates
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Choose from our collection of professionally designed templates or customize your own to match your brand.
          </motion.p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Template Card */}
              <div className="relative rounded-2xl overflow-hidden bg-card border transition-all duration-300 group-hover:border-primary/20">
                {/* Template Image */}
                <div className="relative h-[400px] overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>

                {/* Template Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} p-2.5 mb-3`}>
                    <FileText className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {template.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-10 transition-opacity`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Template Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center max-w-2xl mx-auto p-8 rounded-2xl border bg-card/50 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />

          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Want a Custom Template?</h3>
          <p className="text-muted-foreground mb-6">
            Create your own unique invoice template that perfectly matches your brand identity.
          </p>
          <Link href="/register">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 group">
              Create Custom Template
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
