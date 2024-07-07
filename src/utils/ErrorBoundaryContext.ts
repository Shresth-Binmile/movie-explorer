import { createContext, useContext } from 'react';

interface ErrorBoundaryContextType {
  handleError: (error: Error) => void;
}

const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | undefined>(undefined);

export const useErrorBoundaryContext = (): ErrorBoundaryContextType => {
  const context = useContext(ErrorBoundaryContext);
  if (!context) {
    throw new Error('useErrorBoundaryContext must be used within an ErrorBoundary');
  }
  return context;
};

export default ErrorBoundaryContext;
