import Head from "next/head";
import "../../public/assets/css/bootstrap-icons.css";
import "../../public/assets/css/boxicons.min.css";
import "../../public/assets/css/fontawesome.min.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/swiper-bundle.min.css";
import "../../public/assets/css/nice-select.css";
import "../../styles/custom.css";
import "../../public/assets/css/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Script from "next/script";
import Preloader from "../components/common/Preloader";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  const handlePreloaderClose = () => {
    setLoading(false);
  };

  useEffect(() => {
    // Simulate loading for 3 seconds (adjust as needed)
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    import("../../public/assets/js/bootstrap.min.js");
  }, []);
  const router = useRouter();
  const { locale } = router;

  // Check if the locale is set to Arabic
  const isArabicLocale = locale === "ar";

  return (
    <div style={isArabicLocale ? { direction: "rtl", textAlign: "right" } : {}}>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/assets/img/favicon.ico"
          type="image/gif"
          sizes="20x20"
        />
      </Head>

      <Component {...pageProps} />
      <style jsx global>
        {`
          /* Define global styles for right-to-left (rtl) layout */
          .rtl {
            direction: rtl;
            text-align: right;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          li,
          ul {
            text-align: right !impoprtant;
          }
        `}
      </style>
    </div>
    //   )}
    // </div>
  );
}

export default MyApp;
