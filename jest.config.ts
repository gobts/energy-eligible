import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.paths.json'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  maxWorkers: 2,
  // collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/*.routes.ts', '!src/**/index.ts', '!src/core/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

export default config
