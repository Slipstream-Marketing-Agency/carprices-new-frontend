import "./../avatr.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import StoreProvider from "../../../providers/StoreProvider";
import Script from "next/script";

export const metadata = {
  title: "AVATR OFFER FORM - OFFICIAL AVATR DEALER IN UAE",
  description: "",
};

export default function PromoLayout({ children }) {
  return (
    <>
      {/* Google Analytics for promo pages */}
      <Script
        id="promo-gtm"
        strategy="afterInteractive"
      >
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PQSJR4KG');
        `}
      </Script>

      <StoreProvider>
        <NavBar />
        {children}
        <Footer />
      </StoreProvider>
    </>
  );
}
