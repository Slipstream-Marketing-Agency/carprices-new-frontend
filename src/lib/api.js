const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle errors gracefully
const fetchWithErrorHandling = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error fetching data from ${url} - Status: ${res.status}`);
    }
    return await res.json();  // Ensure the response is parsed as JSON
  } catch (error) {
    console.error("API Fetch Error: ", error);
    return null; // Return null or an empty object to avoid breaking the app
  }
};

export async function getCarSection(sectionName) {
  const url = `${API_URL}car-sections/findAll?${sectionName}=1`;
  return await fetchWithErrorHandling(url);
}

// Fetch all web stories with pagination and sorting
export async function getAllWebStories(
  page = 1,
  pageSize = 10,
  sort = "createdAt:desc"
) {
  const url = `${API_URL}web-stories?page=${page}&pageSize=${pageSize}&sort=${sort}`;
  return await fetchWithErrorHandling(url);
}

// Fetch a specific web story by slug
export async function getWebStoryData(slug) {
  const url = `${API_URL}web-stories/${slug}`;
  const story = await fetchWithErrorHandling(url);

  // Log the full response to debug
  console.log(story, "Story data in getWebStoryData");

  return story;  // Ensure the parsed story is returned
}
// Fetch all categories that have web stories associated with them
export async function getCategories() {
  const url = `${API_URL}web-story-categories`;
  return await fetchWithErrorHandling(url);
}

// Fetch stories by category slug
export async function getStoriesByCategory(
  categorySlug,
  page = 1,
  pageSize = 10,
  sort = "createdAt:desc"
) {
  const url = `${API_URL}web-stories/category/${categorySlug}?page=${page}&pageSize=${pageSize}&sort=${sort}`;
  return await fetchWithErrorHandling(url);
}

// Fetch all tags used for web stories
export async function getTags() {
  const url = `${API_URL}web-story-tags`;
  return await fetchWithErrorHandling(url);
}

// Fetch stories by tag slug
export async function getStoriesByTag(
  tagSlug,
  page = 1,
  pageSize = 10,
  sort = "createdAt:desc"
) {
  const url = `${API_URL}web-stories/tag/${tagSlug}?page=${page}&pageSize=${pageSize}&sort=${sort}`;
  return await fetchWithErrorHandling(url);
}

// utils/fetchDealerBranches.js
export const fetchDealerBranches = async () => {
  try {
    const response = await fetch(`${API_URL}dealer-branches`);
    if (!response.ok) {
      throw new Error('Failed to fetch dealer branches');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dealer branches:', error);
    return { branches: [] };
  }
};

export const fetchCarBrandsWithDealers = async () => {
  try {
    const response = await fetch(`${API_URL}car-brands-dealers`);
    if (!response.ok) {
      throw new Error('Failed to fetch branches');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dealer branches:', error);
    return { branches: [] };
  }
};

// utils/fetchDealers.js
// In '@/lib/api.js'
export const fetchDealers = async (brandSlug = '', page = 1, pageSize = 10, dealerBranchSlug = '') => {
  try {
    // Construct the query parameters based on what is provided
    let url = `${API_URL}car-dealers/by-filter?page=${page}&pageSize=${pageSize}`;

    if (brandSlug) {
      url += `&brandSlug=${brandSlug}`;
    }

    if (dealerBranchSlug) {
      url += `&dealerBranch=${dealerBranchSlug}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch dealers');
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching dealers:', error);
    return { dealers: [], pagination: {} }; // Return default empty structure on error
  }
};


// services/videoService.js
export const fetchTrendingVideos = async (page = 1, pageSize = 10, sort = 'createdAt', order = 'DESC') => {
  try {
    const response = await fetch(`${API_URL}car-videos/by-filter?trending=true&page=${page}&pageSize=${pageSize}&sort=${sort}&order=${order}`);
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    return [];
  }
};


// Fetch branches related to a specific brand
export const fetchFilteredBranches = async (brandSlug) => {
  const response = await fetch(`${API_URL}dealer-branches/filter-by-brand?brandSlug=${brandSlug}`);
  return response.json();
};

// Fetch brands related to a specific branch
export const fetchFilteredBrands = async (branchSlug) => {
  const response = await fetch(`${API_URL}filter-by-branch?branchSlug=${branchSlug}`);
  return response.json();
};
