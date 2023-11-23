export default {
  preset: "ts-jest",
  testEnvironment: "node",
  //   collectCoverage: true,
  //   coverageDirectory: "coverage",
  //   coverageProvider: "v8",
  testTimeout: 30000,
  maxWorkers: 1, // prevent bigint json serialization error, see:
  // https://github.com/jestjs/jest/issues/11617#issuecomment-1068732414
};
