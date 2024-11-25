'use client';

import { motion } from 'framer-motion';
import { FileText, Send, CreditCard, ArrowRight, Check, Palette, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = {
  create: ['Professional templates', 'Custom branding', 'Logo upload', 'Color schemes'],
  send: ['PDF export', 'Direct email', 'Print option', 'Share link'],
  payment: ['M-Pesa integration', 'Card payments', 'Payment tracking', 'Auto-reminders']
};

const steps = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Create an Invoice!',
    subtitle: 'Choose from 100 templates',
    description: 'and various logos',
    color: 'from-violet-500 to-purple-500',
    features: features.create,
    additionalIcons: [<Palette key="palette" className="w-4 h-4" />, <ImageIcon key="image" className="w-4 h-4" />]
  },
  {
    icon: <Send className="w-8 h-8" />,
    title: 'Email it!',
    subtitle: 'Send as a PDF',
    description: 'Email or print your invoice to send to your clients',
    color: 'from-blue-500 to-cyan-500',
    features: features.send
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: 'Get paid in seconds!',
    subtitle: 'Get Paid',
    description: 'Receive payments in seconds by card or Mpesa',
    color: 'from-green-500 to-emerald-500',
    features: features.payment
  }
];

export default function WorkflowSection() {
  return (
    <section className="py-24 overflow-hidden relative">
      {/* Background Waves */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M 0 300 Q 300 150 600 300 T 1200 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            d="M 0 400 Q 300 250 600 400 T 1200 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
        </svg>
      </div>

      <div className="container px-4 mx-auto relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-primary mb-2 block"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-orbitron text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Simple and Efficient Workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Get paid faster with our simple three-step process
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-0 right-0 hidden md:block">
            <svg className="w-full h-4" preserveAspectRatio="none" viewBox="0 0 1200 20">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 0 10 Q 300 20 600 10 T 1200 10"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                className="text-primary"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgb(139, 92, 246)" />
                  <stop offset="50%" stopColor="rgb(59, 130, 246)" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative pt-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold z-10 shadow-lg">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                  >
                    {index + 1}
                  </motion.div>
                </div>

                {/* Card */}
                <div className="relative group mt-4">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl -z-10 bg-gradient-to-r"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${step.color.split(' ')[1]}, ${step.color.split(' ')[3]})`
                    }}
                  />
                  <div className="relative bg-card border border-primary/10 rounded-xl p-6 h-full group-hover:border-primary/20 transition-all duration-300 backdrop-blur-sm">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${step.color} p-4 mb-4 text-white relative transform group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                      {step.additionalIcons && (
                        <div className="absolute -bottom-2 -right-2 flex gap-1">
                          {step.additionalIcons.map((icon, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-background border border-primary/20 flex items-center justify-center text-primary">
                              {icon}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="font-medium text-primary mb-1">{step.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                    {/* Features List */}
                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-primary" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 + index * 0.2 }}
                        className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-primary"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated Particle Effects */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1
              }}
              className="absolute top-1/2 h-2 w-8 bg-primary/30 blur-sm rounded-full hidden md:block"
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600">
              Start Creating Invoices <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Free 14-day trial
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
