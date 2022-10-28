import { useEffect, useRef } from 'react';
import { useEffectOnce } from './use-effect-once';

export const useIsMountedRef = () => {
  const isMountedRef = useRef<null | boolean>(null);
  useEffectOnce(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });

  return isMountedRef;
};
