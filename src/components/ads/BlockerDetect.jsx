'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BlockDetector = () => {
    const [adblockDetected, setAdblockDetected] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const detectAdblock = async () => {
            const bait = document.createElement('div');
            bait.className = 'adsbox';
            bait.style.cssText = 'width: 1px; height: 1px; position: absolute; top: -10000px;';
            document.body.appendChild(bait);
            
            window.setTimeout(() => {
                if (bait.offsetParent === null || bait.offsetHeight === 0 || bait.offsetWidth === 0) {
                    setAdblockDetected(true);
                }
                document.body.removeChild(bait);
            }, 100);
        };

        detectAdblock();
    }, []);

    if (!adblockDetected) {
        return null;
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
                            We’ve noticed an ad blocker is enabled. While ads help support our free content, we respect your choice. Please consider whitelisting our website if you enjoy our content.
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
