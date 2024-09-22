import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.paths.json'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testMatch: ['**/__e2e__/*.test.ts'],
  coverageDirectory: 'coverage/e2e',
};

export default config;
