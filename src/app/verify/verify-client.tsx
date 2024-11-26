'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast";

export default function VerifyRequestClient() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { toast } = useToast();

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = async () => {
    if (!email || isResending || timeLeft > 0) return;

    try {
      setIsResending(true);
      const result = await signIn('email', {
        email,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Reset timer and show success message
      setTimeLeft(60);
      toast({
        title: "Email Sent",
        description: "Verification email has been resent successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend verification email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

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

            {/* Timer and Resend Button */}
            <div className="flex justify-center mb-6">
              <motion.div 
                className="bg-primary/5 rounded-full px-4 py-2"
                whileHover={timeLeft === 0 ? { scale: 1.02 } : {}}
                whileTap={timeLeft === 0 ? { scale: 0.98 } : {}}
              >
                {timeLeft > 0 ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Resend available in {timeLeft}s</span>
                  </div>
                ) : isResending ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled 
                    className="text-primary"
                  >
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Resending...
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResend}
                    className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200"
                  >
                    Resend verification email
                  </Button>
                )}
              </motion.div>
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
