import {useEffect, useRef} from 'react';

export const useInterval = (
  callback: () => void,
  delay: number,
  deps?: any[],
) => {
  const timerRef = useRef<NodeJS.Timer>(); // eslint-disable-line no-undef
  useEffect(() => {
    timerRef.current = setInterval(callback, delay);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, deps ?? []);
};
