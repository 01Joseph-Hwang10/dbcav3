import {useEffect, useRef} from 'react';

export function usePrevious<T = any>(value: T) {
  const ref: any = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
