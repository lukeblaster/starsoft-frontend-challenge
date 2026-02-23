import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        "\\.(scss|sass|css)$": "identity-obj-proxy",
    },
    moduleDirectories: ['node_modules', 'utils', 'src'],
};

export default config;