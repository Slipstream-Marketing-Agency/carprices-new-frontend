const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle errors gracefully
const fetchWithErrorHandling = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error fetching data from ${url}`);
    }
    return await res.json();
  } catch (error) {
    console.error("API Fetch Error: ", error);
    return null; // Return null or an empty array depending on your preference
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
  return await fetchWithErrorHandling(url);
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
