const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
  transpilePackages: ['@repo/ui', '@repo/api-models'],
  sassOptions: {
    includePaths: [path.join(__dirname, '../../packages/ui')],
  },
});
