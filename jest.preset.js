module.exports = {
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  globals: {
    __SERVER__: false,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'html'],
  coverageReporters: ['html'],
  transform: {
    '^.+\\.(tsx|ts|js|html)$': 'ts-jest',
    '^.+\\.svg$': require.resolve('./svg-transform.js'),
    '^.+\\.css$': require.resolve('./css-transform.js'),
    '^.+\\.scss$': require.resolve('./scss-transform.js'),
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require', 'default'],
  },
  coverageDirectory: '<rootDir>/coverage',
};
