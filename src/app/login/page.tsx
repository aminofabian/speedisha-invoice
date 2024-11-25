
import OverlappingInput from '@/components/originui/overlapping-input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { signIn } from '@/utils/auth';

function LoginPage() {

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Handle login logic here
    //     console.log('Login attempt with:', { email });
    // };

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

                <form className="mt-8 space-y-6"  action={async () => {
        "use server"
        await signIn()
      }}>
                    <div className="space-y-4">
                        <OverlappingInput
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Continue with Email
                    </Button>

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