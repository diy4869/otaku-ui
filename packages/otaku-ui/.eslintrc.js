/**
 * @description ts rules https://typescript-eslint.io/rules/adjacent-overload-signatures
 */
module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parser: '@typescript-eslint/parser',
  // parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback'
      }
    ],
    'no-use-before-define': 'off',
    'max-depth': 'error',
    'max-len': [
      'warn',
      {
        code: 120
      }
    ],
    'max-lines': [
      'error',
      {
        max: 200
      }
    ],
    'typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
    // '@typescript-eslint/no-unused-vars': 'off'
  }
}
