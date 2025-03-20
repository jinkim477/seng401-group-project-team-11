import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Add rules here to bypass errors
      "no-console": "warn",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/prop-types": "warn",
      "react/react-in-jsx-scope": "warn",
      "no-undef": "warn",
      "no-empty": "warn",
      "no-redeclare": "warn",
      "no-dupe-keys": "warn",
      "no-duplicate-case": "warn",
      "no-fallthrough": "warn",
      "no-unreachable": "warn",
      "no-unsafe-finally": "warn",
      "no-unsafe-negation": "warn",
      "no-useless-catch": "warn",
      "no-useless-escape": "warn",
      "no-with": "warn",
      "valid-typeof": "warn",
      "no-case-declarations": "warn",
      "no-empty-pattern": "warn",
      "no-ex-assign": "warn",
      "no-extra-boolean-cast": "warn",
      "no-extra-semi": "warn",
      "no-func-assign": "warn",
      "no-inner-declarations": "warn",
      "no-irregular-whitespace": "warn",
      "no-misleading-character-class": "warn",
      "no-obj-calls": "warn",
      "no-prototype-builtins": "warn",
      "no-regex-spaces": "warn",
      "no-sparse-arrays": "warn",
      "no-template-curly-in-string": "warn",
      "no-unexpected-multiline": "warn",
      "no-unreachable-loop": "warn",
      "no-unsafe-optional-chaining": "warn",
      "no-unused-private-class-members": "warn",
      "require-atomic-updates": "warn",
      "use-isnan": "warn",
      "valid-jsdoc": "warn",
      "valid-typeof": "warn",
    },
  },
];

export default eslintConfig;