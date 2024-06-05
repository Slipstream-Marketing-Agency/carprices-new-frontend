const TemporaryRedirects = require("./redirects/temporaryRedirects.json");
const PermanentRedirects = require("./redirects/permanentRedirects.json");

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

  // async redirects() {
  //   const temporaryRedirects = TemporaryRedirects.map((redirect) => ({
  //     source: redirect.From,
  //     destination: redirect.To,
  //     permanent: false,
  //   }));

  //   const permanentRedirects = PermanentRedirects.map((redirect) => ({
  //     source: redirect.From,
  //     destination: redirect.To,
  //     permanent: true,
  //   }));

  //   return [...temporaryRedirects, ...permanentRedirects];
  // },
  async redirects() {
    return []; // No static redirects, handled by middleware
  },
  compress: true,
};

module.exports = nextConfig;
