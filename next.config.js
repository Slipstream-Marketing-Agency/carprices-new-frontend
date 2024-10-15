const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const fetchAllRedirects = async () => {
  let redirects = [];
  let page = 1;
  const pageSize = 100;
  let total = 0;

  do {
    const response = await fetch(`https://apis.carprices.ae/api/redirects?pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    const data = await response.json();
    redirects = [...redirects, ...data.redirects];
    total = data.total;
    page++;
  } while (redirects.length < total);

  return redirects;
};

const storeRedirects = async () => {
  const redirects = await fetchAllRedirects();
  const filePath = path.join(process.cwd(), 'public', 'redirects.json');
  fs.writeFileSync(filePath, JSON.stringify(redirects, null, 2));
};

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,

  images: {
    domains: ["cdn.carprices.ae"],
    loader: "default",
    unoptimized: true,
  },

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false, // Disable automatic locale detection
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    // First, store fetched redirects if necessary
    await storeRedirects(); 

    return [
      // Existing redirect to remove '/ar/' from URLs
      {
        source: '/ar/:path*', // Capture all URLs starting with /ar/
        destination: '/:path*', // Redirect to the same path without /ar/
        permanent: true, // Set 301 permanent redirect
      },

      // Dynamic redirect for non-existent 'trim' level pages
      {
        source: '/brands/:brandname/:year/:model/:trim*', // Match all 'trim' level pages
        has: [
          {
            type: 'header', // Look for a 404 response header
            key: 'x-nextjs-page-status', // Custom header to indicate 404 (if applicable)
            value: '404',
          },
        ],
        destination: '/brands/:brandname/:year/:model', // Redirect to the 'model' level (parent)
        permanent: true, // Set 301 redirect for SEO
      },
    ];
  },

  compress: true, // Enable compression for performance

  swcMinify: true, // Enable SWC for JavaScript minification

  webpack: (config) => {
    // Limit chunk sizes to optimize loading performance
    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5, // Limit the number of chunks
      })
    );
    
    return config;
  },
});

module.exports = nextConfig;
