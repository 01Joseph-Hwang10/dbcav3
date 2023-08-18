import {useEffect} from 'react';

export const useDestructor = (action: CallableFunction) => {
  useEffect(() => {
    return () => {
      action();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
