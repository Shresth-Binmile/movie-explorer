import { useState } from 'react';

function useErrorBoundary() {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  const handleError = (error: Error) => {
    setHasError(true);
    setError(error);
  };

  return { hasError, error, resetError, handleError };
}

export default useErrorBoundary;
