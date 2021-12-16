import { useState, useEffect } from 'react';

export const useTouchable = () => {
  const [touchable, setTouchable] = useState<boolean>(false);
  useEffect(() => {
    if ('ontouchstart' in window.document.documentElement) {
      setTouchable(true);
    } else if (window.navigator.hasOwnProperty('pointerEnabled')) {
      setTouchable(true);
    } else if (window.navigator.hasOwnProperty('msPointerEnabled')) {
      setTouchable(true);
    } else {
      setTouchable(false);
    }
  }, []);
  return touchable;
};

export default useTouchable;
