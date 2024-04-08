/* eslint-disable @typescript-eslint/no-var-requires */
const url = require('url');
const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const parsedUrl = url.parse(process.env.NEXT_PUBLIC_API_HOST);

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
  transpilePackages: ['@bit-trove/ui', '@bit-trove/api-models', '@bit-trove/utils'],

  sassOptions: {
    includePaths: [path.join(__dirname, '../../packages/ui')],
  },

  images: {
    remotePatterns: [
      {
        hostname: parsedUrl.hostname,
        pathname: '/uploads/**',
        port: parsedUrl.port,
        protocol: parsedUrl.protocol.replace(':', ''),
      },
    ],
  },
});
