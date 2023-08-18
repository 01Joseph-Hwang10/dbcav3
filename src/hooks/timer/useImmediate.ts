import {useEffect, useRef} from 'react';

export const useImmediate = (callback: () => void, deps?: any[]) => {
  const immediateRef = useRef<NodeJS.Immediate>(); // eslint-disable-line no-undef
  useEffect(() => {
    immediateRef.current = setImmediate(callback);
    return () => {
      if (immediateRef.current) clearImmediate(immediateRef.current);
    };
  }, deps ?? []);
};
