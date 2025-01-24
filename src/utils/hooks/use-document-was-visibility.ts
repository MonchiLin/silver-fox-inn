import {useEffect, useRef} from "react";

export function useDocumentWasVisible(callback: () => void) {
  const callbackRef = useRef(callback);
  const prevVisibility = useRef(document.visibilityState);

  // 始终保持回调函数最新
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      const wasHidden = prevVisibility.current === 'hidden';

      if (isVisible && wasHidden) {
        callbackRef.current();
      }

      prevVisibility.current = document.visibilityState;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
