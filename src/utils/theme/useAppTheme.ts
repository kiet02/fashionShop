/* eslint-disable @typescript-eslint/no-shadow */
import { useMemo, useCallback } from 'react';
import { useMMKVString } from 'react-native-mmkv';
import { LIGHT } from './light';
import { DARK } from './dark';

const THEME_KEY = 'APP_THEME';

export enum ThemeMode {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export function useAppTheme() {
  const [theme, setTheme] = useMMKVString(THEME_KEY);

  const currentTheme = (theme as ThemeMode) || ThemeMode.LIGHT;

  const color = useMemo(() => {
    return currentTheme === ThemeMode.DARK ? DARK : LIGHT;
  }, [currentTheme]);

  const toggleTheme = useCallback(() => {
    const nextTheme =
      currentTheme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    setTheme(nextTheme);
  }, [currentTheme, setTheme]);

  return {
    color,
    currentTheme,
    toggleTheme,
  };
}
