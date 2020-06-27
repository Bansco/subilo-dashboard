import { useState, useEffect } from 'react';

export default function Theme() {
  const theme = useCurrentTheme();

  useEffect(() => {
    document.body.classList.remove(theme === 'dark' ? 'light' : 'dark')
    document.body.classList.add(theme)
  }, [theme])

  return null;
}

export function useCurrentTheme() {
  const [theme, setTheme] = useState(getCurrentTheme())

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme)
  });
  }, [])

  return theme;
}

export function getCurrentTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}
