import ContactForm from '@/components/contact-us/ContactForm';
import { fetchMetaData } from '@/lib/fetchMetaData';
import React from 'react'

export async function generateMetadata({ params }) {
    const slug = "contact-us"

    // Fetch dynamic metadata for the privacy policy page
    const metaData = await fetchMetaData(slug);

    const title = metaData?.title ? metaData.title : "Contact Us - Carprices.ae";
    const description = metaData?.description
        ? metaData.description
        : "Contact us for any inquiries, suggestions, or feedback. We are here to assist you. Reach out to CarPrices.ae - your trusted companion in the automotive world. Let's connect and make your car journey exceptional.";

    return {
        title,
        description,
        alternates: {
            canonical: `/contact-us`,
        },
        keywords: metaData?.keywords || "contact CarPrices.ae, car inquiries UAE, car suggestions UAE, car feedback UAE, automotive assistance UAE, trusted automotive companion, car journey UAE, car prices UAE, contact us CarPrices.ae, automotive world UAE, connect with CarPrices.ae",
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title,
            description,
            url: `/contact-us`,
            siteName: "CarPrices.ae",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}
export default function Contact() {

    return (
        <ContactForm />
    )
}

