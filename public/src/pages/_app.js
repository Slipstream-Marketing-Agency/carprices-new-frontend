import "primereact/resources/themes/lara-light-indigo/theme.css";
import "rc-slider/assets/index.css";
import '/styles/carpricesDesktop.css'
import '/styles/carpricesMobile.css'
import "primereact/resources/primereact.min.css";
import { useEffect } from "react";
import { motion } from 'framer-motion'
import CookieConsent from "@/components/common/CookieConsent";

export default function App({ Component, pageProps }) {

  return (
    <>
      {/* <CookieConsent/> */}
      <Component {...pageProps} />
    </>
  )
}
