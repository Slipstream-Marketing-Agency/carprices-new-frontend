

import Ad300x600 from '@/components/ads/Ad300x600';
import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = params;
    let video = null;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-videos/${slug}`, { cache: "no-store" });
        if (response.ok) {
            video = await response.json();
        } else {
            notFound(); // Trigger a 404 if the video is not found
        }
    } catch (error) {
        console.error('Error fetching video metadata:', error);
        notFound(); // Redirect to 404 on error as well
    }

    // Set up metadata based on video details
    const metaData = {
        title: `${video?.title || "Car Video"} - Watch Now on CarPrices.ae`,
        description: video?.description || `Watch the latest car video on CarPrices.ae. Find in-depth reviews, highlights, and insights on various car models.`,
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/car-videos/${slug}`,
        },
        keywords: `${video?.title || "Car video"}, car video UAE, car reviews UAE, ${video?.title ? `${video.title} review` : "car highlights"}, CarPrices.ae`,
        robots: {
            index: true,
            follow: true,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: video?.title || "Car Video",
            description: video?.description || "Watch the latest car video on CarPrices.ae",
            thumbnailUrl: video?.thumbnail || "/default-thumbnail.jpg",
            uploadDate: video?.uploadDate || new Date().toISOString(),
            contentUrl: video?.hostedVideo || video?.youtube_url || "",
            embedUrl: video?.youtube_url ? `https://www.youtube.com/embed/${new URL(video.youtube_url).searchParams.get('v')}` : "",
        },
        author: "CarPrices.ae Team",
        icon: "./favicon.ico",
    };

    return metaData;
}

const VideoPage = async ({ params }) => {
    const { slug } = params;
    let video = null;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-videos/${slug}`, { cache: "no-store" });
        if (response.ok) {
            video = await response.json();
        } else {
            // Trigger a 404 if the video is not found
            notFound();
        }
    } catch (error) {
        console.error('Error fetching video:', error);
        notFound(); // Redirect to 404 on error as well
    }

    return (
        <div className="container mx-auto mt-8 grid grid-cols-12">
            <div className="col-span-9 shadow-md p-4 rounded-lg">
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
            <div className="col-span-3">
                <div className="sticky top-0">
                    <Suspense fallback={<div>Loading ad...</div>}>
                        <Ad300x600 dataAdSlot="3792539533" />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
