import Image from "next/image";
import Link from "next/link";
import React from "react";
import altImage from "../../public/assets/images/blog-alt-image.png";

export default function BlogRecent({
  blogs,
  heading,
  disableMarginTop,
  disableBorder,
  disableHeading,
}) {
  return (
    <>
      {blogs && (
        <div className="tw-cursor-pointer">
          {blogs?.map((blog) => (
            <Link
              legacyBehavior
              href={`/news/${blog?.attributes?.slug}`}
              key={blog?.id}
            >
              <div className="tw-w-full">
                <div className="tw-flex tw-my-2">
                  <Image
                    src={
                      blog?.attributes?.coverImage?.data?.attributes?.url ||
                      altImage
                    }
                    width={40}
                    height={40}
                    className="tw-object-cover"
                  />
                  <p className="tw-text-sm tw-mx-2  tw-text-gray-600 tw-line-clamp-2">{`${
                    blog?.attributes?.title?.length > 20
                      ? `${blog?.attributes?.title?.slice(0, 50)}... `
                      : `${blog?.attributes?.title}`
                  }`}</p>
                </div>
                <hr className="tw-my-2" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
