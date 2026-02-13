// app/used-cars/page.tsx (or page.jsx)
import React from "react";
import ShozonAdsList from "@/components/used-cars/ShozonAdsList";
import Script from "next/script";

// If you keep this file as .tsx, remove the `// @ts-expect-error` below.
export const metadata = {
  // @ts-expect-error - works fine in JS/TS without explicit type import
  metadataBase: new URL("https://carprices.ae"),

  title:
    "Used Cars for Sale in UAE | Buy Second-Hand Cars Online | carprices.ae",
  description:
    "Explore quality used cars for sale in the UAE. Filter by price, year, kilometers, and emirate. Compare deals and find your next car on carprices.ae.",

  alternates: {
    canonical: "/used-cars",
  },

  openGraph: {
    type: "website",
    url: "https://carprices.ae/used-cars",
    title:
      "Used Cars for Sale in UAE | Buy Second-Hand Cars Online | carprices.ae",
    description:
      "Browse the latest used cars across the UAE. Smart filters for price, year, KM, and emirate help you find the right deal fast.",
    siteName: "carprices.ae",
    // Replace the image below with your real OG image path when ready
    images: [
      {
        url: "https://carprices.ae/og/used-cars.png",
        width: 1200,
        height: 630,
        alt: "Used cars in UAE – carprices.ae",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@carpricesae", // update if you have a Twitter/X handle
    title:
      "Used Cars for Sale in UAE | Buy Second-Hand Cars Online | carprices.ae",
    description:
      "Explore top deals on used cars in the UAE with powerful filters for price, year, KM, and emirate.",
    images: ["https://carprices.ae/og/used-cars.png"],
  },

  robots: {
    index: true,
    follow: true,
    // more granular controls if you like:
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // small nicety for mobile crawlers
  other: {
    "format-detection": "telephone=no",
  },
};

export default function Page() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://carprices.ae/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Used Cars",
        item: "https://carprices.ae/used-cars",
      },
    ],
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Used Cars for Sale in UAE",
    url: "https://carprices.ae/used-cars",
    description:
      "Browse used cars in the UAE with filters for price, year, kilometers, and emirate on carprices.ae.",
    isPartOf: {
      "@type": "WebSite",
      name: "carprices.ae",
      url: "https://carprices.ae/",
    },
    inLanguage: "en",
  };

  return (
    <>
      {/* JSON-LD for Breadcrumbs */}
      <Script
        id="ld-breadcrumb-used-cars"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* JSON-LD for the listing collection */}
      <Script
        id="ld-collection-used-cars"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />

      <div>
        <ShozonAdsList />
      </div>
    </>
  );
}
