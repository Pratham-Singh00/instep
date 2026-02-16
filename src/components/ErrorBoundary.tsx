import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background text-foreground">
                    <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        We're sorry, but the application encountered an unexpected error.
                    </p>
                    <div className="p-4 bg-muted rounded-lg border border-border mb-6 text-left w-full max-w-lg overflow-auto max-h-48 text-xs font-mono">
                        {this.state.error?.toString()}
                    </div>
                    <Button onClick={() => window.location.reload()}>
                        Reload Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
