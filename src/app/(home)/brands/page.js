import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import BrandListWrapper from "@/components/brand-component/BrandListWrapper";
import { fetchMetaData } from "@/lib/fetchMetaData";



export async function generateMetadata() {
  const slug = "search-cars";
  const metaData = await fetchMetaData(slug);

  return {
    title: metaData?.title || "Explore the Top Car Brands in the UAE - Carprices",
    description: metaData?.description || "Stay informed on the best car brands available in the UAE market with comprehensive reviews and insights from Carprices. Find the top brands and make an informed decision.",
    charset: "UTF-8",
    alternates: {
      canonical: `https://carprices.ae/brands`,
    },
    keywords: metaData?.keywords || "new car prices UAE, car comparisons UAE, car specifications, car models UAE, car reviews UAE, auto news UAE, car loans UAE, CarPrices.ae",
    robots: {
      index: true,
      follow: true,
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: metaData?.title || "Explore the Top Car Brands in the UAE - Carprices",
      description: metaData?.description || "Stay informed on the best car brands available in the UAE market with comprehensive reviews and insights from Carprices. Find the top brands and make an informed decision.",
      url: "https://carprices.ae/brands",
    },
    author: "Carprices.ae Team",
    icon: "./favicon.ico",
  };
}


const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

async function fetchBrands(page, pageSize) {
  try {
    const { data } = await client.query({
      query: gql`
        query carBrands($page: Int, $pageSize: Int) {
          carBrands(sort: "name:asc", pagination: { page: $page, pageSize: $pageSize }) {
            data {
              id
              attributes {
                name
                slug
                brandLogo {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                car_models {
                  data {
                    attributes {
                      name
                      slug
                      year
                    }
                  }
                }
              }
            }
            meta {
              pagination {
                page
                pageSize
                pageCount
                total
              }
            }
          }
        }
      `,
      variables: { page, pageSize },
    });

    return data.carBrands;
  } catch (error) {
    console.error("Data Fetching Error:", error.message);
    throw error;
  }
}

export default async function BrandCategoryPage({ searchParams }) {
  const page = searchParams.page || 1; // Get the current page from the query, defaulting to 1
  const pageSize = 24; // Set the number of items per page


  const brandsData = await fetchBrands(page, pageSize);

  return (
    <BrandListWrapper brandsData={brandsData} />
  );
}
