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
      {" "}
      {blogs && (
        <div
          className={` ${disableMarginTop ? "" : "mt-4"} ${
            disableBorder ? "" : "border"
          } `}
        >
          {disableHeading ? "" : <h5 className="text-bold mb-4">{heading}</h5>}
          <div className="cursorPointer">
            {blogs?.map((blog) => (
              <Link
                className="cursorPointer"
                legacyBehavior
                href={`/news/${blog?.attributes?.slug}`}
                key={blog?.id}
              >
                <div className="fs-6 blog_wrapper px-2 py-1">
                  <div className="d-flex align-items-start gap-2">
                    <div className="latest_listing">
                      <Image
                        src={
                          blog?.attributes?.coverImage?.data?.attributes?.url ||
                          altImage
                        }
                        width={100}
                        height={100}
                        className="h-100 img-no-max-width"
                      />
                    </div>
                    <small className="text-bold blogFont  me-4">{`${
                      blog?.attributes?.title?.length > 20
                        ? `${blog?.attributes?.title?.slice(0, 50)}... `
                        : `${blog?.attributes?.title}`
                    }`}</small>
                  </div>
                  
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
