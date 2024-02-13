import React from "react";
import Link from "next/link";
import altImage from "../../public/assets/images/blog-alt-image.png";
import Image from "next/image";
import { useRouter } from "next/router";
import useTranslate from "../utils/useTranslate";
export default function BlogRelated({
  blogs,
  heading,
  disableMarginTop,
  disableBorder,
  disableHeading,
}) {
  return (
    <>
      {blogs.length > 0 && (
        <div
          className={`blog_wrapper ${disableMarginTop ? "" : "mt-4"} ${
            disableBorder ? "" : "border"
          } `}
        >
          <div className="cursorPointer">
            {blogs?.map((blog) => (
              <Link
                legacyBehavior
                href={`/news/${blog?.attributes?.articles?.data[0]?.attributes?.slug}`}
              >
                <div className="fs-6 blog_wrapper px-2 py-1">
                  <div className="d-flex align-items-center gap-2">
                    <div className="latest_listing">
                      <Image
                        src={
                          blog?.attributes?.articles?.data[0]?.attributes
                            ?.coverImage?.data?.attributes?.url
                            ? blog?.attributes?.articles?.data[0]?.attributes
                                ?.coverImage?.data?.attributes?.url
                            : altImage
                        }
                        width={100}
                        height={100}
                        className="h-100 img-no-max-width"
                      />
                    </div>
                    <small className="text-bold blogFont me-4">{`${
                      blog?.attributes?.articles?.data[0]?.attributes?.title
                        ?.length > 40
                        ? `${blog?.attributes?.articles?.data[0]?.attributes?.title?.slice(
                            0,
                            63
                          )} ...`
                        : `${blog?.attributes?.articles?.data[0]?.attributes?.title}`
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
