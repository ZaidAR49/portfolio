import { Component, type ErrorInfo, type ReactNode } from "react";
import { logger } from "../helpers/logger.healper";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[var(--bg-primary)]">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-[var(--accent)]">Something went wrong.</h1>
                        <p className="text-[var(--text-secondary)]">
                            We're sorry, but an unexpected error occurred. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 rounded-xl font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all shadow-lg"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
