import React from 'react';
import Link from 'next/link';

export default function CustomAdComponent() {
    return (
        <Link
            href="/news/Ferrari-V12-has-arrived-again-with-the-12cilindri-redlines-at-9500rpm"
            className="w-full h-full"
        >
            {/* Mobile Banner */}
            <div className="md:hidden w-full h-auto">
                <img
                    loading="lazy"
                    alt="Banner-Sponsored-Mobile"
                    src="/assets/custom-ads/Banner-Sponsored-Mobile.webp"
                    width={600}
                    height={300}
                    className="object-contain w-full h-full mt-10 mb-3"
                />
            </div>

            {/* Desktop Banner */}
            <div className="hidden md:block w-full h-auto">
                <img
                    loading="lazy"
                    alt="Banner-Sponsored-Desktop"
                    src="/assets/custom-ads/Banner-Sponsored-Desktop.webp"
                    width={1200}
                    height={400}
                    className="object-contain w-full h-full mt-10 md:mb-0 mb-3"
                />
            </div>
        </Link>
    );
}

