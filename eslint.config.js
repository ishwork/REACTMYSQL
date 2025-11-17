import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // Ignore patterns
  { ignores: ['**/dist', '**/node_modules', '**/build', 'eslint.config.js'] },

  // JS recommended rules for all JS files
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Frontend React/TypeScript configuration
  {
    files: ['frontend/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
    },
  },

  // Backend JavaScript configuration
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },

  // Prettier config to override eslint formatting rules (must be last)
  prettierConfig,
]);
