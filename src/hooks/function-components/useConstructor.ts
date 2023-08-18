import {useEffect} from 'react';

export const useConstructor = (action: CallableFunction) => {
  useEffect(() => {
    action();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
