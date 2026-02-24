import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/public/(.*)$': '<rootDir>/public/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        "\\.(scss|sass|css)$": "identity-obj-proxy",
        // "\\.(svg|png|jpg|jpeg|gif|webp)$": "<rootDir>/src/__mocks__/fileMock.js",
    },
    moduleDirectories: ['node_modules', 'utils', 'src'],
};

export default config;