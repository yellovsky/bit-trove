const url = require('url');
const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const parsedUrl = url.parse(process.env.NEXT_PUBLIC_API_HOST);

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
  transpilePackages: ['@repo/ui', '@repo/api-models'],
  sassOptions: {
    includePaths: [path.join(__dirname, '../../packages/ui')],
  },
  images: {
    remotePatterns: [
      {
        protocol: parsedUrl.protocol.replace(':', ''),
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        pathname: '/uploads/**',
      },
    ],
  },
});
