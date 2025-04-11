import "./../avatr.css";
// import Header from "@/components/promo/Header";
// import Footer from "@/components/promo/Footer";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import StoreProvider from "../../../providers/StoreProvider";

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
      </head>
      <body className="antialiased font-sans">
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
