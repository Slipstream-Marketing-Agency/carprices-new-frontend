import Link from "next/link";

export const metadata = {
  title: "Page Not Found - CarPrices.ae",
  description: "The page you are looking for does not exist. Browse car prices, comparisons, and reviews at CarPrices.ae.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        Let us help you find what you need.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Go to Homepage
        </Link>
        <Link
          href="/brands"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          Browse Car Brands
        </Link>
        <Link
          href="/news"
          className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Read Auto News
        </Link>
      </div>
    </div>
  );
}
