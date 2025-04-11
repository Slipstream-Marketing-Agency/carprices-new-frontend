import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { Poppins } from "next/font/google";
import "./../globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";
import StoreProvider from "../../../providers/StoreProvider";
import CookiePopup from "@/components/layout/CookiePopup";
import BlockDetector from "@/components/ads/BlockerDetect";
import { fetchMetaData } from "@/lib/fetchMetaData";

// Load Google Fonts (in this case, Poppins)
const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
  style: ["normal"], // You can add "italic" if needed
  subsets: ["latin"], // Specify the subset (for example, 'latin')
  display: "swap", // Optimizes performance by using fallback fonts until the font loads
});

export const fetchCache = 'force-no-store';

// Load all Gilroy fonts (normal and italic versions)
// const gilroy = localFont({
//   src: [
//     // Normal fonts
//     { path: "./fonts/Gilroy-Thin.woff", weight: "100", style: "normal" },
//     { path: "./fonts/Gilroy-Light.woff", weight: "300", style: "normal" },
//     { path: "./fonts/Gilroy-Regular.woff", weight: "400", style: "normal" },
//     { path: "./fonts/Gilroy-Medium.woff", weight: "500", style: "normal" },
//     { path: "./fonts/Gilroy-Semibold.woff", weight: "600", style: "normal" },
//     { path: "./fonts/Gilroy-Bold.woff", weight: "700", style: "normal" },
//     { path: "./fonts/Gilroy-Extrabold.woff", weight: "800", style: "normal" },
//     { path: "./fonts/Gilroy-Black.woff", weight: "900", style: "normal" },],
//   variable: "--font-gilroy",
//   display: "swap", // Optimizes performance by using fallback fonts until the custom font loads
// });

export const metadata = {
  title: "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
  description: "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
  charset: "UTF-8",
  alternates: {
    canonical: `https://carprices.ae`,
  },
  keywords: "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
  robots: {
    index: true,
    follow: true,
  },
  author: "CarPrices.ae Team",
  icon: "./favicon.ico",
}
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Car Prices",
      logo: "/assets/img/car-prices-logo.png",
      description: "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
      url: "https://carprices.ae",
      legalName: "Car Prices",
      telephone: "+971553956364",
      sameAs: ["https://www.facebook.com/carprices.ae/", "https://x.com/carprices_ae", "https://www.linkedin.com/company/carprices-ae/", "https://www.instagram.com/carprices.ae/"]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://carprices.ae",
      "potentialAction": {
          "@type": "SearchAction",
          "target": "https://carprices.ae/search-cars?brand={brand}&bodytype={bodytype}",
          "query-input": "name=brand name=bodytype"
      }
    },
    {
      "@type": "AboutPage",
      "name": "About Us - CarPrices.ae",
      "url": "https://carprices.ae/about",
      "description": "Learn more about CarPrices.ae, the leading platform for exploring the latest car prices, specifications, and reviews in the UAE."
    },
    {
      "@type": "ContactPage",
      "name": "Contact Us - CarPrices.ae",
      "url": "https://carprices.ae/contact-us",
      "description": "Get in touch with CarPrices.ae for any inquiries about car prices, specifications, or services in the UAE.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971553956364",
        "contactType": "customer service",
        "areaServed": "UAE",
        "availableLanguage": ["English", "Arabic"]
      }
    }
  ]
};


export default function RootLayout({ children, params }) {

  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4096282930416593"
          crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-4096282930416593" />
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
          <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16899666326"
        />
        <script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16899666326');
          `}
        </script>
      </head>

      <body className={`${poppins.className} antialiased`}> {/* Apply Google Font */}
        <Script
          id="gtm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W564HNC');`,
          }}
        />
        <noscript>
          {/* {process.env.NODE_ENV === 'development' && <Script
            strategy="afterInteractive" // Load the script after the page is interactive
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4096282930416593"
            crossOrigin="anonymous"
          />} */}


          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1194042761803181&ev=PageView&noscript=1"
          />

          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-W564HNC"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        </noscript>
        <main className="w-full flex flex-col">
          <StoreProvider>
            <NavBar />
          </StoreProvider>
          {children}
          <Footer />
        </main>

        <CookiePopup />
        <BlockDetector />
      </body>
    </html>
  );
}
