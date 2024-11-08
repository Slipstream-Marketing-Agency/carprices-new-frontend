import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { Poppins } from "next/font/google";
import "./../globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";
import StoreProvider from "../../../providers/StoreProvider";

// Load Google Fonts (in this case, Poppins)
const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
  style: ["normal"], // You can add "italic" if needed
  subsets: ["latin"], // Specify the subset (for example, 'latin')
  display: "swap", // Optimizes performance by using fallback fonts until the font loads
});

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


export default function RootLayout({ children, params }) {

  console.log(params, "paramsparams");

  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
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
        /> <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1194042761803181&ev=PageView&noscript=1"
          />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4857144107996534"
            crossOrigin="anonymous"
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

      </body>
    </html>
  );
}
