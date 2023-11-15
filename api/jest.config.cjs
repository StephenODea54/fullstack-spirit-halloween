module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)"],
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "@/index.js": "<rootDir>/src/index.ts",
    "@/app.js": "<rootDir>/src/app.ts",
    "@/config/index.js": "<rootDir>/src/config/index.ts",
    "@/logging/index.js": "<rootDir>/src/logging/index.ts",
    "@/routes/businessRoutes.js": "<rootDir>/src/routes/businessRoutes.ts",
    "@/routes/locationRoutes.js": "<rootDir>/src/routes/locationRoutes.ts",
    "@/routes/stateRoutes.js": "<rootDir>/src/routes/stateRoutes.ts",
    "@/services/businessServices.js": "<rootDir>/src/services/businessServices.ts",
    "@/services/locationServices.js": "<rootDir>/src/services/locationServices.ts",
    "@/services/stateServices.js": "<rootDir>/src/services/stateServices.ts",
    "@/db/db.js": "<rootDir>/src/db/db.ts",
    "@/db/schema.js": "<rootDir>/src/db/schema.ts",
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      "tsconfig": "tsconfig.json",
      "diagnostics": true
    }]
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)",
  ]
}
