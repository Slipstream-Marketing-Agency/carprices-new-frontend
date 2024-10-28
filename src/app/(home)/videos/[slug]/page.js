"use client"

import React, { useEffect, useState } from 'react';

const VideoPage = ({ params }) => {
    const { slug } = params;
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}car-videos/${slug}`);
            const data = await response.json();
            setVideo(data);
            setLoading(false);
        };

        fetchVideo();
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!video) {
        return <div>Video not found.</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
            <p className="text-lg mb-4">{video.description}</p>

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
                        height="800"
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
    );
};

export default VideoPage;
