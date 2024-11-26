export default function ErrorLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
                    <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-64 bg-muted animate-pulse rounded" />
                    <div className="w-full space-y-2">
                        <div className="h-10 w-full bg-muted animate-pulse rounded" />
                        <div className="h-10 w-full bg-muted animate-pulse rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}
