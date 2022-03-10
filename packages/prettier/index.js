module.exports = {
  useTabs: true,
  singleQuote: true,
  printWidth: 100,
  trailingComma: "none",
  overrides: [
    {
      excludeFiles: "application.yml",
    },
    {
      files: ".prettierrc",
      options: { parser: "json" },
    },
    {
      files: "*.svench",
      options: { parser: "svelte" },
    },
    {
      files: "*.svelte",
      options: { parser: "svelte" },
    },
  ],
};
