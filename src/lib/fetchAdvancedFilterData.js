const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle API fetch with error handling and timeout
const fetchWithErrorHandling = async (url, timeoutMs = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url} - Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (process.env.NODE_ENV === 'development') { console.error("API Fetch Error:", error.message); }
    return null;
  }
};

// Helper function to build query string with additional query parameters
// Filters out null/undefined values to keep URLs clean
const buildQueryString = (baseParams, additionalParams) => {
  const merged = { ...baseParams, ...additionalParams };
  // Remove null/undefined values to avoid sending "null" strings
  const cleaned = Object.fromEntries(
    Object.entries(merged).filter(([_, v]) => v != null && v !== "null" && v !== "undefined")
  );
  const queryParams = new URLSearchParams(cleaned);
  return queryParams.toString();
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
  sort = "",
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    priceRanges: JSON.stringify(priceRange),
    displacementRanges: JSON.stringify(displacementRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
    sort: JSON.stringify(sort),
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/homefilter?${queryString}`;
  return await fetchWithErrorHandling(url);
}

// Fetch full filter data
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
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    priceRanges: JSON.stringify(priceRange),
    displacementRanges: JSON.stringify(displacementRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/price-range-by-brands?${queryString}`;
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
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    priceRanges: JSON.stringify(priceRange),
    displacementRanges: JSON.stringify(displacementRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/fuelList?${queryString}`;
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
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    priceRanges: JSON.stringify(priceRange),
    displacementRanges: JSON.stringify(displacementRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/cylinderList?${queryString}`;
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
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    priceRanges: JSON.stringify(priceRange),
    displacementRanges: JSON.stringify(displacementRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/transmissionList?${queryString}`;
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
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    priceRanges: JSON.stringify(priceRange),
    displacementRanges: JSON.stringify(displacementRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/driveList?${queryString}`;
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
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    displacementRanges: JSON.stringify(displacementRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/priceRange?${queryString}`;
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
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    priceRanges: JSON.stringify(priceRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/displacementRange?${queryString}`;
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
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    priceRanges: JSON.stringify(priceRange),
    displacementRanges: JSON.stringify(displacementRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/powerRange?${queryString}`;
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
  ...additionalQueryParams
}) {
  const baseParams = {
    bodyTypes: JSON.stringify(bodyTypeSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    priceRanges: JSON.stringify(priceRange),
    displacementRanges: JSON.stringify(displacementRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/brandList?${queryString}`;
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
  ...additionalQueryParams
}) {
  const baseParams = {
    brands: JSON.stringify(brandSlugs),
    fuelType: JSON.stringify(fuelTypeSlugs),
    cylinders: JSON.stringify(cylinderSlugs),
    drive: JSON.stringify(driveSlugs),
    transmission: JSON.stringify(transmissionSlugs),
    priceRanges: JSON.stringify(priceRange),
    displacementRanges: JSON.stringify(displacementRange),
    powerRanges: JSON.stringify(powerRange),
    page,
    pageSize,
  };

  const queryString = buildQueryString(baseParams, additionalQueryParams);
  const url = `${API_URL}car-trims/bodyList?${queryString}`;
  return await fetchWithErrorHandling(url);
}
