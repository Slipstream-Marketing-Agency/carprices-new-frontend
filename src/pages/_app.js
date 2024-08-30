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
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [canonicalUrl, setCanonicalUrl] = useState("");

  const router = useRouter();
  const { locale } = router;

  const handlePreloaderClose = () => {
    setLoading(false);
  };

  const fetchLatestYear = async (slug) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-models/latest-year/${slug}`);

    console.log(response,"response");
    const data = await response.json();
    return data?.data?.latestYear;
  };

  useEffect(() => {
    // Simulate loading for 3 seconds (adjust as needed)
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  
    const setCanonical = async () => {
      const pathSegments = router.asPath.split("?")[0].split("/");
      const slug = pathSegments[4]; // Adjust based on your path structure
      const yearSegment = pathSegments.find(segment => /^\d{4}$/.test(segment));
      
      // Parse the yearSegment to an integer
      const year = yearSegment ? parseInt(yearSegment, 10) : null;
  
      if (slug) {
        const latestYear = await fetchLatestYear(slug);
  
        // Update the year only if it's less than 2024
        if (latestYear && year && year < 2024) {
          pathSegments[pathSegments.indexOf(yearSegment)] = latestYear.toString();
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
    // <div style={isArabicLocale ? { direction: "rtl", textAlign: "right" } : {}}>
    <div>
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
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <Analytics />
      <SpeedInsights/>
     
    </div>
  );
}

export default MyApp;
