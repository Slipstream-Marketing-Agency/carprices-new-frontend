import React, { useState } from "react";
import Link from "next/link";

import MainLayout from "@/src/layout/MainLayout";
import ProductSearch from "@/src/components-old/common/ProductSearch";
import ProductCategory from "@/src/utils/ProductCategory";
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Pagination from "@/src/components/common/Pagination";



function BrandCategoryPage({ brands, totalBrands, currentPage, totalPages }) {
  

  return (
    <MainLayout
      pageMeta={{
        title: "Explore the Top Car Brands in the UAE - Carprices",
        description:
          "Stay informed on the best car brands available in the UAE market with comprehensive reviews and insights from Carprices. Find the top brands and make an informed decision.",
        type: "Car Review Website",
      }}
    >
      <Ad728x90 dataAdSlot="5962627056" />

      <ProductCategory brands={brands} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <Ad728x90 dataAdSlot={"tahoe"} />
    </MainLayout>
  );
}

export default BrandCategoryPage;

export async function getServerSideProps(context) {
  
  const page = context.query.page || 1; // Get the current page from the query, defaulting to 1
  const pageSize = 24; // Set the number of items per page

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  try {
    const brandsData = await client.query({
      query: gql`
        query carBrands {
          carBrands(
            sort: "name:asc",
            pagination: { page: ${page}, pageSize: ${pageSize} }
          ) {
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

    return {
      props: {
        brands: brandsData?.data?.carBrands?.data,
        totalBrands: brandsData?.data?.carBrands?.meta?.pagination?.total,
        totalPages: brandsData?.data?.carBrands?.meta?.pagination?.pageCount,
        currentPage: page,
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
