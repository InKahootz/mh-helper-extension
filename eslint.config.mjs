// @ts-check

import url from 'node:url';

import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default tseslint.config(
    {
        // registers all of the plugins up-front
        plugins: {
            ['@typescript-eslint']: tseslint.plugin,
            ['jest']: jestPlugin,
            ['import']: importPlugin,
            ['simple-import-sort']: simpleImportSortPlugin,
        },
    },
    {
        ignores: [
            '**/dist',
            '**/jest.config.js',
            '**/coverage/**',
            '**/webpack',
        ],

    },

    // extends
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylisticTypeChecked,

    // base config
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.webextensions,
                $: 'readonly',
                user: 'readonly',
                lastReadJournalEntryId: 'readonly',
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
                warnOnUnsupportedTypeScriptVersion: true,
            },
        },
        linterOptions: {reportUnusedDisableDirectives: true},
        rules: {
            //'deprecation/deprecation': 'error',
            'array-bracket-newline': ['error', 'consistent'],
            'comma-dangle': ['error', {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                functions: 'only-multiline',
            }],
            'quotes': ['off', 'single'],
            'indent': ['error', 4, {
                SwitchCase: 1,
                outerIIFEBody: 'off',
            }],
            'no-constant-binary-expression': ['error'],
            'no-unneeded-ternary': ['error'],
            'no-var': ['warn'],
            'object-curly-spacing': ['error', 'never'],
            'object-curly-newline': ['error'],
            'prefer-const': ['error'],
            'semi': ['error', 'always'],
            'no-unused-vars': 'off', // handled by typescript-eslint
            '@typescript-eslint/no-unused-vars': ['error', {
                args: 'none',
            }],

            //'simple-import-sort/imports': 'error',
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
        },
    },
    {
        files: ['**/*.js'],
        extends: [tseslint.configs.disableTypeChecked],
    },
    // define the jest globals for all test files
    {
        files: ['tests/**/*.{js,ts}'],
        languageOptions: {
            globals: {
                ...jestPlugin.environments.globals.globals,
            },
        },
    },

    {
        files: ['**/*.{test,spec}.ts'],
        rules: {
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    }
);
