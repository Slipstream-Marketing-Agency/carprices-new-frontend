import React from "react";
import MainLayout from "@/src/layout/MainLayout";
import axios from "axios";

import CarFilter from "@/src/components-old/filter/CarFilter";

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
  
}) {
  return (
    <>
      <MainLayout
        pageMeta={{
          title:
            "Find Your Perfect Car: Search by Price, Body Type and More at Carprices",
          description:
            "Discover your perfect car at Carprices. Easily search and filter by price, body type, and more. Find the ideal vehicle that meets your needs and preferences.",
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
        />
      </MainLayout>
    </>
  );
}

export default CarListingLeftSidebar;

export async function getServerSideProps(context) {
  const { query } = context;
  const page = parseInt(query.page) || 1;
  const pageSize = 20;
  const brandSlugs = query.brand ? query.brand.split(",") : [];
  const bodyTypeSlugs = query.bodytype ? query.bodytype.split(",") : [];
  const fuelTypeSlugs = query.fuelType ? query.fuelType.split(",") : [];
  const cylinderSlugs = query.cylinders ? query.cylinders.split(",") : [];
  const driveSlugs = query.drive ? query.drive.split(",") : [];
  const transmissionSlugs = query.transmission
    ? query.transmission.split(",")
    : [];

  const queryParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
  };

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

  queryParams.priceRanges = JSON.stringify(priceRange);
  queryParams.powerRanges = JSON.stringify(powerRange);
  queryParams.displacementRanges = JSON.stringify(displacementRange);

  try {
    const [
      filteredTrimsRes,
      fullFilterRes,
      homeRes,
      fuelTypeListRes,
      cylinderListRes,
      transmissionListRes,
      driveListRes,
      pricerangesRes,
      totaldisplacementrangeRes,
      totalpowerrangeRes,
      brandListRes,
      bodyTypeListRes,
    ] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-trims/filter`, {
        params: queryParams,
      }),
      axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}car-trims/price-range-by-brands`,
        { params: queryParams }
      ),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`),
      fuelTypeSlugs.length > 0
        ? axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-trims/fuelList`, {
            params: queryParams,
          })
        : null,
      cylinderSlugs.length > 0
        ? axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-trims/cylinderList`, {
            params: queryParams,
          })
        : null,
      transmissionSlugs.length > 0
        ? axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}car-trims/transmissionList`,
            { params: queryParams }
          )
        : null,
      driveSlugs.length > 0
        ? axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-trims/driveList`, {
            params: queryParams,
          })
        : null,
      priceRange.length > 0
        ? axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-trims/priceRange`, {
            params: queryParams,
          })
        : null,
      displacementRange.length > 0
        ? axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}car-trims/displacementRange`,
            { params: queryParams }
          )
        : null,
      powerRange.length > 0
        ? axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-trims/powerRange`, {
            params: queryParams,
          })
        : null,
      brandSlugs.length > 0
        ? axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-trims/brandList`, {
            params: queryParams,
          })
        : null,
      bodyTypeSlugs.length > 0
        ? axios.get(`${process.env.NEXT_PUBLIC_API_URL}car-trims/bodyList`, {
            params: queryParams,
          })
        : null,
    ]);

    const filteredTrims = filteredTrimsRes?.data?.data?.list || [];
    const fullFilter = fullFilterRes?.data || {};
    const home = homeRes?.data?.data || {};

    return {
      props: {
        totalBrands: filteredTrimsRes?.data?.data?.pagination?.total || 0,
        totalPages: filteredTrimsRes?.data?.data?.pagination?.pageCount || 0,
        currentPage: page,
        brandList: brandSlugs.length > 0
          ? brandListRes?.data?.brands || []
          : fullFilter?.brands || [],
        bodyTypeList: bodyTypeSlugs.length > 0
          ? bodyTypeListRes?.data?.bodyTypes || []
          : fullFilter?.bodyTypes || [],
        totalpricerange: priceRange.length > 0
          ? pricerangesRes?.data?.price || {}
          : fullFilter?.price || {},
        totaldisplacementrange: displacementRange.length > 0
          ? totaldisplacementrangeRes?.data?.displacement || {}
          : fullFilter?.displacement || {},
        totalpowerrange: powerRange.length > 0
          ? totalpowerrangeRes?.data?.power || {}
          : fullFilter?.power || {},
        filteredTrims,
        fuelTypeList: fuelTypeSlugs.length > 0
          ? fuelTypeListRes?.data?.fuelTypes || []
          : fullFilter?.fuelTypes || [],
        cylinderList: cylinderSlugs.length > 0
          ? cylinderListRes?.data?.cylinders || []
          : fullFilter?.cylinders || [],
        transmissionList: transmissionSlugs.length > 0
          ? transmissionListRes?.data?.transmission || []
          : fullFilter?.transmission || [],
        driveList: driveSlugs.length > 0
          ? driveListRes?.data?.drive || []
          : fullFilter?.drive || [],
        bodyTypes: home?.bodyTypes || [],
        brand: home?.brand || [],
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
