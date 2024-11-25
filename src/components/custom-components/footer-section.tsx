'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '#faq' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '#contact' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
};

const socialLinks = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Github, href: '#', label: 'GitHub' },
];

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative mt-32">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-4"
        >
          {/* Brand section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-orbitron font-bold text-primary">Speedisha</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Professional invoice generation platform for businesses of all sizes. Create, manage, and track invoices with ease.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <Link 
                  key={label} 
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div 
              key={category}
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-sm font-orbitron font-semibold uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <Link 
                      href={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-primary/10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="text-sm font-orbitron font-semibold">Subscribe to our newsletter</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Stay updated with the latest features and releases.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-secondary/50 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
              <Button size="sm" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-primary/10"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} Speedisha. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookie Settings
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
