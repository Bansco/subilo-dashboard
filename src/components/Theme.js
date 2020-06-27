import { useEffect } from 'react';
import {
  useRecoilValue,
  useSetRecoilState
 } from 'recoil';
 import {
  themeState
} from '../store'

export default function Theme() {
  const theme = useRecoilValue(themeState);
  const setTheme = useSetRecoilState(themeState)

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme)
  });
  }, [setTheme])

  useEffect(() => {
    document.body.classList.remove(theme === 'dark' ? 'light' : 'dark')
    document.body.classList.add(theme)
  }, [theme])

  console.log({ theme })

  return null;
}

export function getCurrentTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}
