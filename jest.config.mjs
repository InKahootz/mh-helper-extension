import { createJsWithTsEsmPreset, pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json';

/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = {
  transform: {
    ...createJsWithTsEsmPreset().transform,
  },
  collectCoverage: true,
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths ?? {},
    { prefix: '<rootDir>/' }
  ),
  testEnvironment: 'jsdom'
};

export default jestConfig
