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
    // <>
    //   <TermsClient />
    // </>
    <div className="container mx-auto pt-10 pb-24 px-6 lg:px-20">
      <h1 className="text-4xl font-bold mb-10 text-center">Terms and Conditions</h1>
      <div className="space-y-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-gray-700 mb-6">
            <i className="bi bi-caret-right-fill text-blue-500" /> Last
            Updated <span className="font-semibold">20 Dec, 2023</span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Welcome to www.carprices.ae (“CarPrices”). These terms and conditions
            outline the rules and regulations for the use of Slipstream Holdings
            Limited&apos;s Website. By accessing this Website, you accept these terms
            and conditions. Do not continue to use www.carprices.ae if you do not
            agree to the terms stated on this page.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h4 className="font-semibold mb-4">License</h4>
          <p className="text-gray-700 leading-relaxed">
            Unless otherwise stated, Slipstream Holdings Limited owns the
            intellectual property rights for all material on the Website. All
            intellectual property rights are reserved. You may access this material
            for personal use subject to restrictions set in these terms and
            conditions.
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li className="my-2">You must not republish material from this Website.</li>
            <li className="my-2">You must not sell, rent, or sub-license material.</li>
            <li className="my-2">
              You must not reproduce, duplicate, or copy material for commercial
              purposes.
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h4 className="font-semibold mb-4">User Responsibilities</h4>
          <p className="text-gray-700 leading-relaxed">
            As a user, you agree to:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li className="my-2">
              Provide accurate and up-to-date information when registering or using
              the Website.
            </li>
            <li className="my-2">
              Refrain from using the Website for illegal or unauthorized purposes.
            </li>
            <li className="my-2">
              Not engage in activities that disrupt or interfere with the Website’s
              operation.
            </li>
          </ul>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h4 className="font-semibold mb-4">Limitation of Liability</h4>
          <p className="text-gray-700 leading-relaxed">
            Slipstream Holdings Limited shall not be held liable for any damages
            arising from your use of the Website, including, but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li className="my-2">Loss of data or profits</li>
            <li className="my-2">Business interruption</li>
            <li className="my-2">Unauthorized access to your data</li>
          </ul>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h4 className="font-semibold mb-4">Indemnification</h4>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify and hold Slipstream Holdings Limited harmless
            from any claims, damages, and expenses, including attorney fees, arising
            out of your use of the Website or breach of these terms.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h4 className="font-semibold mb-4">Termination</h4>
          <p className="text-gray-700 leading-relaxed">
            Slipstream Holdings Limited reserves the right to terminate or suspend
            your access to the Website without prior notice if you breach these
            terms and conditions.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h4 className="font-semibold mb-4">Governing Law</h4>
          <p className="text-gray-700 leading-relaxed">
            These terms and conditions are governed by and construed in accordance
            with the laws of the United Arab Emirates. Any disputes relating to
            these terms shall be subject to the exclusive jurisdiction of the courts
            in Abu Dhabi.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns regarding these terms, please
            contact us at:
          </p>
          <address className="not-italic text-gray-700 leading-relaxed">
            Slipstream Holdings Limited
            <br />
            DD-15-134-004 – 007
            <br />
            Level 15 WeWork Hub71
            <br />
            Al Khatem Tower
            <br />
            Abu Dhabi Global Market Square
            <br />
            Al Maryah Island
            <br />
            Abu Dhabi, United Arab Emirates
            <br />
            Email:{" "}
            <a href="mailto:info@carprices.ae" className="text-blue-500 underline">
              info@carprices.ae
            </a>
          </address>
        </div>
      </div>
    </div>

  );
}
