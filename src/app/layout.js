import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL("https://carprices.ae"),
  title: {
    default:
      "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
    template: "%s | CarPrices.ae",
  },
  description:
    "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
  alternates: {
    canonical: "/",
  },
  keywords:
    "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  authors: [{ name: "CarPrices.ae Team" }],
  creator: "CarPrices.ae",
  publisher: "CarPrices.ae",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://carprices.ae",
    siteName: "CarPrices.ae",
    title:
      "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
    description:
      "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
    images: [
      {
        url: "/assets/img/car-prices-logo.png",
        width: 1200,
        height: 630,
        alt: "CarPrices.ae - Car Prices in UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@carprices_ae",
    creator: "@carprices_ae",
    title:
      "New Car Prices, Comparisons & Reviews in UAE - CarPrices.ae",
    description:
      "Explore the latest car prices in UAE. Compare, calculate loans, and find reviews at CarPrices.ae.",
    images: ["/assets/img/car-prices-logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
};

// Structured data for the entire site (Organization + WebSite)
const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://carprices.ae/#organization",
      name: "CarPrices.ae",
      url: "https://carprices.ae",
      logo: {
        "@type": "ImageObject",
        url: "https://carprices.ae/assets/img/car-prices-logo.png",
      },
      description:
        "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model.",
      telephone: "+971553956364",
      sameAs: [
        "https://www.facebook.com/carprices.ae/",
        "https://x.com/carprices_ae",
        "https://www.linkedin.com/company/carprices-ae/",
        "https://www.instagram.com/carprices.ae/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://carprices.ae/#website",
      url: "https://carprices.ae",
      name: "CarPrices.ae",
      publisher: { "@id": "https://carprices.ae/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://carprices.ae/search-cars?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <head>
        {/* Force light mode - prevent dark mode on mobile devices */}
        <meta name="color-scheme" content="light only" />
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://cdn.carprices.ae" />
        <link rel="dns-prefetch" href="https://cdn.carprices.ae" />
        <link rel="preconnect" href="https://apis.carprices.ae" />
        <link rel="dns-prefetch" href="https://apis.carprices.ae" />
        {/* Google AdSense - loaded non-blocking via next/script in body */}
        <meta
          name="google-adsense-account"
          content="ca-pub-4857144107996534"
        />
        {/* Structured data for the site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteStructuredData),
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        {/* AdSense script - loaded lazily to not block rendering */}
        <Script
          id="adsense-script"
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4857144107996534"
          crossOrigin="anonymous"
        />

        {/* Google Tag Manager - loaded lazily to not block rendering */}
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W564HNC');`}
        </Script>

        {/* Google Ads conversion tracking */}
        <Script
          id="gtag-js"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16899666326"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16899666326');`}
        </Script>

        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W564HNC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Facebook Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1194042761803181&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
