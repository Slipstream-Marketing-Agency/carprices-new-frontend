"use client"
import Link from "next/link";
import React from "react";
import { formatDateLong } from "@/utils/formatDate";

export default function StoryCard({ story }) {
  return (
    <Link
      href={`/web-stories/${story.slug}`}
      className="relative rounded-2xl"
      target="_blank"
    >
      <img 
        width="0"
        height="0"
        sizes="100vw"
        src={story.coverImage.url}
        alt={story.title}
        className="object-cover w-full md:h-96 h-76 rounded-2xl"
      />
      <div className="m-2 absolute bottom-0 left-0 right-0 py-3 p-2 bg-opacity-50 bg-black rounded-2xl text-white">
        <h4 className="md:text-sm text-xs text-white font-semibold mb-0"> {story.title}</h4>
        <span className="text-xs font-light mt-1">
          {formatDateLong(story.publishedAt)}
        </span>
      </div>
    </Link>
  );
}

