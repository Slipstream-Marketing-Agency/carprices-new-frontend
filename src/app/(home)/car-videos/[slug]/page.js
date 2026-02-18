

import Ad300x600 from '@/components/ads/Ad300x600';
import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = params;
    let video = null;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-videos/${slug}`, { next: { revalidate: 60 } });
        if (response.ok) {
            video = await response.json();
        } else {
            notFound(); // Trigger a 404 if the video is not found
        }
    } catch (error) {
if (process.env.NODE_ENV === 'development') { console.error('Error fetching video metadata:', error); }
        notFound(); // Redirect to 404 on error as well
    }

    const title = `${video?.title || "Car Video"} - Watch Now on CarPrices.ae`;
    const description = video?.description || `Watch the latest car video on CarPrices.ae. Find in-depth reviews, highlights, and insights on various car models.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/car-videos/${slug}`,
        },
        keywords: `${video?.title || "Car video"}, car video UAE, car reviews UAE, ${video?.title ? `${video.title} review` : "car highlights"}, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: "CarPrices.ae Team" }],
        openGraph: {
            title,
            description,
            url: `/car-videos/${slug}`,
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

const VideoPage = async ({ params }) => {
    const { slug } = params;
    let video = null;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-videos/${slug}`, { next: { revalidate: 60 } });
        if (response.ok) {
            video = await response.json();
        } else {
            // Trigger a 404 if the video is not found
            notFound();
        }
    } catch (error) {
if (process.env.NODE_ENV === 'development') { console.error('Error fetching video:', error); }
        notFound(); // Redirect to 404 on error as well
    }

    return (
        <div className="container mx-auto mt-8 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-9 shadow-md p-4 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
                <p className="mb-4">{video.description}</p>

                {/* Video Player */}
                <div className="video-player mb-8">
                    {video.hostedVideo ? (
                        <video controls className="w-full h-auto">
                            <source src={video.hostedVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : video.youtube_url ? (
                        <iframe
                            width="100%"
                            height="550"
                            src={`https://www.youtube.com/embed/${new URL(video.youtube_url).searchParams.get('v')}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.title}
                        ></iframe>
                    ) : (
                        <img src={video.thumbnail || '/default-thumbnail.jpg'} alt={video.title} className="w-full h-auto" />
                    )}
                </div>
            </div>
            <div className="col-span-12 md:col-span-3">
                <div className="sticky top-16">
                    <Suspense fallback={<div>Loading ad...</div>}>
                        <Ad300x600 dataAdSlot="1077828318" />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
