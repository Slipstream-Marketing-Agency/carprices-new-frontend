const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dev-s3.carprices.ae"],
    loader: "default",
    unoptimized: true,
  },

  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
};

module.exports = nextConfig;
