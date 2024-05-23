import MainLayout from "@/src/layout/MainLayout";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React from "react";

export default function privacy() {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  return (
    <MainLayout
      pageMeta={{
        title: "Privacy Policy - Carprices.ae",
        description:
          "Protecting your privacy is our top priority. Read our privacy policy to understand how we collect, use, and safeguard your personal information. Your trust is important to us, and we are committed to maintaining the confidentiality of your data.",
        type: "Car Review Website",
      }}
    >
      <div className="tw-container tw-mx-auto tw-pt-10 tw-pb-24 tw-px-6 lg:tw-px-20">
        <h1 className="tw-text-4xl tw-font-bold tw-mb-10 tw-text-center">
          Privacy Policy
        </h1>
        <div className="tw-space-y-10">
          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <div className="tw-text-gray-700 tw-mb-6">
              <i className="bi bi-caret-right-fill tw-text-blue-500" /> Last
              Updated <span className="tw-font-semibold">20 Dec, 2023</span>
            </div>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              Slipstream Holdings Limited ("we", "our", "us") is committed to
              protecting your privacy. This privacy policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website www.carprices.ae in compliance with the General
              Data Protection Regulation (GDPR).
            </p>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">
              Information We Collect
            </h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              We may collect personal information from you in various ways
              including when you visit our site, register on the site, fill out
              a form, and in connection with other activities, services,
              features, or resources we make available on our site.
            </p>
            <ul className="tw-list-disc tw-list-inside tw-text-gray-700 tw-ml-4">
              <li className="tw-my-2">Name</li>
              <li className="tw-my-2">Email address</li>
              <li className="tw-my-2">Phone number</li>
              <li className="tw-my-2">
                Any other personal information you willingly provide
              </li>
            </ul>
            <p className="tw-text-gray-700 tw-leading-relaxed tw-mt-4">
              Information we collect automatically:
            </p>
            <ul className="tw-list-disc tw-list-inside tw-text-gray-700 tw-ml-4">
              <li className="tw-my-2">Browsing behavior and preferences</li>
            </ul>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">
              Lawful Basis for Processing
            </h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              We process your personal data based on the following lawful bases:
            </p>
            <ul className="tw-list-disc tw-list-inside tw-text-gray-700 tw-ml-4">
              <li className="tw-my-2">Your consent</li>
              <li className="tw-my-2">
                The necessity to perform a contract with you
              </li>
              <li className="tw-my-2">Compliance with legal obligations</li>
              <li className="tw-my-2">
                Legitimate interests pursued by us or a third party
              </li>
            </ul>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">
              How We Use Your Information
            </h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              We may use the information we collect from you in the following
              ways:
            </p>
            <ul className="tw-list-disc tw-list-inside tw-text-gray-700 tw-ml-4">
              <li className="tw-my-2">
                To personalize your experience and respond better to your
                individual needs
              </li>
              <li className="tw-my-2">
                To improve our website and service offerings
              </li>
              <li className="tw-my-2">
                To send periodic emails for updates, promotions, or other
                products and services (only if you have opted-in to receive such
                communications)
              </li>
            </ul>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">
              Protection of Your Information
            </h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              We adopt appropriate data collection, storage, and processing
              practices and security measures to protect against unauthorized
              access, alteration, disclosure, or destruction of your personal
              information, username, password, transaction information, and data
              stored on our site.
            </p>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">
              Sharing Your Information
            </h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              We do not sell, trade, or otherwise transfer to outside parties
              your Personally Identifiable Information unless we provide users
              with advance notice and obtain their explicit consent. This does
              not include website hosting partners and other parties who assist
              us in operating our website, conducting our business, or serving
              our users so long as those parties agree to keep this information
              confidential.
            </p>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">Your Rights</h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              You have the following rights regarding your personal data:
            </p>
            <ul className="tw-list-disc tw-list-inside tw-text-gray-700 tw-ml-4">
              <li className="tw-my-2">
                The right to access – You have the right to request copies of
                your personal data.
              </li>
              <li className="tw-my-2">
                The right to rectification – You have the right to request that
                we correct any information you believe is inaccurate or complete
                information you believe is incomplete.
              </li>
              <li className="tw-my-2">
                The right to erasure – You have the right to request that we
                erase your personal data under certain conditions.
              </li>
              <li className="tw-my-2">
                The right to restrict processing – You have the right to request
                that we restrict the processing of your personal data under
                certain conditions.
              </li>
              <li className="tw-my-2">
                The right to object to processing – You have the right to object
                to our processing of your personal data under certain
                conditions.
              </li>
              <li className="tw-my-2">
                The right to data portability – You have the right to request
                that we transfer the data that we have collected to another
                organization or directly to you under certain conditions.
              </li>
            </ul>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">Cookies</h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              Our website may use "cookies" to enhance user experience. Your web
              browser places cookies on your hard drive for record-keeping
              purposes and sometimes to track information about them. You can
              choose to set your web browser to refuse cookies or to alert you
              when cookies are being sent. If they do so, note that some parts
              of the site may not function properly.
            </p>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">Third-Party Websites</h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              Our website may contain links to third-party websites. We do not
              control and are not responsible for the content or practices of
              these websites. This privacy policy does not apply to third-party
              websites.
            </p>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">Your Consent</h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              By using our site, you consent to our privacy policy. If you do
              not agree with our policies and practices, your choice is not to
              use our site.
            </p>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">
              Changes to Our Privacy Policy
            </h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              Slipstream Holdings Limited reserves the right to update or change
              our privacy policy at any time. We will notify you of any changes
              by posting the new privacy policy on our website. You are advised
              to review this privacy policy periodically for any changes.
              Changes to this privacy policy are effective when they are posted
              on this page.
            </p>
          </div>

          <div className="tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8">
            <h4 className=" tw-font-semibold tw-mb-4">Contacting Us</h4>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              If you have any questions about this privacy policy, the practices
              of this site, or your dealings with this site, please contact us
              at:
            </p>
            <address className="tw-not-italic tw-text-gray-700 tw-leading-relaxed">
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
              <a
                href="mailto:info@carprices.ae"
                className="tw-text-blue-500 tw-underline"
              >
                info@carprices.ae
              </a>
            </address>
            <p className="tw-text-gray-700 tw-leading-relaxed">
              Thank you for visiting www.carprices.ae. Your privacy is important
              to us, and we are committed to protecting your personal
              information.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
