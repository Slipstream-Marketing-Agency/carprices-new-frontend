import Layout from "@/components/layout/Layout";
import TopSearchedCars from "@/components/homePage/TopSearchedCars";
import FeaturedCars from "@/components/homePage/FeaturedCars";
import RecommendedCars from "@/components/homePage/RecommendedCars";
import PopularElectricCars from "@/components/homePage/PopularElectricCars";
import PopularBrands from "@/components/homePage/PopularBrands";
import TrendingNews from "../components/homePage/TrendingNews";
import TopReviews from "../components/homePage/TopReviews";
import Ad728x90 from "@/components/ads/Ad728x90";
import CompareToBuy from "@/components/homePage/compare-to-buy/CompareToBuy";
import FilterLayout from "@/components/homePage/find-car-multi-step-filter/FilterLayout";
import Ad300x600 from "@/components/ads/Ad300x600";
import axios from "axios";
import { useState } from "react";
import ViewAllButton from "@/components/common/ViewAllButton";
import { useMediaQuery } from "react-responsive";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Ad300x250 from "@/components/ads/Ad300x250";


export default function MobileHome(props) {
  const topSearched = props.topSearched.models
  const featured = props.featured.models
  // const recommended = props.recommended.models
  const electric = props.electric.models
  const brands = props.brands.brands
  const news = props.news
  const reviews = props.reviews
  const compareList = props.compareList

  return (
    <Layout>
      <div className="whiteBG mt-2 page">
        <Ad728x90 dataAdSlot="6306241985" />  
        <div className="main_banner ">
          <FilterLayout />
        </div>
        <Ad728x90 dataAdSlot="6306241985" />
        <div className="container">
          <div className="row">
            <div className="col-12">

              <TopSearchedCars topSearched={topSearched} />
              <Ad300x250 dataAdSlot="4973103698" />
              <FeaturedCars featured={featured} />
              <Ad300x250 dataAdSlot="9351332409" />
              {/* <RecommendedCars recommended = {recommended}/>
              {/*<Ad728x90 />*/}
              <PopularElectricCars electric={electric} />

              <Ad300x250 dataAdSlot="4781532004" />
              <section className="my-2">
                <div className="card_wrapper">
                  <h2>Compare New Cars</h2>
                  <CompareToBuy compareList={compareList} />
                  <ViewAllButton text={"Compare More Cars"} link={"/compare-cars"} />
                </div>
              </section>
              <Ad300x250 dataAdSlot="6182243587" />
              <PopularBrands brands={brands} />
              <Ad300x250 dataAdSlot="3556080244" />
              <TrendingNews news={news} />
              <Ad300x250 dataAdSlot="8616835239" />
              <TopReviews reviews={reviews} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {

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


  let topSearched = resTopSearched.data;
  let featured = resFeatured.data;
  let electric = resElectric.data;
  let brands = resBrands.data;

  let news = resNews.data;
  let reviews = resReviews.data;
  let compareList = resCompareList.data
  return {
    props: {
      topSearched,
      featured,
      electric,
      brands,
      news,
      compareList,
      reviews
    },
  };
}
