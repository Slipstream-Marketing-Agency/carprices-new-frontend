import dynamic from "next/dynamic";
import SearchForTheBest from "@/components/home/SearchForTheBest";
import { getCarSection } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import SeoLinksHome from "@/components/common/SeoLinksHome";
import { fetchMetaData } from "@/lib/fetchMetaData";
import { Suspense } from "react";
import CarCardSkeleton from "@/components/car-components/CarCardSkeleton";

const FilterLayout = dynamic(
  () => import("@/components/multi-step-filter/FilterLayout"),
  { ssr: false }
);

const SelectedCompareCarsSection = dynamic(
  () => import("@/components/home/SelectedCompareCarsSection"),
  { ssr: false } // Disable SSR to avoid hydration issues with Slider
);

const CarDealersHome = dynamic(
  () => import("@/components/home/CarDealersHome"),
  { ssr: false } // Disable SSR to avoid hydration issues with Slider
);

// Dynamically import components — enable SSR for SEO-critical sections
const TrendingCars = dynamic(() => import("@/components/home/TrendingCars"), {
  ssr: false, // Disable SSR to avoid hydration issues with Slider
});
const FeaturedNews = dynamic(() => import("@/components/home/FeaturedNews"), {
  ssr: false, // Disable SSR to avoid hydration issues with Slider
});
const MostPopularCarSection = dynamic(
  () => import("@/components/home/MostPopularCarSection"),
  { ssr: false } // Disable SSR to avoid hydration issues with Slider
);
const UpcomingCars = dynamic(() => import("@/components/home/UpcomingCars"), {
  ssr: false, // Disable SSR to avoid hydration issues with Slider
});
const ChooseBrand = dynamic(() => import("@/components/home/ChooseBrand"), {
  ssr: true, // Enable SSR for brand links (SEO-critical internal links)
});
const CustomAdComponent = dynamic(
  () => import("@/components/home/CustomAdComponent"),
  { ssr: false } // Ads don't need SSR
);
const ChooseBodyType = dynamic(
  () => import("@/components/home/ChooseBodyType"),
  { ssr: true } // Enable SSR for body type links
);
const ServicesAdComponent = dynamic(
  () => import("@/components/home/ServicesAdComponent"),
  { ssr: false } // Ads don't need SSR
);
const WebStories = dynamic(() => import("@/components/home/WebStories"), {
  ssr: false, // Client-side only to avoid hydration issues with Slider
});
const TrendingVideos = dynamic(
  () => import("@/components/home/TrendingVideos"),
  { ssr: false } // Videos can load client-side
);
const TrendingNews = dynamic(() => import("@/components/home/TrendingNews"), {
  ssr: false, // Disable SSR to avoid hydration issues with Slider
});

// Metadata generation
export async function generateMetadata() {
  const slug = "home";
  const metaData = await fetchMetaData(slug);

  const title =
    metaData?.title ||
    "New Car Prices, Comparisons, Specifications, Models, Reviews & Auto News in UAE - CarPrices.ae";
  const description =
    metaData?.description ||
    "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.";

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/assets/img/car-prices-logo.png",
          width: 1200,
          height: 630,
          alt: "CarPrices.ae",
        },
      ],
      url: "https://carprices.ae",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/img/car-prices-logo.png"],
    },
    keywords:
      metaData?.keywords ||
      "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: "CarPrices.ae Team" }],
  };
}

// Fetch data function with force cache
async function fetchHomeData() {
  try {
    const [
      featuredCarsRes,
      popularCarsRes,
      electricCarsRes,
      suvsCarsRes,
      performanceCarsRes,
      compareCarsRes,
      homeDataRes,
      articlesRes,
    ] = await Promise.all([
      getCarSection("featured"),
      getCarSection("popular"),
      getCarSection("electric"),
      getCarSection("suvs"),
      getCarSection("performance"),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}compare-car/home`, {
        cache: "force-cache",
      }).then((res) => res.json()).catch(() => []),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}home/find`, {
        cache: "force-cache",
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}articles/home`, {
        cache: "force-cache",
      }).then((res) => res.json()),
    ]);

    return {
      featuredCars: featuredCarsRes,
      carSections: {
        popular: Array.isArray(popularCarsRes) && popularCarsRes.length > 0 ? popularCarsRes[0] : null,
        electric: Array.isArray(electricCarsRes) && electricCarsRes.length > 0 ? electricCarsRes[0] : null,
        suvs: Array.isArray(suvsCarsRes) && suvsCarsRes.length > 0 ? suvsCarsRes[0] : null,
        performance: Array.isArray(performanceCarsRes) && performanceCarsRes.length > 0 ? performanceCarsRes[0] : null,
      },
      compareCars: Array.isArray(compareCarsRes) ? compareCarsRes : [],
      homeData: homeDataRes?.data,
      articles: articlesRes?.data,
    };
  } catch (error) {
if (process.env.NODE_ENV === 'development') { console.error("Failed to fetch data:", error); }
    return {
      featuredCars: null,
      carSections: { popular: null, electric: null, suvs: null, performance: null },
      compareCars: [],
      homeData: null,
      articles: null,
    };
  }
}

// Page component
export default async function Home() {
  const { featuredCars, carSections, compareCars, homeData, articles } = await fetchHomeData();

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

      <TrendingCars featuredCars={featuredCarsData} />
      <FeaturedNews />
      <MostPopularCarSection carSections={carSections} />
      <UpcomingCars />
      <SelectedCompareCarsSection comparisons={compareCars} />
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
