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
    <MainLayout
      pageMeta={{
        title:
          "Find Your Perfect Car: Search by Price, Body Type and More at Carprices",
        description:
          "Discover your perfect car at Carprices. Easily search and filter by price, body type, and more. Find the ideal vehicle that meets your needs and preferences.",
        type: "Car Review Website",
      }}
    >
      {" "}
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
  );
}

export default CarListingLeftSidebar;

export async function getServerSideProps(context) {
  const { query } = context;
  const page = parseInt(query.page) || 1;
  const pageSize = 12;
  const brandSlugs = query.brand ? query.brand.split(",") : [];
  const bodyTypeSlugs = [query.categoryname ? query.categoryname : []];
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

  

  if (priceRange) {
    queryParams.priceRange = priceRange;
  }
  if (powerRange) {
    queryParams.powerRange = powerRange;
  }
  if (displacementRange) {
    queryParams.displacementRange = displacementRange;
  }

  const filteredTrims = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}car-trims/filter?brands=${JSON.stringify(
      brandSlugs
    )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
      fuelTypeSlugs
    )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
      driveSlugs
    )}&transmission=${JSON.stringify(
      transmissionSlugs
    )}&priceRanges=${JSON.stringify(
      priceRange
    )}&displacementRanges=${JSON.stringify(
      displacementRange
    )}&powerRanges=${JSON.stringify(
      powerRange
    )}&page=${page}&pageSize=${pageSize}`
  );

  const fullFilter = await axios.get(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }car-trims/price-range-by-brands?brands=${JSON.stringify(
      brandSlugs
    )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
      fuelTypeSlugs
    )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
      driveSlugs
    )}&transmission=${JSON.stringify(
      transmissionSlugs
    )}&priceRanges=${JSON.stringify(
      priceRange
    )}&displacementRanges=${JSON.stringify(
      displacementRange
    )}&powerRanges=${JSON.stringify(
      powerRange
    )}&page=${page}&pageSize=${pageSize}`
  );

  let fuelTypeListres,
    cylinderListres,
    transmissionListres,
    driveListres,
    pricerangesres,
    totaldisplacementrangeres,
    totalpowerrangeres,
    brandListres,
    bodyTypeListres;

  if (fuelTypeSlugs.length > 0) {
    const fuelTypeList = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/fuelList?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&cylinders=${JSON.stringify(
        cylinderSlugs
      )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    fuelTypeListres = fuelTypeList;
  }

  

  if (cylinderSlugs.length > 0) {
    const cylinderList = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/cylinderList?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    cylinderListres = cylinderList;
  }

  if (transmissionSlugs.length > 0) {
    const transmissionSlugs = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/transmissionList?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
        driveSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    transmissionListres = transmissionSlugs;
  }

  if (driveSlugs.length > 0) {
    const driveSlugs = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/driveList?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(
        cylinderSlugs
      )}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    driveListres = driveSlugs;
  }

  if (priceRange.length > 0) {
    const priceranges = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/priceRange?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
        driveSlugs
      )}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    pricerangesres = priceranges;
  }

  if (displacementRange.length > 0) {
    const totaldisplacementrange = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/displacementRange?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
        driveSlugs
      )}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(priceRange)}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    totaldisplacementrangeres = totaldisplacementrange;
  }

  if (powerRange.length > 0) {
    const totalpowerrange = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/powerRange?brands=${JSON.stringify(
        brandSlugs
      )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
        fuelTypeSlugs
      )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
        driveSlugs
      )}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    totalpowerrangeres = totalpowerrange;
  }

  if (brandSlugs.length > 0) {
    const brandList = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/brandList?bodyTypes=${JSON.stringify(
        bodyTypeSlugs
      )}&fuelType=${JSON.stringify(fuelTypeSlugs)}&cylinders=${JSON.stringify(
        cylinderSlugs
      )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    brandListres = brandList;
  }

  if (bodyTypeSlugs.length > 0) {
    const bodyTypeList = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }car-trims/bodyList?brands=${JSON.stringify(
        brandSlugs
      )}&fuelType=${JSON.stringify(fuelTypeSlugs)}&cylinders=${JSON.stringify(
        cylinderSlugs
      )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
        transmissionSlugs
      )}&priceRanges=${JSON.stringify(
        priceRange
      )}&displacementRanges=${JSON.stringify(
        displacementRange
      )}&powerRanges=${JSON.stringify(
        powerRange
      )}&page=${page}&pageSize=${pageSize}`
    );
    bodyTypeListres = bodyTypeList;
  }

  const home = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home/find`);

  try {
    return {
      props: {
        // brands: brandsData?.data?.carModels?.data,
        totalBrands: filteredTrims?.data?.data?.pagination?.total,
        totalPages: filteredTrims?.data?.data?.pagination?.pageCount,
        currentPage: page,
        brandList:
          brandSlugs.length > 0
            ? brandListres?.data.brands
            : fullFilter?.data.brands,
        bodyTypeList:
          bodyTypeSlugs.length > 0
            ? bodyTypeListres?.data.bodyTypes
            : fullFilter?.data.bodyTypes,
        totalpricerange:
          priceRange.length > 0
            ? pricerangesres?.data.price
            : fullFilter?.data.price,
        totaldisplacementrange:
          displacementRange.length > 0
            ? totaldisplacementrangeres?.data.displacement
            : fullFilter?.data.displacement,
        totalpowerrange:
          powerRange.length > 0
            ? totalpowerrangeres?.data.power
            : fullFilter?.data.power,
        filteredTrims: filteredTrims?.data?.data?.list,
        fuelTypeList:
          fuelTypeSlugs.length > 0
            ? fuelTypeListres?.data.fuelTypes
            : fullFilter?.data.fuelTypes,
        cylinderList:
          cylinderSlugs.length > 0
            ? cylinderListres?.data.cylinders
            : fullFilter?.data.cylinders,
        transmissionList:
          transmissionSlugs.length > 0
            ? transmissionListres?.data.transmission
            : fullFilter?.data.transmission,
        driveList:
          driveSlugs.length > 0
            ? driveListres?.data.drive
            : fullFilter?.data.drive,

        bodyTypes: home?.data?.data?.bodyTypes,
        brand: home?.data?.data?.brand,
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
