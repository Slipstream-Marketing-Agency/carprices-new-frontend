import dynamic from "next/dynamic";
import SearchForTheBest from "@/components/home/SearchForTheBest";
import FilterLayout from "@/components/multi-step-filter/FilterLayout";
import { getCarSection } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import SeoLinksHome from "@/components/common/SeoLinksHome";
import { fetchMetaData } from "@/lib/fetchMetaData";
import SelectedCompareCarsSection from "@/components/home/SelectedCompareCarsSection";
import { Suspense } from "react";
import CarCardSkeleton from "@/components/car-components/CarCardSkeleton";
import CarDealersHome from "@/components/home/CarDealersHome";
import Link from "next/link";

// Dynamically import components
const TrendingCars = dynamic(() => import("@/components/home/TrendingCars"), {
  ssr: false,
});
const FeaturedNews = dynamic(() => import("@/components/home/FeaturedNews"), {
  ssr: false,
});
const MostPopularCarSection = dynamic(
  () => import("@/components/home/MostPopularCarSection"),
  { ssr: false }
);
const UpcomingCars = dynamic(() => import("@/components/home/UpcomingCars"), {
  ssr: false,
});
const ChooseBrand = dynamic(() => import("@/components/home/ChooseBrand"), {
  ssr: false,
});
const CustomAdComponent = dynamic(
  () => import("@/components/home/CustomAdComponent"),
  { ssr: false }
);
const ChooseBodyType = dynamic(
  () => import("@/components/home/ChooseBodyType"),
  { ssr: false }
);
const ServicesAdComponent = dynamic(
  () => import("@/components/home/ServicesAdComponent"),
  { ssr: false }
);
const WebStories = dynamic(() => import("@/components/home/WebStories"), {
  ssr: false,
});
const TrendingVideos = dynamic(
  () => import("@/components/home/TrendingVideos"),
  { ssr: false }
);
const TrendingNews = dynamic(() => import("@/components/home/TrendingNews"), {
  ssr: false,
});

// Metadata generation
export async function generateMetadata() {
  const slug = "home";
  const metaData = await fetchMetaData(slug);

  return {
    title:
      metaData?.title ||
      "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
    description:
      metaData?.description ||
      "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
    charset: "UTF-8",
    alternates: {
      canonical: `https://carprices.ae`,
    },
    openGraph: {
      title:
        metaData?.title ||
        "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
      description:
        metaData?.description ||
        "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
      image: "https://carprices.ae/assets/img/car-prices-logo.png",
      url: "https://carprices.ae",
    },
    keywords:
      metaData?.keywords ||
      "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
    robots: {
      index: true,
      follow: true,
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name:
        metaData?.title ||
        "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae",
      description:
        metaData?.description ||
        "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
      url: "https://carprices.ae",
    },
    author: "Carprices.ae Team",
    icon: "./favicon.ico",
  };
}

// Fetch data function with force cache
async function fetchHomeData() {
  try {
    const [featuredCarsRes, homeDataRes, articlesRes] = await Promise.all([
      getCarSection("featured"),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}home/find`, {
        cache: "force-cache",
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}articles/home`, {
        cache: "force-cache",
      }).then((res) => res.json()),
    ]);

    return {
      featuredCars: featuredCarsRes,
      homeData: homeDataRes?.data,
      articles: articlesRes?.data,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      featuredCars: null,
      homeData: null,
      articles: null,
    };
  }
}

// Generate static page
export async function generateStaticParams() {
  return []; // If you have dynamic routes, return an array of params here
}

// Page component
export default async function Home() {
  const { featuredCars, homeData, articles } = await fetchHomeData();

  const featuredCarsData =
    Array.isArray(featuredCars) && featuredCars.length > 0
      ? featuredCars[0]
      : null;

  const brands = homeData?.brand || [];
  const bodyTypes = homeData?.bodyTypes || [];

  return (
    <div className="flex flex-col items-center justify-between w-full ">
      <div className="grid gap-4 p-4 lg:grid-rows-1 lg:grid-cols-10 w-full">
        <div className="row-span-1 lg:col-span-7 col-span-12 flex flex-col justify-start text-white rounded-2xl relative overflow-hidden lg:h-[570px] h-[230px] lg:order-1 order-2">
          <HeroSection />
        </div>
        <FilterLayout />
      </div>
      <SearchForTheBest />
     <Link
  href={`https://shozon.com/en/uae/motors/used-cars?aff=${encodeURIComponent(process.env.NEXT_PUBLIC_SHOZON_AFF || "stream")}`}
  target="_blank"
  rel="noopener"
  className="my-4"
>
  <img
    src="/assets/shozon/728-90.jpg"
    alt="SHOZON – Buy & Sell Cars (728×90)"
    className="hidden md:block mx-auto w-[728px] h-[90px] object-contain"
    width={728}
    height={90}
    loading="lazy"
  />

  {/* Mobile-only (300×250) */}
  <img
    src="/assets/shozon/300-250.jpg"
    alt="SHOZON – Buy & Sell Cars (300×250)"
    className="block md:hidden mx-auto w-[300px] h-[250px] object-contain"
    width={300}
    height={250}
    loading="lazy"
  />
</Link>

      {/* Desktop-only (728×90) */}

      <TrendingCars featuredCars={featuredCarsData} />
      <FeaturedNews />
      <MostPopularCarSection />
      <UpcomingCars />
      <SelectedCompareCarsSection />
      <ChooseBrand brand={brands} />
      <CustomAdComponent />
      <ChooseBodyType bodyTypes={bodyTypes} />
      <CarDealersHome />
      <ServicesAdComponent />
      <WebStories />
      <TrendingVideos />
      {/* <TrendingNews articles={articles} /> */}
      <SeoLinksHome />
    </div>
  );
}
