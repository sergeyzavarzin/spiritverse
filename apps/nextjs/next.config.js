/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@spirit/api", "@spirit/config", "@spirit/types"],
  /** We already do linting and typechecking as separate tasks in CI */
  // eslint: { ignoreDuringBuilds: !!process.env.CI },
  // typescript: { ignoreBuildErrors: !!process.env.CI },
};

module.exports = nextConfig;
