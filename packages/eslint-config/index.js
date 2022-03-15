module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["svelte3", "@typescript-eslint"],
  ignorePatterns: ["*.cjs"],
  overrides: [
    { files: ["*.svelte"], processor: "svelte3/svelte3" },
    { files: ["*.svench"], processor: "svelte3/svelte3" },
  ],
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2019,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    "no-unsafe-finally": "off",
    "no-irregular-whitespace": "warn",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-imports": ["error", {"prefer": "type-imports"}],
  },
};
