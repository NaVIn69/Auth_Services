// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        ignores: [
            'dist',
            'node_modules',
            'eslint.config.mjs',
            'jest.config.js',
            '**/*.spec.ts',
            '**/*.test.ts',
            'tests/**',
        ],
    },
    // {
    //   files: ["**/*.ts", "**/*.cts", "**/*.mts"],
    // },
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                allowDefaultProject: true,
            },
        },
        rules: {
            // 'no-console': 'warn',
            // 'dot-notation': 'error',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
        },
    },
);
