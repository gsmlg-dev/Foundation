import { useState, useEffect } from 'react';

export enum ColorScheme {
  none = '',
  dark = 'dark',
  light = 'light',
}

export const usePrefersColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(ColorScheme.none);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      setColorScheme(ColorScheme.dark);
      const listener = (e: MediaQueryListEvent) => {
        const newColorScheme = e.matches ? ColorScheme.dark : ColorScheme.light;
        setColorScheme(newColorScheme);
      }
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
      return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
      };
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // light mode
      setColorScheme(ColorScheme.light);
      const listener = (e: MediaQueryListEvent) => {
        const newColorScheme = e.matches ? ColorScheme.light : ColorScheme.dark;
        setColorScheme(newColorScheme);
      }
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', listener);
      return () => {
        window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', listener);
      };
    }
  }, []);
  return colorScheme;
}

export default usePrefersColorScheme;
