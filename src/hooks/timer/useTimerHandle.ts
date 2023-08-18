import React, {useEffect} from 'react';

export const useTimerHandle = (
  timerId: React.MutableRefObject<
    NodeJS.Timeout | NodeJS.Timer | NodeJS.Immediate | undefined // eslint-disable-line no-undef
  >,
  kind: 'timeout' | 'timer' | 'immediate',
) => {
  useEffect(() => {
    return () => {
      if (timerId.current) {
        if (kind === 'timeout') {
          clearTimeout(timerId.current as NodeJS.Timeout); // eslint-disable-line no-undef
        } else if (kind === 'timer') {
          clearInterval(timerId.current as NodeJS.Timer); // eslint-disable-line no-undef
        } else if (kind === 'immediate') {
          clearImmediate(timerId.current as NodeJS.Immediate); // eslint-disable-line no-undef
        }
      }
    };
  });
};
