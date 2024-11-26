'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const templates = [
  {
    id: 1,
    name: 'Professional',
    description: 'Clean and professional design for businesses',
    image: '/1.png',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 2,
    name: 'Creative',
    description: 'Unique and artistic design for creative industries',
    image: '/5.png',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    name: 'Minimal',
    description: 'Simple and elegant design for modern brands',
    image: '/4.png',
    color: 'from-green-500 to-emerald-500',
  },
];

export default function TemplatesSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-orbitron text-3xl font-bold tracking-tight sm:text-4xl mb-4"
        >
          Beautiful Invoice Templates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto"
        >
          Choose from our collection of professionally designed templates or customize your own to match your brand.
        </motion.p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            {/* Template Card */}
            <div className="relative overflow-hidden rounded-xl bg-secondary/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="relative z-10"
                >
                  <h3 className="font-orbitron text-xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {template.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {template.description}
                  </p>
                </motion.div>
              </div>

              {/* Preview Button */}
              <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="secondary"
                  className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                >
                  Preview Template
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Templates Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 text-center"
      >
        <Link href="/templates">
          <Button size="lg" className="gap-2">
            View All Templates
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
