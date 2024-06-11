import React from "react";

import PressReleaseList from "@/src/components/press-releases/PressReleaseList";
import MainLayout from "@/src/layout/MainLayout";
import { useState, useEffect } from "react";
import Ad300x600 from "@/src/components/ads/Ad300x600";
import SubscribeForm from "@/src/components/press-releases/SubscribeForm";

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

  console.log(pressReleases, "pressReleases");

  return (
    <MainLayout>
      <div className="tw-container tw-mx-auto tw-px-4 tw-my-8">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-gap-8">
          <div className="lg:tw-col-span-3">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-8">
              <h1 className="tw-font-bold">Our Press Releases</h1>
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
          <div className="tw-mt-8">
              <SubscribeForm/>
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
