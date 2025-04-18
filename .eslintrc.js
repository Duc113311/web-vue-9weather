module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-multiple-template-root": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        useTabs: false,
      },
      {
        usePrettierrc: false,
      },
    ],
    "no-unused-vars": "off",
    "no-control-regex": 0,
  },
};
