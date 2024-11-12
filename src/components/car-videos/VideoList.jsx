import React from 'react';
import Link from 'next/link';

const VideoList = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-4 ">
      {videos.map(video => (
        <div key={video.id} className="border rounded-lg overflow-hidden shadow-md">
          <Link href={`/car-videos/${video.slug}`}>
            <img
              src={video.thumbnail || '/default-thumbnail.jpg'}
              alt={video.title}
              className="w-full h-36 object-cover"
            />
            <div className="p-4">
              <h3 className="md:text-md tex-sm font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2 ">{video.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
