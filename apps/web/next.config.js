const path = require('path');

console.log(path.join(__dirname, '../../packages/ui/src/scss'));
/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/ui', '@repo/api-models'],
  sassOptions: {
    includePaths: [path.join(__dirname, '../../packages/ui')],
  },
};
