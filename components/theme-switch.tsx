'use client';

import { useEffect, useState } from 'react';

type Theme = 'auto' | 'light' | 'dark';

const nextTheme: Record<Theme, Theme> = {
  auto: 'light',
  light: 'dark',
  dark: 'auto',
};

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'auto';
    const saved = window.localStorage.getItem('portfolio-theme') as Theme | null;
    return saved && saved in nextTheme ? saved : 'auto';
  });

  useEffect(() => {
    if (theme === 'auto') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;

    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <button
      className="theme-switch"
      type="button"
      suppressHydrationWarning
      onClick={() => setTheme((current) => nextTheme[current])}
      aria-label={`Colour theme: ${theme}. Activate to change.`}
      title={`Theme: ${theme}`}
    >
      <span aria-hidden="true" />
      {theme}
    </button>
  );
}

