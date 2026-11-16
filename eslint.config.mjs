import js from "@eslint/js";
import { configs as wdioConfig } from "eslint-plugin-wdio";

export default [
  js.configs.recommended,
  {
    ...wdioConfig["flat/recommended"],
    rules: {
      ...wdioConfig["flat/recommended"].rules,
      "wdio/no-pause": ["error", { instances: ["browser", "driver"] }],
    },
  },
  {
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
      },
    },
  },
];
