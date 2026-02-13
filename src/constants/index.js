/**
 * Constants for the application
 */

// API Endpoints
export const API_ENDPOINTS = {
  CAR_BRANDS: '/car-brands',
  CAR_MODELS: '/car-models',
  CAR_TRIMS: '/car-trims',
  ARTICLES: '/articles',
  VIDEOS: '/videos',
  DEALERS: '/dealers',
  REVIEWS: '/reviews',
};

// Breakpoints (match Tailwind config)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1360,
  '3XL': 1440,
};

// Cache duration in milliseconds
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
};

// Form validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/,
};

// Image sizes
export const IMAGE_SIZES = {
  THUMBNAIL: { width: 150, height: 150 },
  SMALL: { width: 300, height: 200 },
  MEDIUM: { width: 600, height: 400 },
  LARGE: { width: 1200, height: 800 },
};

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://www.facebook.com/carprices.ae/',
  TWITTER: 'https://x.com/carprices_ae',
  INSTAGRAM: 'https://www.instagram.com/carprices.ae/',
  LINKEDIN: 'https://www.linkedin.com/company/carprices-ae/',
};

// Contact information
export const CONTACT_INFO = {
  PHONE: '+971553956364',
  EMAIL: 'info@carprices.ae',
  ADDRESS: 'UAE',
};

// SEO
export const SEO = {
  DEFAULT_TITLE: 'CarPrices.ae - Car Prices, Specs & Reviews in UAE',
  DEFAULT_DESCRIPTION: 'Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.',
  SITE_NAME: 'CarPrices.ae',
  TWITTER_HANDLE: '@carprices_ae',
};

// Feature flags
export const FEATURES = {
  ENABLE_DARK_MODE: false,
  ENABLE_PWA: false,
  ENABLE_ANALYTICS: true,
  ENABLE_ADS: true,
};

export default {
  API_ENDPOINTS,
  BREAKPOINTS,
  CACHE_DURATION,
  PAGINATION,
  VALIDATION,
  IMAGE_SIZES,
  SOCIAL_LINKS,
  CONTACT_INFO,
  SEO,
  FEATURES,
};
