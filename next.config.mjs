/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // Use the repository name as the base path in production
  basePath: isProd ? '/IMPACTDESKAI' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
