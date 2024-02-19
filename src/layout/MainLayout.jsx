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
        {" "}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
      </Head>
      <Topbar />
      <Modals />
      <Header />
      {/* <Breadcrumb /> */}
      <main > {children}</main>
      <Footer1 />
    </>
  );
}

export default MainLayout;
