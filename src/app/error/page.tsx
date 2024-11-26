'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const errorMessages: { [key: string]: string } = {
        Configuration: 'There is a problem with the server configuration.',
        AccessDenied: 'You do not have permission to sign in.',
        Verification: 'The verification link has expired or has already been used.',
        Default: 'An unexpected error occurred.',
    };

    const message = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-destructive" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center text-foreground">
                        Authentication Error
                    </h2>

                    <p className="text-center text-muted-foreground">
                        {message}
                    </p>

                    <div className="flex flex-col gap-2 w-full">
                        <Link 
                            href="/login"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            Try Again
                        </Link>
                        
                        <Link 
                            href="/"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}