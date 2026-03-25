/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  ...(isProd
    ? {
        output: 'export',
        distDir: 'docs',
        basePath: '/mortgages_d2c',
      }
    : {}),
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/mortgages_d2c' : '',
  },
};

export default nextConfig;
