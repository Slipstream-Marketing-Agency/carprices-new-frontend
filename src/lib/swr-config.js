import useSWR from 'swr';

// Global fetcher function
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

// Global SWR configuration
export const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minute - dedupe requests
  focusThrottleInterval: 300000, // 5 minutes - throttle focus revalidation
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  loadingTimeout: 10000,
  // Cache for 10 minutes in production
  refreshInterval: process.env.NODE_ENV === 'production' ? 600000 : 0,
};

// Custom hook for API calls with SWR
export const useApiSWR = (endpoint, options = {}) => {
  const url = endpoint ? `${process.env.NEXT_PUBLIC_API_URL}${endpoint}` : null;
  
  const { data, error, isLoading, mutate } = useSWR(
    url,
    fetcher,
    {
      ...swrConfig,
      ...options,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    error,
    mutate, // For manual revalidation
  };
};

// Hook for brands with long cache
export const useBrands = (page = 1, pageSize = 100, search = '') => {
  return useApiSWR(
    `latest-model-years?page=${page}&pageSize=${pageSize}&search=${search}&sort=brandName&order=asc`,
    {
      dedupingInterval: 300000, // 5 minutes - brands don't change often
      refreshInterval: 3600000, // 1 hour
    }
  );
};

// Hook for models
export const useModels = (brandSlug, year, model = '', page = 1, pageSize = 10, search = '') => {
  return useApiSWR(
    brandSlug ? `car-models/brand/${brandSlug}?model=${model}&year=${year}&page=${page}&pageSize=${pageSize}&search=${search}` : null,
    {
      dedupingInterval: 120000, // 2 minutes
    }
  );
};

// Hook for trims
export const useTrims = (year, brand, model) => {
  return useApiSWR(
    year && brand && model ? `car-trims/${year}/brands/${brand}/models/${model}/trims` : null,
    {
      dedupingInterval: 120000, // 2 minutes
    }
  );
};

// Hook for body types
export const useBodyTypes = () => {
  return useApiSWR(
    'car-body-types?fields[0]=name&pagination[pageSize]=100&sort=name:asc',
    {
      dedupingInterval: 600000, // 10 minutes - body types rarely change
      refreshInterval: 3600000, // 1 hour
    }
  );
};

// Hook for articles with pagination
export const useArticles = (type, page = 1, pageSize = 10) => {
  return useApiSWR(
    `articles/list?slug=${type}&page=${page}&pageSize=${pageSize}`,
    {
      dedupingInterval: 60000, // 1 minute
    }
  );
};

export default useApiSWR;
