import React from "react";
import Header from "../components/Home1/Header";
import Footer1 from "../components/Footer/Footer1";
import Topbar from "../components/Home1/Topbar";
import Breadcrumb from "./Breadcrumb";
import Modals from "../components/Home1/Modals";
import Head from "next/head";
import { useRouter } from "next/router";

function MainLayout({ children, pageMeta }) {
  const router = useRouter();
  const meta = {
    title:
      "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - Carprices.ae",
    description:
      "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
    type: "Car Review Website",
    ...pageMeta,
  };

  const isSearchCarsPage = router.asPath.startsWith("/search-cars");

  const canonicalUrl = isSearchCarsPage
    ? "https://carprices.ae/search-cars"
    : "https://carprices.ae" + router.asPath.split("?")[0];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css"
        />
        {/* Open Graph */}
        <meta
          property="og:url"
          content={`https://carprices.ae${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Carprices.ae" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        {meta.image && (
          <meta
            property="og:image"
            content={process.env.NEXT_PUBLIC_S3_URL + meta.image}
          />
        )}
        {meta.date && (
          <meta propert="article:published_time" content={meta.date} />
        )}
      </Head>
      <Topbar />
      <Modals />
      <Header />
      {/* <Breadcrumb /> */}
      <main className="body-height"> {children}</main>
      <Footer1 />
    </>
  );
}

export default MainLayout;
