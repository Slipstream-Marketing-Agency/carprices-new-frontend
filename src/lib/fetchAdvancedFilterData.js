const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle API fetch with error handling
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url} - Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null; // Return null or an empty object to avoid breaking the app
  }
};

// Fetch filtered trims based on provided parameters
export async function fetchFilteredTrims({
  brandSlugs = [],
  bodyTypeSlugs = [],
  fuelTypeSlugs = [],
  cylinderSlugs = [],
  driveSlugs = [],
  transmissionSlugs = [],
  priceRange = [],
  displacementRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
  sort = ""
}) {
  const url = `${API_URL}car-trims/homefilter?brands=${JSON.stringify(
    brandSlugs
  )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
    fuelTypeSlugs
  )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
    driveSlugs
  )}&transmission=${JSON.stringify(transmissionSlugs)}&priceRanges=${JSON.stringify(
    priceRange
  )}&displacementRanges=${JSON.stringify(
    displacementRange
  )}&powerRanges=${JSON.stringify(powerRange)}&page=${page}&pageSize=${pageSize}&sort=${JSON.stringify(
    sort
  )}`;

  return await fetchWithErrorHandling(url);
}

// Fetch full filter data (e.g., price range by brands)
export async function fetchFullFilter({
  brandSlugs = [],
  bodyTypeSlugs = [],
  fuelTypeSlugs = [],
  cylinderSlugs = [],
  driveSlugs = [],
  transmissionSlugs = [],
  priceRange = [],
  displacementRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/price-range-by-brands?brands=${JSON.stringify(
    brandSlugs
  )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
    fuelTypeSlugs
  )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
    driveSlugs
  )}&transmission=${JSON.stringify(transmissionSlugs)}&priceRanges=${JSON.stringify(
    priceRange
  )}&displacementRanges=${JSON.stringify(displacementRange)}&powerRanges=${JSON.stringify(
    powerRange
  )}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}

// Fetch fuel type list
export async function fetchFuelTypeList({
  brandSlugs = [],
  bodyTypeSlugs = [],
  cylinderSlugs = [],
  driveSlugs = [],
  transmissionSlugs = [],
  priceRange = [],
  displacementRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/fuelList?brands=${JSON.stringify(
    brandSlugs
  )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&cylinders=${JSON.stringify(
    cylinderSlugs
  )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
    transmissionSlugs
  )}&priceRanges=${JSON.stringify(priceRange)}&displacementRanges=${JSON.stringify(
    displacementRange
  )}&powerRanges=${JSON.stringify(powerRange)}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}

// Fetch cylinder list
export async function fetchCylinderList({
  brandSlugs = [],
  bodyTypeSlugs = [],
  fuelTypeSlugs = [],
  driveSlugs = [],
  transmissionSlugs = [],
  priceRange = [],
  displacementRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/cylinderList?brands=${JSON.stringify(
    brandSlugs
  )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
    fuelTypeSlugs
  )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
    transmissionSlugs
  )}&priceRanges=${JSON.stringify(priceRange)}&displacementRanges=${JSON.stringify(
    displacementRange
  )}&powerRanges=${JSON.stringify(powerRange)}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}

// Fetch transmission list
export async function fetchTransmissionList({
  brandSlugs = [],
  bodyTypeSlugs = [],
  fuelTypeSlugs = [],
  cylinderSlugs = [],
  driveSlugs = [],
  priceRange = [],
  displacementRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/transmissionList?brands=${JSON.stringify(
    brandSlugs
  )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
    fuelTypeSlugs
  )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
    driveSlugs
  )}&priceRanges=${JSON.stringify(priceRange)}&displacementRanges=${JSON.stringify(
    displacementRange
  )}&powerRanges=${JSON.stringify(powerRange)}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}

// Fetch drive list
export async function fetchDriveList({
  brandSlugs = [],
  bodyTypeSlugs = [],
  fuelTypeSlugs = [],
  cylinderSlugs = [],
  transmissionSlugs = [],
  priceRange = [],
  displacementRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/driveList?brands=${JSON.stringify(
    brandSlugs
  )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
    fuelTypeSlugs
  )}&cylinders=${JSON.stringify(cylinderSlugs)}&transmission=${JSON.stringify(
    transmissionSlugs
  )}&priceRanges=${JSON.stringify(priceRange)}&displacementRanges=${JSON.stringify(
    displacementRange
  )}&powerRanges=${JSON.stringify(powerRange)}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}

// Fetch price range
export async function fetchPriceRange({
  brandSlugs = [],
  bodyTypeSlugs = [],
  fuelTypeSlugs = [],
  cylinderSlugs = [],
  driveSlugs = [],
  transmissionSlugs = [],
  displacementRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/priceRange?brands=${JSON.stringify(
    brandSlugs
  )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
    fuelTypeSlugs
  )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
    driveSlugs
  )}&transmission=${JSON.stringify(transmissionSlugs)}&displacementRanges=${JSON.stringify(
    displacementRange
  )}&powerRanges=${JSON.stringify(powerRange)}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}

// Fetch displacement range
export async function fetchDisplacementRange({
  brandSlugs = [],
  bodyTypeSlugs = [],
  fuelTypeSlugs = [],
  cylinderSlugs = [],
  driveSlugs = [],
  transmissionSlugs = [],
  priceRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/displacementRange?brands=${JSON.stringify(
    brandSlugs
  )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
    fuelTypeSlugs
  )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
    driveSlugs
  )}&transmission=${JSON.stringify(transmissionSlugs)}&priceRanges=${JSON.stringify(
    priceRange
  )}&powerRanges=${JSON.stringify(powerRange)}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}

// Fetch power range
export async function fetchPowerRange({
  brandSlugs = [],
  bodyTypeSlugs = [],
  fuelTypeSlugs = [],
  cylinderSlugs = [],
  driveSlugs = [],
  transmissionSlugs = [],
  priceRange = [],
  displacementRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/powerRange?brands=${JSON.stringify(
    brandSlugs
  )}&bodyTypes=${JSON.stringify(bodyTypeSlugs)}&fuelType=${JSON.stringify(
    fuelTypeSlugs
  )}&cylinders=${JSON.stringify(cylinderSlugs)}&drive=${JSON.stringify(
    driveSlugs
  )}&transmission=${JSON.stringify(transmissionSlugs)}&priceRanges=${JSON.stringify(
    priceRange
  )}&displacementRanges=${JSON.stringify(displacementRange)}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}

// Fetch brand list
export async function fetchBrandList({
  bodyTypeSlugs = [],
  fuelTypeSlugs = [],
  cylinderSlugs = [],
  driveSlugs = [],
  transmissionSlugs = [],
  priceRange = [],
  displacementRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/brandList?bodyTypes=${JSON.stringify(
    bodyTypeSlugs
  )}&fuelType=${JSON.stringify(fuelTypeSlugs)}&cylinders=${JSON.stringify(
    cylinderSlugs
  )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
    transmissionSlugs
  )}&priceRanges=${JSON.stringify(priceRange)}&displacementRanges=${JSON.stringify(
    displacementRange
  )}&powerRanges=${JSON.stringify(powerRange)}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}

// Fetch body type list
export async function fetchBodyTypeList({
  brandSlugs = [],
  fuelTypeSlugs = [],
  cylinderSlugs = [],
  driveSlugs = [],
  transmissionSlugs = [],
  priceRange = [],
  displacementRange = [],
  powerRange = [],
  page = 1,
  pageSize = 12,
}) {
  const url = `${API_URL}car-trims/bodyList?brands=${JSON.stringify(
    brandSlugs
  )}&fuelType=${JSON.stringify(fuelTypeSlugs)}&cylinders=${JSON.stringify(
    cylinderSlugs
  )}&drive=${JSON.stringify(driveSlugs)}&transmission=${JSON.stringify(
    transmissionSlugs
  )}&priceRanges=${JSON.stringify(priceRange)}&displacementRanges=${JSON.stringify(
    displacementRange
  )}&powerRanges=${JSON.stringify(powerRange)}&page=${page}&pageSize=${pageSize}`;

  return await fetchWithErrorHandling(url);
}
