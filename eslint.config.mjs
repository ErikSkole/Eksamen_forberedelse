import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.ejs"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];