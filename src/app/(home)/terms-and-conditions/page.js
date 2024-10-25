import TermsClient from "@/components/terms-and-conditions/TermsClient";

export const metadata = {
  title: "Terms & Conditions - Carprices.ae",
  description:
    "Read and understand the Terms & Conditions of Carprices.ae. Stay informed about the guidelines and policies that govern your use of our website.",
  charset: "UTF-8",
  alternates: {
    canonical: "https://carprices.ae/terms-and-conditions",
  },
  keywords: "Carprices, Terms and Conditions, Policies, User Agreement, UAE",
  robots: {
    index: true,
    follow: true,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions - Carprices.ae",
    description:
      "Read the full Terms & Conditions of Carprices.ae to understand our guidelines and policies.",
    url: "https://carprices.ae/terms-and-conditions",
  },
  author: "Carprices.ae Team",
  icon: "/favicon.ico",
  manifest: "/site.webmanifest",
};

export default function TermsPage() {
  return (
    <>
      <TermsClient />
    </>
  );
}
