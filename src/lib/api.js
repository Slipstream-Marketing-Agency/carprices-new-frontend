// Fetch all web stories
export async function getAllWebStories(page = 1, pageSize = 10, sort = 'createdAt:desc') {
  const res = await fetch(`${API_URL}/web-stories?page=${page}&pageSize=${pageSize}&sort=${sort}`);
  const stories = await res.json();
  return stories;
}

// Fetch a specific web story by slug
export async function getWebStoryData(slug) {
  const res = await fetch(`${API_URL}/web-stories/${slug}`);
  const story = await res.json();
  return story;
}

// Fetch all categories
export async function getCategories() {
  const res = await fetch(`${API_URL}/web-story-categories`);
  const categories = await res.json();
  return categories;
}

// Fetch stories by category slug
export async function getStoriesByCategory(categorySlug) {
  const res = await fetch(`${API_URL}/web-stories/category/${categorySlug}`);
  const stories = await res.json();
  return stories;
}
