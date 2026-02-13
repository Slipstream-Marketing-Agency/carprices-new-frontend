/**
 * Resolves image URLs from Strapi uploads
 * Handles relative URLs, absolute URLs, and null/undefined values
 * @param {string|null|undefined} url - The image URL from Strapi
 * @param {string} [placeholder="/assets/img/car-placeholder.png"] - Fallback placeholder image
 * @returns {string} - Resolved absolute URL or placeholder
 */
export function resolveImageUrl(url, placeholder = "/assets/img/car-placeholder.png") {
  // Return placeholder if no URL
  if (!url) return placeholder;
  
  // If already absolute URL, return as is
  if (url.startsWith("http")) return url;
  
  // For relative URLs (like /uploads/...), prepend Strapi origin
  // The rewrites in next.config.mjs will handle proxying to Strapi
  return url;
}

/**
 * Resolves Strapi image object with URL and formats
 * @param {object|string|null|undefined} imageObj - Strapi image object or URL string
 * @param {string} [placeholder="/assets/img/car-placeholder.png"] - Fallback placeholder
 * @returns {string} - Resolved image URL
 */
export function resolveImageObject(imageObj, placeholder = "/assets/img/car-placeholder.png") {
  // Handle null/undefined
  if (!imageObj) return placeholder;
  
  // If it's already a string URL
  if (typeof imageObj === 'string') {
    return resolveImageUrl(imageObj, placeholder);
  }
  
  // If it's a Strapi image object with url property
  if (imageObj.url) {
    return resolveImageUrl(imageObj.url, placeholder);
  }
  
  // If it's a Strapi response with data.attributes.url
  if (imageObj.data?.attributes?.url) {
    return resolveImageUrl(imageObj.data.attributes.url, placeholder);
  }
  
  // Fallback to placeholder
  return placeholder;
}

/**
 * Gets the optimal image format from Strapi formats object
 * @param {object} formats - Strapi image formats object
 * @param {string} preferredSize - Preferred size (thumbnail, small, medium, large)
 * @returns {string|null} - URL of the preferred format or null
 */
export function getImageFormat(formats, preferredSize = 'medium') {
  if (!formats || typeof formats !== 'object') return null;
  
  // Try to get preferred size
  if (formats[preferredSize]?.url) {
    return resolveImageUrl(formats[preferredSize].url);
  }
  
  // Fallback order: large -> medium -> small -> thumbnail
  const fallbackOrder = ['large', 'medium', 'small', 'thumbnail'];
  for (const size of fallbackOrder) {
    if (formats[size]?.url) {
      return resolveImageUrl(formats[size].url);
    }
  }
  
  return null;
}
