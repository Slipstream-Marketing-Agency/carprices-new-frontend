import React from "react";

import PressReleaseList from "@/src/components-old/press-releases/PressReleaseList";
import MainLayout from "@/src/layout/MainLayout";
import { useState, useEffect } from "react";
import Ad300x600 from "@/src/components-old/ads/Ad300x600";
import SubscribeForm from "@/src/components-old/press-releases/SubscribeForm";

export default function index({ initialPressReleases }) {
  const [pressReleases, setPressReleases] = useState(initialPressReleases);
  const [sortOrder, setSortOrder] = useState("Trending");

  useEffect(() => {
    const fetchSortedPressReleases = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}press-releases?populate=*`
      );
      const sortedPressReleases = await response.json();
      setPressReleases(sortedPressReleases.data);
    };
    fetchSortedPressReleases();
  }, [sortOrder]);

  return (
    <MainLayout
      pageMeta={{
        title: " CarPrices.ae - Latest Automotive News and Updates",
        description:
          "Stay informed with CarPrices.ae for the latest in the automotive industry. Get updates on new car launches, industry trends, and company announcements. Your one-stop source for automotive news and insights.",
        type: "Car Review Website",
      }}
    >
      <div className="tw-container tw-mx-auto tw-px-4 tw-my-8">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-gap-8">
          <div className="lg:tw-col-span-3">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-8">
              <div className="white_bg_wrapper">
                <h1 className="fw-bold mt-2 box_header">
                  CarPrices.ae in the media
                </h1>
                <p className="my-2">
                  CarPrices.ae is getting noticed for its innovative approach in
                  simplifying car buying and the while purchase experience.
                </p>
              </div>
              {/* <div>
            <label className="tw-mr-2">Sort by:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="tw-border tw-px-2 tw-py-1 tw-rounded"
            >
              <option value="Trending">Trending</option>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div> */}
            </div>
            <PressReleaseList pressReleases={pressReleases} />
          </div>
          <div className="lg:tw-col-span-1">
            <div className="tw-mt-0">
              <SubscribeForm />
            </div>
            <div className="sticky-sidebar">
              <div className="ad-container">
                <Ad300x600 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}press-releases?populate=*`
  );
  const initialPressReleases = await response.json();

  return {
    props: { initialPressReleases: initialPressReleases.data },
  };
}
