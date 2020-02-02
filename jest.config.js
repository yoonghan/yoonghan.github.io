module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  },
  testMatch: [
    "**/*.(test|spec).(ts|tsx|js|jsx)"
  ],
  globals: {
    "ts-jest": {
      babelConfig: ".babeltestrc",
      tsConfig: "jest.tsconfig.json"
    },
    "babel-jest": {
      babelConfig: ".babeltestrc"
    }
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "enzyme.js",
    "/.next/"
  ],
  setupFiles: [
    './jest.setup.js'
  ],
  setupFilesAfterEnv: [
    "<rootDir>/enzyme.js"
  ],
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "text-summary"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/mocks.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/mocks.js"
  }
};
