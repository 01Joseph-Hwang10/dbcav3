import {useEffect, useRef} from 'react';

export const useTimeout = (
  callback: () => void,
  delay: number,
  deps?: any[],
) => {
  const timeoutRef = useRef<NodeJS.Timeout>(); // eslint-disable-line no-undef
  useEffect(() => {
    timeoutRef.current = setTimeout(callback, delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, deps ?? []);
};
