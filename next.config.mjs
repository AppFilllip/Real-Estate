/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The supplied renders and portraits are small; these are the only widths
    // the layout ever asks for, so nothing larger is generated.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1440, 1920],
    imageSizes: [96, 160, 240, 320, 420, 520],
    formats: ['image/webp']
  }
};

export default nextConfig;
