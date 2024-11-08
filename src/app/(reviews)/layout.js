import StoreProvider from "../../../providers/StoreProvider";
import "./../globals.css";

export const metadata = {
  title: "Write a Car Review - Share Your Experience | CarPrices.ae",
  description: "Share your car experience with CarPrices.ae! Write reviews to help others explore car models, specs, and features in UAE. Join our community of informed drivers today.",
  charset: "UTF-8",
  alternates: {
    canonical: `https://carprices.ae/review/write`,
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
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

