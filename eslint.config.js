import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import parserVue from 'vue-eslint-parser';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  // vue文件配置
  {
    files: ["**/*.vue"], 
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser,
        sourceType: 'module',
      },
    },
    plugins: {
      vue: pluginVue,
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs['vue3-essential'].rules,
      ...pluginVue.configs['vue3-strongly-recommended'].rules,
      ...pluginVue.configs['vue3-recommended'].rules,
    },
  },
  // 测试eslint规则
  {
    files: ["src/main.ts"], //确定配置对象应用于哪些文件
    ignores: ["node_modules"], //确定应该忽略哪些文件
    rules: {
      "no-alert": "error", //禁止使用 alert、confirm 和 prompt
      "no-empty-function": "error", //禁止空函数
      "no-var": "error", //禁止使用var
    },
  },
  // 配置忽略检查文件
  {
    ignores: [
      '**/node_modules',
      '**/public',
      '**/assets',
      '**/dist',
      '**/package-lock.json',
      '**/yarn.lock',
      '**/pnpm-lock.yaml',
      '**/.history',
      '**/*.min.*',
      '**/LICENSE*',
      '**/__snapshots__',
      '**/auto-import?(s).d.ts',
      '.eslintrc-auto-import.mjs',
    ]
  }
];