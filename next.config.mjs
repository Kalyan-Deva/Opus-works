/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    // Local covers live in /public/covers and need no config.
    // Allow remote https cover URLs (e.g. a CDN) as well.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Serve the TinaCMS admin SPA at the clean /admin path.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
