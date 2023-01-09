module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // ignorar esses arquivos e pastas
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    // transformar ou converter os arquivos que satisfazem a expressão regular utilizando o babel-jest
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: 'jsdom', // indica em qual ambiente os tests estão executando para saber como que jest irá se comportar na hora de criar o HTML
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  // coverage
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
    "!src/**/_app.tsx",
    "!src/**/_document.tsx",
  ],
  coverageReporters: [
    "lcov",
    "json"
  ]
}