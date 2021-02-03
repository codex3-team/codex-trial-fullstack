module.exports = {
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    setupFiles: ['./jest.setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
    testPathIgnorePatterns: ['/node_modules/', '/.next/', '/build/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './jest.babel.js' }]
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    }
}
