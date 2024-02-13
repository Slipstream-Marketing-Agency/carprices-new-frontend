import Layout from "@/components/layout/Layout";
import TopSearchedCars from "@/components/homePage/TopSearchedCars";
import FeaturedCars from "@/components/homePage/FeaturedCars";
import RecommendedCars from "@/components/homePage/RecommendedCars";
import PopularElectricCars from "@/components/homePage/PopularElectricCars";
import PopularBrands from "@/components/homePage/PopularBrands";
import TrendingNews from "@/components/homePage/TrendingNews";
import TopReviews from "@/components/homePage/TopReviews";
import Ad728x90 from "@/components/ads/Ad728x90";
import CompareToBuy from "@/components/homePage/compare-to-buy/CompareToBuy";
import FilterLayout from "@/components/homePage/find-car-multi-step-filter/FilterLayout";
import Ad300x600 from "@/components/ads/Ad300x600";
import axios from "axios";
import { useEffect, useState } from "react";
import ViewAllButton from "@/components/common/ViewAllButton";
import { useMediaQuery } from "react-responsive";
import MobileHome from "@/mobile/pages";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Webstories from "@/components/common/Webstories";

export default function Home(props) {
  const topSearched = props.topSearched.models
  const featured = props.featured.models
  // const recommended = props.recommended.models
  const electric = props.electric.models
  const brands = props.brands.brands
  const news = props.news
  const reviews = props.reviews
  const compareList = props.compareList
  const webStories = props.stories

  console.log(props,"propsmmmmm");

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  if (isMobile) {
    // 
    return (
      <>
        <MobileHome {...props} />
      </>
    )
  }

  return (
    <Layout pageMeta={{
      title: "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - Carprices.ae",
      description: "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
      type: "Car Review Website",
    }}>

      <div className="whiteBG mt-1">
        <Ad728x90 dataAdSlot="5962627056" />
        <div className="main_banner ">
          <div className="position-relative d-sm-block d-none">
            <div className="banner_wrap">
              <Image src={`/assets/images/hero/cp-banner.jpg`} fill priority={true} style={{ objectFit: "cover", objectPosition: "50% 70%" }} />
            </div>
          </div>
          <FilterLayout />
        </div>
        <Ad728x90 dataAdSlot="6306241985" />
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8 col-md-7 col-sm-6">
              <TopSearchedCars topSearched={topSearched} />
              <Ad728x90 dataAdSlot="4367254600" />
              <FeaturedCars featured={featured} />
              <Ad728x90 dataAdSlot="3054172934" />
              {/* <RecommendedCars recommended = {recommended}/>
              {/*<Ad728x90 />*/}
              <PopularElectricCars electric={electric} />

              <Ad728x90 dataAdSlot="7427751965" />
              <section className="my-2">
                <div className="card_wrapper">
                  <h2>Compare New Cars</h2>
                  <CompareToBuy compareList={compareList} />
                  <ViewAllButton text={"Compare More Cars"} link={"/compare-cars"} />
                </div>
              </section>
              <Ad728x90 dataAdSlot="3488506956" />
              <PopularBrands brands={brands} />

              <Webstories props={webStories}/>
              {/* <Ad728x90 dataAdSlot="" /> */}
              <div className="mt-4">
                <TrendingNews news={news} />
              </div>
              <Ad728x90 dataAdSlot="8972714021" />
              <TopReviews reviews={reviews} />
            </div>
            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 my-3">
              <div className="sticky_scroll">
                <Ad300x600 dataAdSlot="3792539533" />
                {/* <Ad728x90 dataAdSlot="4783756844" styleData={{ display: "inline-block", width: "300px", height: "600px" }} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params,locale }) {

  // Fetch data from external API
  let resTopSearched = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "model/top-searched"
  );
  let resFeatured = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "model/featured"
  );
  let resElectric = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "model/featured/electric"
  );

  let resBrands = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "brand/popular"
  );

  let resNews = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "blog/" + "?pageSize=4&type=news"
  );
  let resReviews = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "blog/" + "?pageSize=4&type=review"
  );

  let resCompareList = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "model/compare-car/list"
  );

  let webStoriesList = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "webstory" + "?pageSize=4"
  );


  let topSearched = resTopSearched.data;
  let featured = resFeatured.data;
  let electric = resElectric.data;
  let brands = resBrands.data;

  let news = resNews.data;
  let reviews = resReviews.data;
  let compareList = resCompareList.data

  let stories = webStoriesList.data
  return {
    props: {
      topSearched,
      featured,
      electric,
      brands,
      news,
      compareList,
      reviews,
      stories,
      locale
    },
  };
}
