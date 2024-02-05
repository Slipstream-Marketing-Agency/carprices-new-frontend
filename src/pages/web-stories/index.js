import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import MainLayout from "@/src/layout/MainLayout";

import Image from "next/image";
import Ad970x250 from "@/src/components/ads/Ad970x250";
import Ad300x600 from "@/src/components/ads/Ad300x600";
import FeaturedImage from "@/src/utils/FeaturedImage";

export default function WebstoriesListing() {
  const [webStories, setWebStories] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setWebStories(null);
        const page = router.query.page || 1;
        setCurrentPage(Number(page));
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_OLD}webstory`
        );

        setWebStories(response.data.webstories);
        setTotalPages(response.data.totalPage);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(webStories, "respsss");

  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <MainLayout
      pageMeta={{
        title:
          "Latest Car News UAE: New Models, Launches, and Industry Insights - Carprices.ae",
        description:
          "Stay informed with the latest car news in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
        type: "Car Review Website",
      }}
    >
      <div className="container">
        <div className="my-1">
          <Ad970x250 dataAdSlot="1524950296" />
        </div>
        <div className="row mt-2 mb-4">
          <div className="col-xl-9 col-lg-8 col-md-7 col-sm-6 col-12">
            <div>
              <h1 className="fw-bold mt-2">Web Stories</h1>
              <div className="row mt-3 mb-3 p-0 m-0">
                <ul className="storyList marginBottom20">
                  {webStories &&
                    webStories.map((item, index) => (
                      <li key={index}>
                        <div className="webstoryCard">
                          <Link
                            href={`/web-stories/${item.slug}`}
                            target="_blank"
                            title={item?.title}
                            rel="noopener"
                          >
                            <FeaturedImage
                              width={250}
                              height={250}
                              src={item?.slides[0].image1}
                              alt={item?.title}
                              title={item?.title}
                              setIsLoading={setIsLoading}
                            />
                            <div className="storyDetail">
                              <h3 className="heading ">{item?.mainTitle}</h3>
                              <div className="date">
                                Carprices |{" "}
                                {moment(item.publishedAt).format(
                                  "MMM DD, YYYY"
                                )}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="my-3 d-flex justify-content-center">
                {/* <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  router={router}
                /> */}
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-12 right_section hide_mobile">
            <div className="d-flex flex-column mt-5 sticky_scroll">
              <Ad300x600 dataAdSlot="3530552137" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
