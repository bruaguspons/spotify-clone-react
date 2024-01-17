module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.*'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: ['error', 'always'], // "off"
    'no-console': 1,
			// 'no-console': [
    //     'warn',
    //     {
    //         allow: ['error', 'warn']
    //     }
    // ],
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/semi': 0, // 2
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/space-before-function-paren': 0,
    '@typescript-eslint/indent': ['error', 4],
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/strict-boolean-expressions': 2,
    '@typescript-eslint/prefer-nullish-coalescing': 0
  }
}
