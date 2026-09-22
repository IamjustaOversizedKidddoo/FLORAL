import { Component, type ErrorInfo, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Chronos ErrorBoundary] Uncaught runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      localStorage.clear();
    } catch {
      // Ignore storage errors
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container} role="alert" aria-live="assertive">
          <div className={styles.card}>
            <div className={styles.icon} aria-hidden="true">
              ○
            </div>
            <h1 className={styles.title}>Something went wrong</h1>
            <p className={styles.description}>
              Chronos encountered an unexpected state. Your timer settings and data have been preserved in your browser.
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={this.handleReload}
              >
                Reload Application
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={this.handleResetCache}
              >
                Reset Local Storage
              </button>
            </div>

            {this.state.error && (
              <details className={styles.details}>
                <summary className={styles.detailsSummary}>Technical Details</summary>
                <pre className={styles.errorText}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
