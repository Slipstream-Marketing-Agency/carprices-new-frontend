import React from "react";
import Header from "../components/Home1/Header";
import Footer1 from "../components/Footer/Footer1";
import Topbar from "../components/Home1/Topbar";
import Breadcrumb from "./Breadcrumb";
import Modals from "../components/Home1/Modals";
import Head from "next/head";
import { useRouter } from "next/router";

function MainLayout({ children }) {
  const router = useRouter();

  const isSearchCarsPage = router.asPath.startsWith("/search-cars");

  const canonicalUrl = isSearchCarsPage
    ? "https://carprices.ae/search-cars"
    : "https://carprices.ae" + router.asPath.split("?")[0];

  return (
    <>
      <Head>
       
        
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
