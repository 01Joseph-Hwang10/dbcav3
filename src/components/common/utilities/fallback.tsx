import React from 'react';

interface PFallback {
  onFallback: React.ReactNode;
  fallbackCondition: boolean;
}

const Fallback: React.FC<PFallback> = ({
  onFallback,
  fallbackCondition,
  children,
}) => {
  return <>{fallbackCondition ? onFallback : children}</>;
};

export default Fallback;
