import nextPlugin from "eslint-config-next";

export default [
  ...nextPlugin,
  {
    ignores: ["tests/", "test-results/", ".next/", "node_modules/"],
  },
];
