import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import ts from "typescript-eslint"
import globals from "globals"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: ["node_modules/", ".next/", "out/", "public/", "crate/"],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/core-web-vitals",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/react",
  ),
  ...compat.plugins("eslint-plugin-prettier"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-this-alias": "off",
      "no-console": "error",
      "testing-library/no-node-access": "error",
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: [
      "**/*.config.{js,mjs,ts}",
      "**/.eslintrc.{js,json}",
      "backstop_data/**/*.{js,ts}",
      "src/__smoke__/**/*.{js,ts}",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-console": "off",
      "testing-library/prefer-screen-queries": "off",
      "testing-library/no-node-access": "off",
    },
  },
  {
    files: [
      "**/*.test.{js,ts,tsx}",
      "**/*.spec.{js,ts,tsx}",
      "src/__tests__/**/*.{js,ts,tsx}",
      "jest.setup.js",
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
]

export default eslintConfig
