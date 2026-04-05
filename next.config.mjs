/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // The Butler PWA mockup lives as static files in public/app/. Every CTA
  // on the landing page points to /app, so we rewrite that URL to serve the
  // mockup's index.html directly. When the real app is built, this rewrite
  // goes away and /app becomes a real route.
  async rewrites() {
    return [
      { source: "/app", destination: "/app/index.html" },
    ];
  },
};

export default nextConfig;
