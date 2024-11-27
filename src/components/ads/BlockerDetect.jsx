'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BlockDetector = () => {
    const [adblockDetected, setAdblockDetected] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const detectAdblock = async () => {
            try {
                // Attempt to load a common ad-related script
                const response = await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { method: 'HEAD' });

                // If the fetch succeeds, adblock is not active
                if (response.ok) {
                    setAdblockDetected(false);
                } else {
                    setAdblockDetected(true);
                }
            } catch (error) {
                // If the request fails, adblock is likely active
                setAdblockDetected(true);
            }
        };

        detectAdblock();
    }, []);

    if (!adblockDetected) {
        return null; // Render nothing if no ad blocker is detected
    }

    return (
        <div className="bg-black/85 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-5 w-full max-w-2xl max-h-full">
                <div className="p-2 bg-gray-800 text-white rounded-lg border shadow-sm w-full">
                    <div className="px-6 py-4">
                        <h4 className="text-3xl font-semibold leading-none tracking-tight">
                            Content Blocked by Adblock
                        </h4>
                    </div>

                    <div className="px-6">
                        <p className="text-lg">
                        We see you’ve enabled an ad blocker, and we completely understand your need for a clutter-free experience. However, ads are what keep our platform alive, allowing us to bring you the valuable, free content you love. By whitelisting our site or pausing your ad blocker, you help us continue creating and sharing content that matters to you. Thank you for supporting us—we truly appreciate it!
                        </p>
                    </div>

                    <button
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-6 text-white bg-blue-600 m-4 ml-6"
                        onClick={() => router.refresh()}
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlockDetector;
