import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";

const COOKIE_NAME = "googtrans";

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState();
  const [languageConfig, setLanguageConfig] = useState();
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }

    if (window.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }

    if (languageValue) {
      setCurrentLanguage(languageValue);
    }

    if (window.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(window.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  if (!currentLanguage || !languageConfig) {
    return null;
  }
  const switchLanguage = (newLocale) => () => {
    // Update the language cookie
    setCookie(null, COOKIE_NAME, `/auto/${newLocale}`);

    // Construct the new URL with the selected locale
    const newUrl = `${window.location.protocol}//${window.location.host}/${newLocale}${asPath}`;

    // Force a full page reload to the new URL
    window.location.href = newUrl;
  };

  return (
    <div className="text-center notranslate">
      {languageConfig.languages.map((ld) =>
        currentLanguage === ld.name ||
        (currentLanguage === "auto" &&
          languageConfig.defaultLanguage === ld) ? (
          <span key={ld.name} className="mx-3 text-orange-300">
            {ld.title}
          </span>
        ) : (
          <a
            key={ld.name}
            onClick={switchLanguage(ld.name)}
            className="mx-3 text-blue-300 cursor-pointer hover:underline"
          >
            {ld.title}
          </a>
        )
      )}
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };
