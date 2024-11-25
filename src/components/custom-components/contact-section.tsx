'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send, Phone, MapPin, ArrowRight, Twitter, Linkedin, Github, Plus, Equal, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'hello@speedisha.com',
    link: 'mailto:hello@speedisha.com'
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+1 (555) 123-4567',
    link: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'San Francisco, CA',
    link: 'https://maps.google.com'
  }
];

const socialLinks = [
  { icon: Twitter, name: 'Twitter', url: 'https://twitter.com' },
  { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: Github, name: 'GitHub', url: 'https://github.com' }
];

const WavePattern = () => (
  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
    <defs>
      <pattern id="wave-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
        <path
          d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/10"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wave-pattern)" />
  </svg>
);

const FloatingShapes = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: i * 2,
          ease: "linear"
        }}
        style={{
          width: `${100 + i * 50}px`,
          height: `${100 + i * 50}px`,
          top: `${20 + i * 30}%`,
          left: `${10 + i * 40}%`,
          background: `radial-gradient(circle at center, var(--primary) 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
    ))}
  </>
);

const DecorativeGrid = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,var(--primary)_1px,transparent_1px),linear-gradient(to_bottom,transparent_0%,var(--primary)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_80%)] opacity-[0.02]" />
);

const WhatsAppButton = () => {
  const whatsappNumber = "+1234567890"; // Replace with your actual WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="relative group"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500 opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Button */}
        <div className="relative flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-green-500/25 transition-shadow duration-300">
          <MessageCircle className="w-6 h-6" />
          <span className="font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            Chat with us
          </span>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm text-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Available 24/7
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-8 border-transparent border-t-background/90" />
        </div>
      </motion.div>
    </motion.a>
  );
};

export default function ContactSection() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateNewNumbers = () => {
    setFirstNumber(Math.floor(Math.random() * 10));
    setSecondNumber(Math.floor(Math.random() * 10));
    setUserAnswer('');
    setIsCorrect(null);
  };

  useEffect(() => {
    generateNewNumbers();
  }, []);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserAnswer(value);
    if (value !== '') {
      setIsCorrect(parseInt(value) === firstNumber + secondNumber);
    } else {
      setIsCorrect(null);
    }
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <WhatsAppButton />
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" />
        <WavePattern />
        <DecorativeGrid />
        <FloatingShapes />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm leading-6"
          >
            <span className="relative inline-flex items-center gap-x-1.5 text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Available 24/7
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-orbitron text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Have questions? We'd love to hear from you. Send us a message and we'll get back to you shortly.
          </motion.p>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-3xl border border-primary/10 bg-card/30 p-8 backdrop-blur-sm"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl [background:radial-gradient(circle_at_top_left,transparent_50%,var(--primary)_1000%)] opacity-20" />
            
            <form className="relative space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium mb-2">
                    First name
                  </label>
                  <Input
                    type="text"
                    id="first-name"
                    className="bg-background/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium mb-2">
                    Last name
                  </label>
                  <Input
                    type="text"
                    id="last-name"
                    className="bg-background/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="Doe"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    className="bg-background/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={4}
                    className="bg-background/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Arithmetic Captcha */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-4">
                    Please solve this simple math problem
                  </label>
                  <motion.div 
                    className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 relative group"
                    animate={{ scale: isCorrect === true ? [1, 1.02, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <motion.div
                      className="flex items-center justify-center h-12 w-12 rounded-lg bg-background/80 backdrop-blur-sm text-lg font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      {firstNumber}
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                    >
                      <Plus className="h-6 w-6 text-primary" />
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-center h-12 w-12 rounded-lg bg-background/80 backdrop-blur-sm text-lg font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    >
                      {secondNumber}
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
                    >
                      <Equal className="h-6 w-6 text-primary" />
                    </motion.div>

                    <motion.div
                      className="relative flex-1 max-w-[100px]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.4 }}
                    >
                      <Input
                        type="number"
                        value={userAnswer}
                        onChange={handleAnswerChange}
                        className={`
                          bg-background/80 backdrop-blur-sm text-lg font-semibold text-center
                          focus:ring-2 transition-all duration-300
                          ${isCorrect === true ? 'focus:ring-green-500/20 border-green-500/50' : 
                            isCorrect === false ? 'focus:ring-red-500/20 border-red-500/50' : 
                            'focus:ring-primary/20'}
                        `}
                        placeholder="?"
                      />
                      {isCorrect !== null && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`absolute -right-6 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full ${
                            isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                          }`}
                        />
                      )}
                    </motion.div>

                    <motion.button
                      type="button"
                      onClick={generateNewNumbers}
                      className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M8 16H3v5" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden"
                  disabled={!isCorrect}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send message
                    <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className="lg:ml-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-3xl border border-primary/10 bg-card/30 p-8 backdrop-blur-sm h-full"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-secondary/10 to-primary/10 rounded-3xl [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl [background:radial-gradient(circle_at_bottom_right,transparent_50%,var(--primary)_1000%)] opacity-20" />
              
              <div className="relative">
                <h3 className="text-lg font-semibold mb-8">Connect with us</h3>
                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.title}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors duration-300"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-muted-foreground">
                          {item.title}
                        </p>
                        <p className="mt-1 text-base font-medium">
                          {item.content}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-primary/10">
                  <h3 className="text-lg font-semibold mb-6">Follow us</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((platform, index) => (
                      <motion.a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                          <platform.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
