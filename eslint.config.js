const { FlatCompat } = require('@eslint/eslintrc')
const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const prettierPlugin = require('eslint-plugin-prettier')
const prettierConfig = require('eslint-config-prettier')

// const compat = new FlatCompat()

module.export = [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
    },
    settings: {
      prettier: prettierConfig,
    },
  },
]
