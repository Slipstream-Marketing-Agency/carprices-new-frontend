import StoreProvider from "../../../providers/StoreProvider";

export const metadata = {
  title: "Write a Car Review - Share Your Experience | CarPrices.ae",
  description: "Share your car experience with CarPrices.ae! Write reviews to help others explore car models, specs, and features in UAE. Join our community of informed drivers today.",
  alternates: {
    canonical: "/write-review",
  },
  keywords: "write car review, car reviews UAE, share car experience, car model review, carprices.ae reviews",
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "CarPrices.ae Team" }],
}

export default function ReviewsLayout({ children }) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}
