import "./../avatr.css";
// import Header from "@/components/promo/Header";
// import Footer from "@/components/promo/Footer";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Poppins } from "next/font/google";
import "./../globals.css";
import StoreProvider from "../../../providers/StoreProvider";

// Load Google Fonts (in this case, Poppins)
const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
  style: ["normal"], // You can add "italic" if needed
  subsets: ["latin"], // Specify the subset (for example, 'latin')
  display: "swap", // Optimizes performance by using fallback fonts until the font loads
});

export const metadata = {
  title: "AVATR OFFER FORM - OFFICIAL AVATR DEALER IN UAE",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;700&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
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

           <script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PQSJR4KG');
          `}
        </script>

       
          
      </head>
      <body className={`${poppins.className} antialiased`}>
          
           <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQSJR4KG"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>
  
      <StoreProvider>
      <NavBar />




      </StoreProvider>
        {/* <Header /> */}
        {children}
        <Footer />
        
      </body>
    </html>
  );
}
