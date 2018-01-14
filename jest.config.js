module.exports = {
  globals: {
    window: true,
  },
  verbose: true,
  collectCoverage: true,
  setupTestFrameworkScriptFile: './client/__tests__/setupTest.js',
  testPathIgnorePatterns: ['client/__tests__/__mocks__', 'client/__tests__/setupTest.js'],
  collectCoverageFrom: [
    'client/__tests__/**/*.{js,jsx}',
    '!client/src/app/index.jsx',
    '!client/src/store/**',
    '!client/src/js/**',
    '!client/public/**',
    '!client/static/**',
  ],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/client/__tests__/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/client/__tests__/__mocks__/styleMock.js'
  },
};
