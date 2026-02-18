'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BlockDetector = () => {
    const [adblockDetected, setAdblockDetected] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if user previously dismissed the message
        const isDismissed = localStorage.getItem('adblock-dismissed');
        if (isDismissed === 'true') {
            setDismissed(true);
            return;
        }

        const detectAdblock = async () => {
            try {
                // Add timeout to prevent hanging
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000);

                // Create a bait element to test for ad blockers
                const baitElement = document.createElement('div');
                baitElement.className = 'textads banner-ads banner_ads ad-placement ads-placement';
                baitElement.style.height = '1px';
                document.body.appendChild(baitElement);

                // Wait a bit for ad blockers to potentially hide the element
                await new Promise(resolve => setTimeout(resolve, 100));

                // Check if bait element was hidden by ad blocker
                const isHidden = baitElement.offsetHeight === 0 || 
                                window.getComputedStyle(baitElement).display === 'none' ||
                                window.getComputedStyle(baitElement).visibility === 'hidden';

                document.body.removeChild(baitElement);

                if (isHidden) {
                    // Only set as detected if bait test confirms
                    setAdblockDetected(true);
                    clearTimeout(timeoutId);
                    return;
                }

                // Secondary check: Try to fetch ad script (only if bait test passed)
                try {
                    const response = await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { 
                        method: 'HEAD',
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        setAdblockDetected(true);
                    }
                } catch (fetchError) {
                    clearTimeout(timeoutId);
                    // Only consider it blocked if it's not a network error
                    if (fetchError.name !== 'AbortError' && fetchError.message.includes('block')) {
                        setAdblockDetected(true);
                    }
                }
            } catch (error) {
                // Don't block on errors - be conservative
                console.log('Ad detection check completed');
            }
        };

        // Delay the check slightly to avoid false positives during page load
        const timer = setTimeout(() => {
            detectAdblock();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setDismissed(true);
        localStorage.setItem('adblock-dismissed', 'true');
    };

    const handleContinueAnyway = () => {
        handleDismiss();
    };

    if (!adblockDetected || dismissed) {
        return null; // Render nothing if no ad blocker is detected or if dismissed
    }

    return (
        <div className="bg-black/85 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
            <div className="relative p-5 w-full max-w-2xl max-h-full">
                <div className="p-2 bg-gray-800 text-white rounded-lg border shadow-sm w-full">
                    {/* Close button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="px-6 py-4">
                        <h4 className="text-3xl font-semibold leading-none tracking-tight">
                            Ad Blocker Detected
                        </h4>
                    </div>

                    <div className="px-6">
                        <p className="text-lg">
                        We see you've enabled an ad blocker, and we completely understand your need for a clutter-free experience. However, ads are what keep our platform alive, allowing us to bring you the valuable, free content you love. By whitelisting our site or pausing your ad blocker, you help us continue creating and sharing content that matters to you. Thank you for supporting us—we truly appreciate it!
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 m-4 ml-6">
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-6 text-white bg-blue-600"
                            onClick={() => router.refresh()}
                        >
                            I've Disabled Adblock
                        </button>
                        <button
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-6 text-white bg-gray-600 hover:bg-gray-700"
                            onClick={handleContinueAnyway}
                        >
                            Continue Anyway
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlockDetector;
