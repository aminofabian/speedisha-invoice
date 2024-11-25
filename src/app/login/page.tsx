import OverlappingInput from '@/components/originui/overlapping-input';
import Logo from '@/components/logo';
import { auth, signIn } from '@/utils/auth';
import SubmitButton from '@/components/custom-components/submit-button';
import { Mail } from 'lucide-react';
import { redirect } from 'next/navigation';

async function LoginPage() {
    const session =  await auth();
    if (session?.user) {
        redirect('/dashboard')


    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <Logo className="w-20 h-20" />
                    <h2 className="mt-6 text-3xl font-bold text-center text-foreground">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your email to sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={async (formData) => {
                    "use server"
                    await signIn("nodemailer", formData)
                }}>
                    <div className="space-y-4">
                        <OverlappingInput />
                    </div>

                    <SubmitButton>
                        <Mail className="w-4 h-4" />
                        Continue with Email
                    </SubmitButton>

                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <a href="/register" className="font-medium text-primary hover:text-primary/90">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;