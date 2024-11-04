// global modules
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['**/dist/*', '**/build/*', '**/coverage/*', 'tsconfig.json'] },
  prettierConfig,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      parser: tsParser,
    },

    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      react: reactPlugin,
      'unused-imports': unusedImports,
    },

    // @TODO this ignorePatterns looks strange. Eslint fails when check css files.
    // Try to remove it
    rules: {
      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': 'off',
      'react/jsx-keysasd': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/jsx-boolean-value': ['error'],
      'react/jsx-sort-props': ['error', { ignoreCase: true, shorthandFirst: true }],
      'sort-keys': [
        'error',
        'asc',
        { caseSensitive: false, minKeys: 2, natural: true, allowLineSeparatedGroups: true },
      ],
      'default-case': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
          allowSeparatedGroups: true,
        },
      ],

      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
