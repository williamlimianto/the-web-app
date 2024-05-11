module.exports = {
  collectCoverageFrom: [
    '{pages,components,lib}/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
  ],
  coveragePathIgnorePatterns: [
    'lib/mocks/*',
    'lib/test-utils.tsx',
    'pages/_app.page.tsx',
    'pages/_document.page.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['lcov', 'html', 'text'],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/lib/mocks/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
      '<rootDir>/lib/mocks/fileMock.js',

    // Handle @lib & @components aliases
    '^@lib(.*)$': '<rootDir>/lib$1',
    '^@components(.*)$': '<rootDir>/components$1',
    '^@public(.*)$': '<rootDir>/public$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
  },
  modulePathIgnorePatterns: ['/mockData.(js|jsx|ts|tsx)'],
  testEnvironment: 'jsdom',
  testTimeout: 40000,
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: ['next/babel'],
        plugins: [
          // Passport uses import.meta for assets
          'babel-plugin-transform-import-meta',
        ],
      },
    ],
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],
  globalSetup: '<rootDir>/jestGlobalSetup.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
