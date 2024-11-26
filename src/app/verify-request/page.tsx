'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function VerifyRequestContent() {
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
              We&apos;ve sent a verification link to{' '}
              <span className="font-medium text-foreground">{email}</span>
            </p>

            {/* Timer */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                {timeLeft > 0 ? (
                  <>
                    Resend email in{' '}
                    <span className="font-medium text-foreground">
                      {timeLeft}s
                    </span>
                  </>
                ) : (
                  'You can now resend the verification email'
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                className="w-full"
                onClick={handleResend}
                disabled={!email || isResending || timeLeft > 0}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : timeLeft > 0 ? (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend in {timeLeft}s
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend verification email
                  </>
                )}
              </Button>

              <Link href="/login" className="block">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResend}
                disabled={timeLeft > 0}
                className="text-primary hover:text-primary/90 font-medium disabled:opacity-50"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Wrap the component with Suspense
export default function VerifyRequest() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyRequestContent />
    </Suspense>
  );
}
