import fs from 'fs';
import path from 'path';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const fetchAllRedirects = async () => {
  let redirects = [];
  let page = 1;
  const pageSize = 100;
  let total = 0;

  do {
    const response = await fetch(
      `https://apis.carprices.ae/api/redirects?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
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

const nextConfig = bundleAnalyzer({
  reactStrictMode: true,

  images: {
    domains: ['cdn.carprices.ae'],
    loader: 'default',
    unoptimized: true,
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    // First, store fetched redirects if necessary
    await storeRedirects();

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

  compress: true,

  swcMinify: true,

});

export default nextConfig;
