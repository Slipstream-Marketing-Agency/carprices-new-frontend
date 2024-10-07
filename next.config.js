const fs = require('fs');
const path = require('path');

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

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.carprices.ae"],
    loader: "default"
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    await storeRedirects(); // Fetch and store redirects during the build process
    return []; // No static redirects, handled by middleware
  },
  compress: true,
};

module.exports = nextConfig;
