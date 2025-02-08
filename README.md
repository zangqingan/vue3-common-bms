# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


# 前言
构建一个通用的中后台系统、vue生态搭建。目标是vue2、vue3各一套、最后看能不能搞成类似cli脚手架可以直接
命令安装。虽然写后台系统很容易、但是还是需要花点时间去搭建一套、因为要考虑通用性、所以要考虑很多方面。

# 一、项目创建
环境版本。
```js
$ node -v
v20.10.0
$ npm -v
10.2.3
$ pnpm -v
10.2.1

```

这里使用 Vite 进行项目创建、创建的是最基础的版本。
```bash
pnpm create vite
```


# 二、代码规范
主要是两部分实现: 
1. 代码层面(ESLint + Prettier + Stylelint)
2. IDE 层面(EditorConfig)

通过 ESLint + Prettier + Stylelint 实现代码风格规范化、格式化，通过 EditorConfig 实现 IDE 编码风格规范化。

## 2.1 代码层面

### 2.1.1 ESLint
ESLint 是一个用于识别和报告在 ECMAScript/JavaScript 代码中发现的模式的工具，其目标是使代码更加一致并避免错误。简单说 ESLint 是一个 JavaScript 代码检查工具，帮助我们来确保代码风格一致，这对于团队协作来说是大有益处的，也用来发现一些潜在错误或不规范的代码。ESLint 的规则是可配置的，因此可以根据团队偏好、项目需求来定义自己的 ESLint 规则。

**安装依赖**
注意node版本、我们这里使用最新版的eslint、最新版本的好处是它会给出对应匹配的版本，只要你node版本是它规定的就不会出问题。
```js

pnpm create @eslint/config@latest

//  然后根据提示选择自己想要的配置
How would you like to use ESLint?（您希望如何使用 ESLint）
To check syntax only（只检查语法）
To check syntax and find problems（检查语法并发现问题）√

What type of modules does your project use?（你的项目使用什么类型的模块？）
JavaScript modules (import/export) （JavaScript模块（导入/导出）√
CommonJS (require/exports) （CommonJS(需要/出口) ）
None of these （这些都不是）

Which framework does your project use?（您的项目使用哪个框架？）
React
Vue.js √
None of these （这些都不是）

Does your project use TypeScript?（你的项目使用TypeScript吗？）
No
Yes √

Where does your code run?（你的代码在哪里运行？）
Browser (浏览器) √
Node

// 上面的选择好之后会自动展现出会需要到哪些依赖项。

Would you like to install them now?（您现在要安装它们吗？）
No
Yes √

Which package manager do you want to use？（您想使用哪个包管理器）
npm
yarn
pnpm √
bun

// 选择好之后会自动安装依赖到 devDependencies、同时会自动创建 eslint.config.js 文件。
devDependencies:
+ @eslint/js 9.19.0: ESLint 的核心包，用于支持 JavaScript 的代码分析功能，适用于基于 JavaScript 的代码检查。
+ eslint 9.19.0: ESLint 包。
+ eslint-plugin-vue 9.32.0: 专为 Vue 项目设计的 ESLint 插件，提供了对 Vue 特有语法（如模板、指令等）的代码检查和规则支持。
+ globals 15.14.0: JavaScript 全局变量的库，提供常见的全局变量，通常用于 ESLint 配置中定义哪些全局变量是允许的。
+ typescript-eslint 8.23.0: TypeScript 的 ESLint 插件，允许 ESLint 对 TypeScript 代码进行静态分析和代码检查。

@vitejs/plugin-vue: Vite 的官方 Vue 插件，专为 Vue 3 项目设计。



```
**eslint.config.js 文件**
它是新的默认配置格式、它默认导出一个数组。当你选择vue+ts时会自动生成如下配置。其它具体配置可以查看官网。
在扁平化配置里数组的每个配置对象都包含 ESLint 需要在一组文件上执行的所有信息。每个配置对象都由以下属性组成:
```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
  // 配置对象说明
  {
    name: "eslint", //配置对象的名称。这在错误消息和配置检查器中使用，以帮助识别正在使用哪个配置对象。
    files: ["**/*.{js,mjs,cjs,ts,vue}"], // 指示配置对象应应用于的文件的通配符模式数组。如果未指定，则配置对象适用于与任何其他配置对象匹配的所有文件。
    ignores: [], // 指示配置对象应忽略的文件的通配符模式数组。
    languageOptions: { //  包含与如何为代码检查配置 JavaScript 相关的设置的对象。这通常用于指定全局变量、环境、解析器选项等。
      ecmaVersion: 2020, // 支持的 ECMAScript 版本。可以是任何年份（即 2022）或版本（即 5）。对于最新支持的版本，设置为 "latest"。（默认："latest"）
      sourceType : "module", //  可能的值是 "script" 用于传统脚本文件，"module" 用于 ECMAScript 模块 (ESM) 和 "commonjs" 用于 CommonJS 文件。（默认："module" 用于 .js 和 .mjs 文件；"commonjs" 用于 .cjs 文件）
      globals: globals.browser, // 指示配置对象应应用于的全局变量的对象。这通常用于指定全局变量、环境、解析器选项等。
      // 其它选项
    },
    plugins: [ // 包含插件名称到插件对象的名称-值映射的对象，这通常用于指定插件的名称和配置选项。
      pluginJs, // 插件名称。
      tseslint, // 插件名称。
      pluginVue, // 插件名称。
    ],
    rules: { // 指示配置对象应应用于的规则的对象。这通常用于指定规则的名称和配置选项。
      "no-console": "error", // 规则名称。
      "no-debugger": "error", // 规则名称。
    },

  }
];

```

编辑器如 VS Code 中集成 ESLint 插件，可以帮助你找出代码中不符合 ESLint 规则的地方，通过不同颜色下划线该告诉你错误信息、警告信息等，这很有用。插件名称就叫 ESLint，注意，ESLint 扩展会自动查找 ESLint 全局安装版本，在项目根目录下找到你的配置文件即 eslint.config.js 文件。

配置忽略检查的文件，在 ESLint v9 之前，我们通过创建 .eslintignore 来忽略文件，在扁平化配置下，我们需要在 eslint.config.js 中配置 ignores 字段，它是一个字符串数组。

```js
//eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  //...
  {
    ignores: [
      "**/node_modules",
      "**/public",
      "**/assets",
      "**/dist",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/.history",
      "**/CHANGELOG*.md",
      "**/*.min.*",
      "**/LICENSE*",
      "**/__snapshots__",
      "**/auto-import?(s).d.ts",
      "**/components.d.ts",
    ],
  },
];

```

配置规则: 规则是 ESLint 的核心构建块。@eslint/js 包已经配置了大量规则pluginJs.configs.recommended，当然，你也可以在 rules 中覆盖这些规则来完成你的需要。

```js
//eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  //...
  {
    files: ["src/main.ts"], //确定配置对象应用于哪些文件
    ignores: ["node_modules"], //确定应该忽略哪些文件
    rules: {
      "no-alert": "error", //禁止使用 alert、confirm 和 prompt
      "no-empty-function": "error", //禁止空函数
      "no-var": "error", //禁止使用var
    },
  },
];

```
对应vue项目要自定义解析器需要安装 vue-eslint-parser 插件 用于 .vue 文件的 ESLint 自定义解析器。
```js
pnpm add --save-dev vue-eslint-parser 
// 然后，在 eslint.config.js 中配置
// Vue 的配置
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
];


```

ESLint 脚本命令配置: 在实际项目中，我们会将命令写在 package.json 的 scripts 里 比如这样：
1. --max-warnings： 此选项允许您指定警告阈值，如果项目中存在过多的警告级别规则冲突，则该阈值可用于强制 ESLint 退出并显示错误状态。
2. --fix： 指示 ESLint 尝试修复尽可能多的问题。
3. --cache： 存储有关已处理文件的信息，以便仅对更改的文件进行操作。确保仅对更改的文件进行 linted 处理，从而显著提高 ESLint 的运行时性能。
4. --cache-location： 缓存位置的文件或目录的路径，因为缓存会生成一个 .eslintcache 文件，不配置将在根目录下生成，我们这里统一处理放在 node_modules/.cache。

```json
{
  "scripts": {
    "lint:eslint": "eslint --fix  --cache --max-warnings 0  \"src/**/*.{vue,ts,tsx}\"  --cache-location 'node_modules/.cache/eslint/'",
  }
}

// 然后，我们就可以在终端来检查你的代码：
pnpm lint:eslint


```

在 Vite 中集成 ESLint 插件、vite-plugin-eslint 它可以在 Vite 程序中检查 ESLint 的错误，并将其错误或警告输出在终端和页面上。
```js
pnpm add --save-dev vite-plugin-eslint @types/vite-plugin-eslint 

// 在 vite.config.ts 中配置
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from "vite-plugin-eslint"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), eslint()],
})


```
