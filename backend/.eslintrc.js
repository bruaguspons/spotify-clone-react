module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: 'standard-with-typescript',
    overrides: [
    ],
    ignorePatterns: ['dist', '*.config.*'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
    },
    rules: {
        semi: ['error', 'always'], // "off"
        'no-console': [
            'warn',
            {
                allow: ['error', 'warn']
            }
        ],
        '@typescript-eslint/semi': 0, // 2
        '@typescript-eslint/explicit-function-return-type': 2,
        '@typescript-eslint/space-before-function-paren': 0,
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/strict-boolean-expressions': 2,
        '@typescript-eslint/prefer-nullish-coalescing': 0
    }
};
