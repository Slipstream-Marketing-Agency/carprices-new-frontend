import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <div className="cursor-pointer">
          {blogs?.map((blog) => (
            <Link
              legacyBehavior
              href={`/news/${blog?.attributes?.slug}`}
              key={blog?.id}
            >
              <div className="w-full">
                <div className="flex my-2">
                  <Image
                    src={
                      blog?.attributes?.coverImage?.data?.attributes?.url ||
                      "/assets/images/blog-alt-image.png"
                    }
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                  <p className="text-sm mx-2  text-gray-600 line-clamp-2">{`${
                    blog?.attributes?.title?.length > 20
                      ? `${blog?.attributes?.title?.slice(0, 50)}... `
                      : `${blog?.attributes?.title}`
                  }`}</p>
                </div>
                <hr className="my-2" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
