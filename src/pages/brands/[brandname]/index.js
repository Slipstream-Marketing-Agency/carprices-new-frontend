import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/src/layout/MainLayout";
import CarLeftSidebar from "@/src/utils/CarLeftSidebar";
import SelectComponent from "@/src/utils/SelectComponent";
import Ad728x90 from "@/src/components/ads/Ad728x90";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ProductCardList from "@/src/components/filter/ProductCardList";
import ProductSideFilterList from "@/src/components/filter/ProductSideFilterList";
import Pagination from "@/src/utils/Pagination";
import axios from "axios";
import { useRouter } from "next/router";
import data from "@/src/data/data";
import BrandCategory from "@/src/components/Home1/BrandCategory";
import BodyTypes from "@/src/components/Home1/BodyTypes";
import Image from "next/image";
import moment from "moment";
import PriceListTable from "@/src/components/common/PriceListTable";
import Price from "@/src/utils/Price";
import CarFilter from "@/src/components/filter/CarFilter";

function CarListingLeftSidebar({
  currentPage,
  totalPages,
  brandList,
  bodyTypeList,
  totalpricerange,
  totaldisplacementrange,
  totalpowerrange,
  filteredTrims,
  fuelTypeList,
  cylinderList,
  transmissionList,
  driveList,
  bodyTypes,
  brand,
  branddetails,
}) {
  const bodyTypeElements = branddetails?.attributes?.uniqueCarBodyTypes?.map(
    (item, index, array) => {
      const count = item.modelCount > 1 ? `${item.modelCount} ` : "1 ";
      const name = item.modelCount > 1 ? `${item.name}s` : item.name;
      const link = <a href={`/category/${item.slug}`}>{name}</a>; // Creating link for the name

      // Determine if the current item is the last in the array or if it's the second-to-last (for correct comma and 'and' placement)
      if (index === array.length - 1) {
        // Last item
        return (
          <span key={item.slug}>
            {count}
            {link}
          </span>
        );
      } else if (index === array.length - 2) {
        // Second-to-last item
        return (
          <span key={item.slug}>
            {count}
            {link} and{" "}
          </span>
        );
      } else {
        // Any other item
        return (
          <span key={item.slug}>
            {count}
            {link},{" "}
          </span>
        );
      }
    }
  );

  const currentYear = new Date().getFullYear();

  return (
    <MainLayout
      pageMeta={{
        title: `${branddetails?.attributes?.name} ${currentYear} Car Prices in UAE, Latest Models, Reviews & Specifications in UAE  - Carprices.ae`,
        description: `Explore a wide selection of ${branddetails?.attributes?.name} ${currentYear} cars at competitive prices in the UAE. Discover expert reviews, specifications, and find authorized dealers near you for a seamless car buying experience.`,
        type: "Car Review Website",
      }}
    >
      <CarFilter
        currentPage={currentPage}
        totalPages={totalPages}
        brandList={brandList}
        bodyTypeList={bodyTypeList}
        totalpricerange={totalpricerange}
        totaldisplacementrange={totaldisplacementrange}
        totalpowerrange={totalpowerrange}
        filteredTrims={filteredTrims}
        fuelTypeList={fuelTypeList}
        cylinderList={cylinderList}
        transmissionList={transmissionList}
        driveList={driveList}
        bodyTypes={bodyTypes}
        brand={brand}
        branddetails={branddetails}
        bodyTypeElements={bodyTypeElements}
      />
    </MainLayout>
  );
}

export default CarListingLeftSidebar;

export async function getServerSideProps(context) {
  try {
    const { query } = context;
    const page = parseInt(query.page) || 1;
    const pageSize = 12;
    const brandSlugs = query.brandname ? [query.brandname] : [];
    const bodyTypeSlugs = query.bodytype ? query.bodytype.split(",") : [];
    const fuelTypeSlugs = query.fuelType ? query.fuelType.split(",") : [];
    const cylinderSlugs = query.cylinders ? query.cylinders.split(",") : [];
    const driveSlugs = query.drive ? query.drive.split(",") : [];
    const transmissionSlugs = query.transmission
      ? query.transmission.split(",")
      : [];

    const queryParams = {};

    if (brandSlugs.length > 0) {
      queryParams.brands = JSON.stringify(brandSlugs);
    }

    if (bodyTypeSlugs.length > 0) {
      queryParams.bodyTypeIds = [JSON.stringify(bodyTypeSlugs)];
    }

    if (fuelTypeSlugs.length > 0) {
      queryParams.fuelTypes = JSON.stringify(fuelTypeSlugs);
    }

    if (cylinderSlugs.length > 0) {
      queryParams.cylinders = JSON.stringify(cylinderSlugs);
    }

    if (driveSlugs.length > 0) {
      queryParams.drive = JSON.stringify(driveSlugs);
    }

    if (transmissionSlugs.length > 0) {
      queryParams.transmission = JSON.stringify(transmissionSlugs);
    }

    // Parse ranges
    const parseRanges = (rangeStr) => {
      return rangeStr.split(",").map((range) => {
        const [min, max] = range.split("-");
        return { min: parseInt(min), max: parseInt(max) || null };
      });
    };

    const priceRange = query.price ? parseRanges(query.price) : [];
    const powerRange = query.power ? parseRanges(query.power) : [];
    const displacementRange = query.displacement
      ? parseRanges(query.displacement)
      : [];

    if (priceRange.length > 0) {
      queryParams.priceRange = priceRange;
    }
    if (powerRange.length > 0) {
      queryParams.powerRange = powerRange;
    }
    if (displacementRange.length > 0) {
      queryParams.displacementRange = displacementRange;
    }

    const filteredTrims = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-trims/filter`,
      { params: { ...queryParams, page, pageSize } }
    );

    const fullFilter = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-trims/price-range-by-brands`,
      { params: { ...queryParams, page, pageSize } }
    );

    const fetchFilterData = async (url, params) => {
      try {
        const response = await axios.get(url, { params });
        return response.data;
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.message);
        return null;
      }
    };

    const [
      fuelTypeListres,
      cylinderListres,
      transmissionListres,
      driveListres,
      pricerangesres,
      totaldisplacementrangeres,
      totalpowerrangeres,
      brandListres,
      bodyTypeListres,
    ] = await Promise.all([
      fetchFilterData(`${process.env.NEXT_PUBLIC_API_URL}car-trims/fuelList`, queryParams),
      fetchFilterData(`${process.env.NEXT_PUBLIC_API_URL}car-trims/cylinderList`, queryParams),
      fetchFilterData(`${process.env.NEXT_PUBLIC_API_URL}car-trims/transmissionList`, queryParams),
      fetchFilterData(`${process.env.NEXT_PUBLIC_API_URL}car-trims/driveList`, queryParams),
      fetchFilterData(`${process.env.NEXT_PUBLIC_API_URL}car-trims/priceRange`, queryParams),
      fetchFilterData(`${process.env.NEXT_PUBLIC_API_URL}car-trims/displacementRange`, queryParams),
      fetchFilterData(`${process.env.NEXT_PUBLIC_API_URL}car-trims/powerRange`, queryParams),
      fetchFilterData(`${process.env.NEXT_PUBLIC_API_URL}car-trims/brandList`, queryParams),
      fetchFilterData(`${process.env.NEXT_PUBLIC_API_URL}car-trims/bodyList`, queryParams),
    ]);

    const home = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`);
    const branddetails = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}car-brands/${brandSlugs}`
    );

    return {
      props: {
        totalBrands: filteredTrims.data.data.pagination.total,
        totalPages: filteredTrims.data.data.pagination.pageCount,
        currentPage: page,
        brandList: brandSlugs.length > 0 ? brandListres.brands : fullFilter.data.brands,
        bodyTypeList: bodyTypeSlugs.length > 0 ? bodyTypeListres.bodyTypes : fullFilter.data.bodyTypes,
        totalpricerange: priceRange.length > 0 ? pricerangesres.price : fullFilter.data.price,
        totaldisplacementrange: displacementRange.length > 0 ? totaldisplacementrangeres.displacement : fullFilter.data.displacement,
        totalpowerrange: powerRange.length > 0 ? totalpowerrangeres.power : fullFilter.data.power,
        filteredTrims: filteredTrims.data.data.list,
        fuelTypeList: fuelTypeSlugs.length > 0 ? fuelTypeListres.fuelTypes : fullFilter.data.fuelTypes,
        cylinderList: cylinderSlugs.length > 0 ? cylinderListres.cylinders : fullFilter.data.cylinders,
        transmissionList: transmissionSlugs.length > 0 ? transmissionListres.transmission : fullFilter.data.transmission,
        driveList: driveSlugs.length > 0 ? driveListres.drive : fullFilter.data.drive,
        bodyTypes: home.data.data.bodyTypes,
        brand: home.data.data.brand,
        branddetails: branddetails.data,
      },
    };
  } catch (error) {
    console.error("Server-side Data Fetching Error:", error.message);
    return {
      props: {
        totalBrands: 0,
        totalPages: 0,
        currentPage: 1,
        brandList: [],
        bodyTypeList: [],
        totalpricerange: [],
        totaldisplacementrange: [],
        totalpowerrange: [],
        filteredTrims: [],
        fuelTypeList: [],
        cylinderList: [],
        transmissionList: [],
        driveList: [],
        bodyTypes: [],
        brand: null,
        branddetails: null,
      },
    };
  }
}

