export default function LoginLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Logo skeleton */}
                    <div className="w-20 h-20 rounded-full bg-muted animate-pulse" />
                    
                    {/* Title skeleton */}
                    <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                    
                    {/* Subtitle skeleton */}
                    <div className="h-4 w-64 bg-muted animate-pulse rounded" />
                    
                    {/* Email input skeleton */}
                    <div className="w-full space-y-6">
                        <div className="relative">
                            {/* Label skeleton */}
                            <div className="h-4 w-24 bg-muted animate-pulse rounded absolute -top-2 left-2 z-10" />
                            {/* Input skeleton */}
                            <div className="h-10 w-full bg-muted animate-pulse rounded" />
                        </div>
                        
                        {/* Button skeleton */}
                        <div className="h-10 w-full bg-muted animate-pulse rounded" />
                        
                        {/* Sign up link skeleton */}
                        <div className="flex justify-center space-x-1">
                            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
