'use client';

import OverlappingInput from '@/components/originui/overlapping-input';
import SubmitButton from '@/components/custom-components/submit-button';
import { Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        const email = formData.get('email') as string;
        if (!email) {
            setError('Email is required');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await signIn('email', { 
                email,
                redirect: true,
                callbackUrl: '/verify-request'
            });
        } catch (error) {
            console.error('Login error:', error);
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="mt-8 space-y-6" action={handleSubmit}>
            <div className="space-y-4">
                <OverlappingInput 
                    name="email" 
                    type="email" 
                    required 
                    disabled={isLoading}
                />
                {error && (
                    <p className="text-sm text-red-500 mt-1">
                        {error}
                    </p>
                )}
            </div>

            <SubmitButton disabled={isLoading}>
                <Mail className="w-4 h-4" />
                {isLoading ? 'Sending...' : 'Continue with Email'}
            </SubmitButton>
        </form>
    );
}
