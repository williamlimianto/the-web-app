/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions
  // so you can co-locate components inside `pages` directory
  pageExtensions: ['page.tsx', 'page.ts'],
  reactStrictMode: true,
  trailingSlash: true,
});
