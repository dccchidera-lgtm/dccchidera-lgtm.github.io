import type { NextConfig } from 'next';

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
const normalizedBasePath = configuredBasePath.replace(/^\/+|\/+$/g, '');
const basePath = normalizedBasePath ? `/${normalizedBasePath}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
