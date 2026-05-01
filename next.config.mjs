/** @type {import('next').NextConfig} */

// Set DEPLOY_TARGET=ghpages in your GitHub Actions workflow env.
// Vercel deployments should NOT set this variable (leave it unset).
const isGitHubPages = process.env.DEPLOY_TARGET === 'ghpages';

const nextConfig = {
  // Static export is required for GitHub Pages (no server-side rendering).
  // Vercel handles SSR/SSG natively, so we skip this for Vercel.
  ...(isGitHubPages && { output: 'export' }),

  // GitHub Pages serves the app under /IMPACTDESKAI (your repo name).
  // Vercel serves from the root, so no basePath needed.
  basePath: isGitHubPages ? '/IMPACTDESKAI' : '',

  // Required for static export — Next.js image optimisation needs a server.
  // Also required for GitHub Pages since it can't run the optimisation server.
  images: {
    unoptimized: true,
  },

  // Ensure assets (JS, CSS) are requested from the correct sub-path on GH Pages.
  assetPrefix: isGitHubPages ? '/IMPACTDESKAI/' : '',
};

export default nextConfig;
