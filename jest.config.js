module.exports = {
  testMatch: ['**/__tests__/**/*.?(m)js?(x)', '**/?(*.)(spec|test).?(m)js?(x)'],
  transform: {
    '^.+\\.mjs?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
};
