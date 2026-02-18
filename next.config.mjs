import fs from 'fs';
import path from 'path';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Fetch all redirects from the API
const fetchAllRedirects = async () => {
  let redirects = [];
  let page = 1;
  const pageSize = 100;
  let total = 0;

  do {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}redirects?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    const data = await response.json();
    redirects = [...redirects, ...data.redirects];
    total = data.total;
    page++;
  } while (redirects.length < total);

  return redirects;
};

// Store fetched redirects into a file
const storeRedirects = async () => {
  const redirects = await fetchAllRedirects();
  const filePath = path.join(process.cwd(), 'public', 'redirects.json');
  fs.writeFileSync(filePath, JSON.stringify(redirects, null, 2));
};

// Generate sitemaps by triggering APIs and saving the files
const generateSitemaps = async () => {
  const apiEndpoints = [
    'https://apis.carprices.ae/api/articles/generateSitemap',
    'https://apis.carprices.ae/api/car-body-type/generateSitemap',
    'https://apis.carprices.ae/api/car-trims/generate',
  ];

  for (const endpoint of apiEndpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Failed to trigger API at ${endpoint}`);
    } catch (error) {
      // Log to file or monitoring service in production
    }
  }

  const sitemaps = [
    { name: 'articles-sitemap.xml', url: 'https://apis.carprices.ae/articles-sitemap.xml' },
    { name: 'bodytypes-sitemap.xml', url: 'https://apis.carprices.ae/bodytypes-sitemap.xml' },
    { name: 'trims-sitemap.xml', url: 'https://apis.carprices.ae/trims-sitemap.xml' },
    { name: 'models-sitemap.xml', url: 'https://apis.carprices.ae/models-sitemap.xml' },
    { name: 'brands-sitemap.xml', url: 'https://apis.carprices.ae/brands-sitemap.xml' },
  ];

  for (const sitemap of sitemaps) {
    try {
      const response = await fetch(sitemap.url);
      if (!response.ok) throw new Error(`Failed to fetch ${sitemap.name}`);
      const xmlContent = await response.text();
      const outputDir = path.resolve(process.cwd(), 'public');
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(path.join(outputDir, sitemap.name), xmlContent, 'utf8');
    } catch (error) {
      // Log to file or monitoring service in production
    }
  }
};

const nextConfig = bundleAnalyzer({
  reactStrictMode: true,

  images: {
    domains: ['cdn.carprices.ae'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.carprices.ae',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'carprices.ae',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'apis.carprices.ae',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000, // Cache optimized images for 30 days
    unoptimized: false,
  },

  // Note: i18n config is not supported with App Router
  // Internationalization should be handled via middleware or route groups
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  //   localeDetection: false,
  // },

  eslint: {
    ignoreDuringBuilds: false,
  },

  async redirects() {
    if (process.env.NODE_ENV === 'production') {
      // Store fetched redirects if necessary
      await storeRedirects();
    }

    return [
      {
        source: '/ar/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/brands/:brandname/:year/:model/:trim*',
        has: [
          {
            type: 'header',
            key: 'x-nextjs-page-status',
            value: '404',
          },
        ],
        destination: '/brands/:brandname/:year/:model',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    // Get the base URL without /api/
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337/api/';
    const strapiBaseUrl = apiUrl.replace(/\/api\/?$/, '');
    
    return [
      {
        source: '/uploads/:path*',
        destination: `${strapiBaseUrl}/uploads/:path*`,
      },
      {
        source: '/api/uploads/:path*',
        destination: `${strapiBaseUrl}/uploads/:path*`,
      },
    ];
  },

  compress: true,

  swcMinify: true,

  // Optimize package imports for smaller bundles
  experimental: {
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
      'lodash',
      'react-icons',
    ],
  },

  // Reduce unused JS in production
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },

  // Add security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts aggressively
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache Next.js static chunks
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async generateBuildId() {
    if (process.env.NODE_ENV === 'production') {
      // Generate sitemaps only in production
      await generateSitemaps();
    }
    return null; // Use the default build ID
  },
});

export default nextConfig;
