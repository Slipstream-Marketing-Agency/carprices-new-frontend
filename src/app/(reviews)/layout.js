import StoreProvider from "../../../providers/StoreProvider";
import "./../globals.css";

export const metadata = {
  title: "Write a Car Review - Share Your Experience | CarPrices.ae",
  description: "Share your car experience with CarPrices.ae! Write reviews to help others explore car models, specs, and features in UAE. Join our community of informed drivers today.",
  charset: "UTF-8",
  alternates: {
    canonical: `https://carprices.ae/write-review`,
  },
  keywords: "write car review, car reviews UAE, share car experience, car model review, carprices.ae reviews",
  robots: {
    index: true,
    follow: true,
  },
  author: "CarPrices.ae Team",
  icon: "./favicon.ico",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4857144107996534"
          crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-4857144107996534" />
      </head>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

