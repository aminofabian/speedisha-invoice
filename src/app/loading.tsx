export default function Loading() {
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
                    
                    {/* Form skeleton */}
                    <div className="w-full space-y-4">
                        {/* Input field skeleton */}
                        <div className="h-12 w-full bg-muted animate-pulse rounded" />
                        
                        {/* Button skeleton */}
                        <div className="h-10 w-full bg-muted animate-pulse rounded" />
                        
                        {/* Link skeleton */}
                        <div className="h-4 w-48 mx-auto bg-muted animate-pulse rounded mt-4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
