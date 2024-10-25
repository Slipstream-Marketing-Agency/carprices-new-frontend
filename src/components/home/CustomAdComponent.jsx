import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CustomAdComponent() {
    return (
        <Link
            href="/news/Ferrari-V12-has-arrived-again-with-the-12cilindri-redlines-at-9500rpm"
            className="w-full h-full"
        >
            {/* Mobile Banner */}
            <div className="md:hidden w-full h-auto">
                <Image
                    loading="lazy"
                    alt="Banner-Sponsored-Mobile"
                    src="/assets/custom-ads/Banner-Sponsored-Mobile.webp"
                    width={600} // Adjust based on actual image dimensions for mobile
                    height={300} // Adjust based on actual image dimensions for mobile
                    sizes="100vw"
                    className="object-contain w-full h-full mt-10 mb-3"
                />
            </div>

            {/* Desktop Banner */}
            <div className="hidden md:block w-full h-auto">
                <Image
                    loading="lazy"
                    alt="Banner-Sponsored-Desktop"
                    src="/assets/custom-ads/Banner-Sponsored-Desktop.webp"
                    width={1200} // Adjust according to the actual image size
                    height={400} // Adjust according to the actual image size
                    sizes="(min-width: 769px) 1200px"
                    className="object-contain w-full h-full mt-10 md:mb-0 mb-3"
                />
            </div>
        </Link>
    );
}
