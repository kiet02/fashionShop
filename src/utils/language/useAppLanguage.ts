import { useMemo } from 'react';
import { useMMKVString } from 'react-native-mmkv';
import { EN } from './en';
import { VN } from './vn';

const LANGUAGE_KEY = 'APP_LANGUAGE';

export enum LanguageMode {
  EN = 'EN',
  VN = 'VN',
}

export function useAppLanguage() {
  const [text, setText] = useMMKVString(LANGUAGE_KEY);

  const currentLanguage = (text as LanguageMode) || LanguageMode.EN;

  const language = useMemo(() => {
    return currentLanguage === LanguageMode.EN ? EN : VN;
  }, [currentLanguage]);

  const toggleLanguage = () => {
    const nextLanguage =
      currentLanguage === LanguageMode.EN ? LanguageMode.VN : LanguageMode.EN;
    setText(nextLanguage);
  };
  return {
    language,
    currentLanguage,
    toggleLanguage,
  };
}
