import Footer1 from "../components/Footer/Footer1";
import Header from "../components/Home1/Header";
import Topbar from "../components/Home1/Topbar";
import BrandCategory from "../components/Home1/BrandCategory";
import CompareCar from "../components/Home1/CompareCar/index";
import Modals from "../components/Home1/Modals";
import Blog from "../components/Home1/Blog/index";
import Ad728x90 from "../components/ads/Ad728x90";
import GoToTopButton from "../components/goToTop";
import axios from "axios";
import ProductCard from "../components/Home1/ProductCard";
import { createApolloClient } from "../lib/apolloClient";
import { useRouter } from "next/router";
import useTranslate from "../utils/useTranslate";
import Ad300x600 from "../components/ads/Ad300x600";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import BodyTypes from "../components/Home1/BodyTypes";
import MainLayout from "../layout/MainLayout";

const BannerLazy = dynamic(() => import("../components/Home1/Banner/index"), {
  loading: () => <p>Loading banner...</p>, // Optional loading placeholder
  ssr: true, // Keep it true if the component is important for SEO
});

const ProductCard1Lazy = dynamic(
  () => import("../components/Home1/ProductCard"),
  {
    loading: () => <p>Loading products...</p>, // Optional loading placeholder
    ssr: true,
  }
);
const ProductCard2Lazy = dynamic(
  () => import("../components/Home1/ProductCard"),
  {
    loading: () => <p>Loading products...</p>, // Optional loading placeholder
    ssr: true,
  }
);
const ProductCard3Lazy = dynamic(
  () => import("../components/Home1/ProductCard"),
  {
    loading: () => <p>Loading products...</p>, // Optional loading placeholder
    ssr: true,
  }
);

const CompareCarLazy = dynamic(
  () => import("../components/Home1/CompareCar/index"),
  {
    loading: () => <p>Loading comparison...</p>, // Optional loading placeholder
    ssr: true, // Set to false if this component is not critical for SEO
  }
);

export default function Home({
  bannerImage,
  bannerText,
  bodyTypes,
  brand,

  popularcars,
  featuredcars,
  electriccars,
  compare,
  articles,
  error,
  errorMessage,
}) {
  const router = useRouter();

  console.log(articles, "articles");

  const t = useTranslate();
  let isRtl = router.locale === "ar";

  console.log(bodyTypes, "brandbrand");
  if (error) {
    return <div>Error: {errorMessage}</div>;
  }

  const [loadCompareCar, setLoadCompareCar] = useState(false);
  const compareCarRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadCompareCar(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the placeholder is visible
    );

    if (compareCarRef.current) {
      observer.observe(compareCarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <MainLayout
    pageMeta={{
      title: "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - Carprices.ae",
      description:
        "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
      type: "Car Review Website",
    }}
  >
      
      <Ad728x90 dataAdSlot="5962627056" />
      <BannerLazy bannerImage={bannerImage} bannerText={bannerText} />
      {/* <QuickLinkArea /> */}
      {/* <Ad728x90 dataAdSlot="6306241985" /> */}
      {/* <ProductCard
        subTitle={"Most Popular"}
        heading={"Most Popular New Cars"}
        carDetails={popularcars}
      /> */}
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
            <ProductCard1Lazy
              subTitle={"Most Popular"}
              heading={t.PopularNewCars}
              carDetails={popularcars?.carModels}
            />
            <Ad728x90 dataAdSlot="4367254600" />
            <ProductCard2Lazy
              subTitle={"Most Popular"}
              heading={t.featuredcar}
              carDetails={featuredcars?.carModels}
            />
            <Ad728x90 dataAdSlot="3054172934" />
            <ProductCard3Lazy
              subTitle={"Most Popular"}
              heading={t.carElectric}
              carDetails={electriccars?.carModels}
            />
            <Ad728x90 dataAdSlot="7427751965" />
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 my-3 hideOnSmallScreen">
            <div className="sticky_scroll">
              <Ad300x600 dataAdSlot="3792539533" />
            </div>
          </div>
        </div>
      </div>

      {/* <FeaturedNewCars
        subTitle={"Newly Featured"}
        heading={"Featured New Cars"}
        carDetails={carDetails}
      /> */}
      {/* <NewPopularBrands brandsData={brands}  /> */}
      {/* <UpcomingCars  subTitle={"Most Popular"}
        heading={"Most Popular New Cars"}
        carDetails={popularcars}/> */}
      {/* <RecomandationCar /> */}
      {/* <TopRateUsedCars /> */}

      <CompareCarLazy compare={compare} />

      <Ad728x90 dataAdSlot="5962627056" />

      {/* <WhyChoose /> */}
      {/* <ShopCard /> */}
      {/* <Testimonial /> */}
      <BrandCategory brandDetails={brand} />
      <Ad728x90 dataAdSlot="5962627056" />
      <BodyTypes bodyTypeList={bodyTypes} />
      <Ad728x90 dataAdSlot="3488506956" />
      <Blog
        heading={t.Carnews}
        btnTitle={t.viewnews}
        blogApiData={articles.news}
        isNews={true}
      />
      <Ad728x90 dataAdSlot="8972714021" />
      <Blog
        heading={t.reviews}
        btnTitle={t.viewreview}
        blogApiData={articles.reviews}
        isNews={false}
      />

      <Footer1 />
      <GoToTopButton />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  try {
    const carSection = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-sections/findAll`
    );
    const home = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`);

    const articles = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}articles/home`
    );

    const compare = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}compare-car/home`
    );

    return {
      props: {
        bannerImage: home?.data?.data?.bannerImage,
        bannerText: home?.data?.data?.bannerText,
        bodyTypes: home?.data?.data?.bodyTypes,
        brand: home?.data?.data?.brand,
        popularcars: carSection?.data[1],
        featuredcars: carSection?.data[0],
        electriccars: carSection?.data[2],

        compare: compare?.data,
        articles: articles?.data?.data,
      },
    };
  } catch (error) {
    console.error("Server-side Data Fetching Error:", error.message);
    return {
      props: {
        error: true,
        errorMessage: error.message,
      },
    };
  }
}
