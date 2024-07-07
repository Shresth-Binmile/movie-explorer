import React, { ReactNode, useEffect } from 'react';
import useErrorBoundary from '../utils/useErrorBoundary';
import ErrorBoundaryContext from '../utils/ErrorBoundaryContext';
import { Button } from '@mui/material';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ fallback, children }) => {
  const { hasError, resetError, handleError } = useErrorBoundary();

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      handleError(event.error);
    };

    window.addEventListener('error', handleGlobalError);
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, [handleError]);

  if (hasError) {
    return (
      <div>
        {fallback}
        <Button onClick={resetError} variant="contained" color="primary">Try again</Button>
      </div>
    );
  }

  return (
    <ErrorBoundaryContext.Provider value={{ handleError }}>
      {children}
    </ErrorBoundaryContext.Provider>
  );
};

export default ErrorBoundary;
