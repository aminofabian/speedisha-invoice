'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={cn(
        'w-full relative overflow-hidden transition-all duration-200',
        pending && 'cursor-not-allowed opacity-70',
        className
      )}
      disabled={pending}
      {...props}
    >
      <span className={cn(
        'flex items-center justify-center gap-2 transition-all duration-200',
        pending && 'opacity-0'
      )}>
        {children}
      </span>

      {pending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        </div>
      )}
    </Button>
  );
}