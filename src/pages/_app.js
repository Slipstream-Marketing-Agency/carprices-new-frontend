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
import "@/styles/tailwind.css";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "react-redux";
import store from "../store";
import { useAmp } from "next/amp"; // AMP hook for detection

function MyApp({ Component, pageProps }) {
  const isAmp = useAmp(); // Detect AMP mode
  const [loading, setLoading] = useState(true);
  const [canonicalUrl, setCanonicalUrl] = useState("");

  const router = useRouter();
  const { locale } = router;

  const fetchLatestYear = async (slug) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}car-models/latest-year/${slug}`
    );
    const data = await response.json();
    return data?.data?.latestYear;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const setCanonical = async () => {
      const pathSegments = router.asPath.split("?")[0].split("/");
      const slug = pathSegments[4]; // Adjust based on your path structure
      const yearSegment = pathSegments.find((segment) =>
        /^\d{4}$/.test(segment)
      );

      // Parse the yearSegment to an integer
      const year = yearSegment ? parseInt(yearSegment, 10) : null;

      if (slug) {
        const latestYear = await fetchLatestYear(slug);

        // Update the year only if it's less than 2024
        if (latestYear && year && year < 2024) {
          pathSegments[pathSegments.indexOf(yearSegment)] =
            latestYear.toString();
        }

        setCanonicalUrl("https://carprices.ae" + pathSegments.join("/"));
      } else {
        setCanonicalUrl("https://carprices.ae" + router.asPath.split("?")[0]);
      }
    };

    setCanonical();
  }, [router.asPath]);

  // Check if the locale is set to Arabic
  const isArabicLocale = locale === "ar";

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/assets/img/favicon.ico"
          type="image/gif"
          sizes="20x20"
        />

        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {isAmp && (
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
            rel="stylesheet"
          />
        )}

        {/* Scripts and tags that should not appear on AMP pages */}
        {!isAmp && (
          <>
            {/* Google Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-W564HNC');`,
              }}
            />

            {/* AdSense */}
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4857144107996534"
              crossOrigin="anonymous"
            ></script>

            {/* Custom Font */}
            <link
              rel="stylesheet"
              href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css"
              crossOrigin="anonymous"
            />

            {/* Facebook Pixel */}
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '1194042761803181');
                  fbq('track', 'PageView');`,
              }}
            />

            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=1194042761803181&ev=PageView&noscript=1"
              />
            </noscript>
          </>
        )}

        {/* Common styles and assets for AMP and non-AMP */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </Head>

      {/* Content */}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>

      {/* Conditionally render GTM for non-AMP */}
      {!isAmp && (
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W564HNC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      )}

      {/* Analytics and Speed Insights */}
      {!isAmp && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}

export default MyApp;
