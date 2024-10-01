import Link from "next/link";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import moment from "moment";

export default function StoryCard({ story }) {
  return (
    <Link
      href={`/web-stories/${story.slug}`}
      className="tw-relative tw-rounded-2xl"
    >
      <Image
        width="0"
        height="0"
        sizes="100vw"
        src={story.coverImage.url}
        alt={story.title}
        className="tw-object-cover tw-w-full md:tw-h-96 tw-h-76 tw-rounded-2xl"
      />
      <div className="tw-m-2 tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-py-3 tw-p-2 tw-bg-opacity-50 tw-bg-black tw-rounded-2xl tw-text-white">
        <h6 className="tw-text-white tw-font-bold tw-mb-0"> {story.title}</h6>
        <p className="tw-text-xs tw-font-light tw-mt-1">
          {moment(story.publishedAt).format("MMMM Do YYYY")}
        </p>
      </div>
    </Link>
  );
}
