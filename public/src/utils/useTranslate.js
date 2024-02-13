// hooks/useTranslate.js
import { useRouter } from 'next/router';
import en from '../../locales/en';
import ar from '../../locales/ar';

const useTranslate = () => {
  const { locale } = useRouter();
  const translations = locale === 'en' ? en : ar;

  return translations;
};

export default useTranslate;
