'use client';

import { motion } from 'framer-motion';
import { HelpCircle, Plus, Sparkles } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the invoice generation work?",
    answer: "Our platform simplifies invoice creation with pre-built templates. Simply choose a template, fill in your details, and customize the design to match your brand. The system automatically generates professional invoices in PDF format.",
    icon: "✨"
  },
  {
    question: "Can I customize the invoice templates?",
    answer: "Yes! All our templates are fully customizable. You can modify colors, fonts, add your logo, and adjust layouts to create a unique design that represents your brand identity.",
    icon: "🎨"
  },
  {
    question: "Is there a limit to the number of invoices I can create?",
    answer: "No, there are no limits on the number of invoices you can generate. Our platform is designed to scale with your business needs, whether you're creating one invoice or thousands.",
    icon: "∞"
  },
  {
    question: "What payment methods are supported?",
    answer: "We support various payment methods including credit cards, bank transfers, and popular digital payment platforms. You can easily add your preferred payment details to your invoices.",
    icon: "💳"
  },
  {
    question: "Can I automate recurring invoices?",
    answer: "Yes, you can set up automated recurring invoices for regular clients. Schedule them to be generated and sent automatically at your specified intervals - weekly, monthly, or custom periods.",
    icon: "🔄"
  },
  {
    question: "How secure is my invoice data?",
    answer: "We prioritize your data security with enterprise-grade encryption, secure servers, and regular backups. Your sensitive information is protected with the latest security protocols and standards.",
    icon: "🔒"
  }
];

export default function FAQSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Wave Background */}
        <svg className="absolute w-full h-full opacity-5" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,100 C180,150 280,50 480,100 C680,150 780,50 980,100 C1180,150 1280,50 1440,100 L1440,600 L0,600 Z"
            fill="url(#faq-gradient)"
            className="text-primary"
          />
          <defs>
            <linearGradient id="faq-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Floating Circles */}
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
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
          >
            <div className={`w-32 h-32 rounded-full bg-primary/5 blur-3xl`} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative w-16 h-16 mx-auto mb-6"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-6" />
            <div className="absolute inset-0 bg-primary/20 rounded-2xl -rotate-6" />
            <div className="relative w-full h-full rounded-2xl bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
          </motion.div>

          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-orbitron text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-4 -right-8"
            >
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to know about our invoice generation platform
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="group border rounded-xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 hover:no-underline [&[data-state=open]>div>div]:text-primary">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                        {faq.icon}
                      </span>
                      <div className="text-left font-medium group-hover:text-primary transition-colors truncate">
                        {faq.question}
                      </div>
                    </div>
                    <div className="relative shrink-0 w-6 h-6 ml-6">
                      <div className="absolute inset-0 rounded-full bg-primary/10 transition-transform duration-200 group-data-[state=open]:scale-90" />
                      <Plus 
                        className="absolute inset-0 h-6 w-6 text-primary transition-all duration-300
                          group-hover:scale-110 group-data-[state=open]:rotate-45 group-data-[state=open]:text-primary
                          group-data-[state=closed]:group-hover:animate-pulse"
                      />
                      <div className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-muted-foreground pl-11"
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
