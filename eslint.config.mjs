// @ts-check
import url from 'node:url';

import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import jest from "eslint-plugin-jest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist", "**/jest.config.js", "**/coverage", "**/webpack"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic-type-checked",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.webextensions,
            $: "readonly",
            user: "readonly",
            lastReadJournalEntryId: "readonly",
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.eslint.json", "./tsconfig.json"],
            tsconfigRootDir: "C:\\Git\\ts\\mh-helper-extension\\dependency-updates",
        },
    },

    rules: {
        "array-bracket-newline": ["error", "consistent"],

        "comma-dangle": ["error", {
            arrays: "always-multiline",
            objects: "always-multiline",
            functions: "only-multiline",
        }],

        indent: ["error", 4, {
            SwitchCase: 1,
            outerIIFEBody: "off",
        }],

        "no-constant-binary-expression": ["error"],
        "no-unneeded-ternary": ["error"],
        "no-var": ["warn"],
        "object-curly-spacing": ["error", "never"],
        "object-curly-newline": ["error"],
        "prefer-const": ["error"],
        semi: ["error", "always"],
        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            args: "none",
        }],
    },
}, {
    files: ["tests/**/*.{test,spec}.js"],

    plugins: {
        jest,
    },

    languageOptions: {
        globals: {
            ...globals.jest,
        },
    },
}, {
    files: ["**/*.{test,spec}.ts"],

    rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
    },
}];