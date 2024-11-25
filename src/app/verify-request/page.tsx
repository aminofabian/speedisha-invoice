'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';

export default function VerifyRequest() {
  const [timeLeft, setTimeLeft] = useState(60);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-card rounded-lg shadow-lg p-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          
          {/* Content */}
          <div className="relative">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 
                }}
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
              >
                <Mail className="w-8 h-8 text-primary" />
              </motion.div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-2">Check your email</h1>
            
            {/* Description */}
            <p className="text-muted-foreground text-center mb-6">
              {email ? (
                <>A sign in link has been sent to <span className="font-medium text-foreground">{email}</span></>
              ) : (
                'A sign in link has been sent to your email'
              )}
            </p>

            {/* Timer */}
            <div className="flex justify-center mb-6">
              <div className="bg-primary/5 rounded-full px-4 py-2 text-sm">
                {timeLeft > 0 ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resend available in {timeLeft}s
                  </span>
                ) : (
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    Resend email
                  </Button>
                )}
              </div>
            </div>

            {/* Back Link */}
            <Link 
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Didn't receive the email? Check your spam folder or try again with a different email address.
        </p>
      </motion.div>
    </div>
  );
}
