// hooks/useTranslate.js
import en from '../../locales/en';
import ar from '../../locales/ar';
import { useSearchParams, usePathname, useRouter } from "next/navigation";


const useTranslate = () => {
  const { locale } = useRouter();
  const translations = locale === 'en' ? en : en;

  return translations;
};

export default useTranslate;
