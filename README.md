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
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  // 配置对象说明
  {
    name: 'eslint', //配置对象的名称。这在错误消息和配置检查器中使用，以帮助识别正在使用哪个配置对象。
    files: ['**/*.{js,mjs,cjs,ts,vue}'], // 指示配置对象应应用于的文件的通配符模式数组。如果未指定，则配置对象适用于与任何其他配置对象匹配的所有文件。
    ignores: [], // 指示配置对象应忽略的文件的通配符模式数组。
    languageOptions: {
      //  包含与如何为代码检查配置 JavaScript 相关的设置的对象。这通常用于指定全局变量、环境、解析器选项等。
      ecmaVersion: 2020, // 支持的 ECMAScript 版本。可以是任何年份（即 2022）或版本（即 5）。对于最新支持的版本，设置为 "latest"。（默认："latest"）
      sourceType: 'module', //  可能的值是 "script" 用于传统脚本文件，"module" 用于 ECMAScript 模块 (ESM) 和 "commonjs" 用于 CommonJS 文件。（默认："module" 用于 .js 和 .mjs 文件；"commonjs" 用于 .cjs 文件）
      globals: globals.browser, // 指示配置对象应应用于的全局变量的对象。这通常用于指定全局变量、环境、解析器选项等。
      // 其它选项
    },
    plugins: [
      // 包含插件名称到插件对象的名称-值映射的对象，这通常用于指定插件的名称和配置选项。
      pluginJs, // 插件名称。
      tseslint, // 插件名称。
      pluginVue, // 插件名称。
    ],
    rules: {
      // 指示配置对象应应用于的规则的对象。这通常用于指定规则的名称和配置选项。
      'no-console': 'error', // 规则名称。
      'no-debugger': 'error', // 规则名称。
    },
  },
];
```

编辑器如 VS Code 中集成 ESLint 插件，可以帮助你找出代码中不符合 ESLint 规则的地方，通过不同颜色下划线该告诉你错误信息、警告信息等，这很有用。插件名称就叫 ESLint，注意，ESLint 扩展会自动查找 ESLint 全局安装版本，在项目根目录下找到你的配置文件即 eslint.config.js 文件。

配置忽略检查的文件，在 ESLint v9 之前，我们通过创建 .eslintignore 来忽略文件，在扁平化配置下，我们需要在 eslint.config.js 中配置 ignores 字段，它是一个字符串数组。

```js
//eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
  //...
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
      '**/CHANGELOG*.md',
      '**/*.min.*',
      '**/LICENSE*',
      '**/__snapshots__',
      '**/auto-import?(s).d.ts',
      '**/components.d.ts',
    ],
  },
];
```

配置规则: 规则是 ESLint 的核心构建块。@eslint/js 包已经配置了大量规则pluginJs.configs.recommended，当然，你也可以在 rules 中覆盖这些规则来完成你的需要。

```js
//eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
  //...
  {
    files: ['src/main.ts'], //确定配置对象应用于哪些文件
    ignores: ['node_modules'], //确定应该忽略哪些文件
    rules: {
      'no-alert': 'error', //禁止使用 alert、confirm 和 prompt
      'no-empty-function': 'error', //禁止空函数
      'no-var': 'error', //禁止使用var
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
    "lint:eslint": "eslint --fix  --cache --max-warnings 0  \"src/**/*.{vue,ts,tsx}\"  --cache-location \"node_modules/.cache/eslint/\"",,
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

### 2.1.2 Prettier

Prettier 是一个代码格式化工具，主要用于自动化代码的风格统一和格式化，专注于确保代码的可读性和一致性。

```js
pnpm add --save-dev --save-exact prettier


```

配置 Prettier、在根目录下新增两个文件：

1. .prettierignore 忽略文件，表示哪些文件忽略格式化
2. .prettierrc.js Prettier 配置文件(ES Modules)

```js
// .prettierignore
public;
src / assets;

// .prettierrc.js
/** @type {import('prettier').Config} */
const config = {
  printWidth: 100, // 每行最大字符数
  tabWidth: 4, // 缩进空格数
  semi: true, // 尾部添加分号
  singleQuote: true, // 是否使用单引号而不是双引号
  bracketSpacing: true, // 在对象字面量的括号内添加空格
  arrowParens: 'always', // 总是为箭头函数的参数添加圆括号
  proseWrap: 'preserve', // 不改变 Markdown 文本的换行
  bracketSameLine: false,
};

export default config;
```

在 VS Code 扩展中搜索 Prettier 插件并进行安装。在你的 package.json 的 scripts 下新增脚本

1. --write：这将就地重写所有已处理的文件。这与 eslint --fix 工作流程相当。您也可以使用 -w 别名。
2. --cache： 存储有关已处理文件的信息，以便仅对更改的文件进行操作。

```json
{
  "scripts": {
    "lint:format": "prettier  --write --cache \"src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}\""
  }
}
// 然后就可以在终端来格式化你的代码：
pnpm lint:format

```

### 2.1.3 ESLint 和 Prettier配合使用

在 ESLint v9.0.0 前的格式化程序和 Prettier 起冲突，这是一个常常发生的事情，这时我们需要另外两个依赖包来解决冲突问题。

1. eslint-config-prettier：关闭所有不必要或可能与 Prettier 冲突的规则
2. eslint-plugin-prettier：将 Prettier 作为规则插入到 ESLint 里

```js
pnpm install --save-dev eslint-config-prettier
pnpm install --save-dev eslint-plugin-prettier
// 在 eslint.config.js 文件中配置
//...其他依赖
import pluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Prettier 配置
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  eslintConfigPrettier,
];
```

### 2.1.4 Stylelint

Stylelint 是一个强大的 CSS 样式代码检查工具，用于检测 CSS 代码中的错误和警告。
和 ESLint 很类似，都是定义规则、风格来进行代码检查，保证代码风格一致性，并发现一些潜在错误或不规范的代码。不同在于 Stylelint 针对的是 CSS 样式的代码检查。
**安装依赖**

```js
pnpm add --save-dev stylelint
```

在 VS Code 扩展模块搜索 Stylelint 进行安装、在 settings.json 文件中写入以下配置：

```js
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.fixAll.stylelint": "explicit",//配置 stylelint 保存自动修复
    },
    "stylelint.validate": ["css", "less", "scss", "sass", "postcss", "vue"]//插件检查范围

```

在根目录下新建一个 stylelint.config.js 文件，同时确保你的 package.json 配置了 "type": "module"，表示使用 ESM 模块导出。以及 .stylelintignore 忽略文件。

```js
/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-html",
  ],
  plugins: ["stylelint-prettier"],
  rules: {
    "prettier/prettier": true,
    "no-empty-source": null,
    "import-notation": null,
    "selector-class-pattern": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "use",
          "mixin",
          "include",
          "extend",
          "forward",
          "if",
          "else",
          "each",
        ],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "deep"],
      },
    ],
  },
  overrides: [
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
      extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recommended-vue/scss",
      ],
      rules: {},
    },
    {
      files: ["*.vue", "**/*.vue", "*.html", "**/*.html"],
      customSyntax: "postcss-html",
      extends: [
        "stylelint-config-standard",
        "stylelint-config-recommended-vue",
      ],
    },
  ],
  ignoreFiles: [
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
    "**/*.json",
    "**/*.md",
    "**/*.yaml",
    "**/*.yml",
    "**/*.d.ts",
  ],
};

// .stylelintignore
node_modules
dist
public
src/assets/*
```

Stylelint 常用的相关依赖

1. stylelint-config-standard：Stylelint 的 CSS 标准配置
2. stylelint-config-standard-scss：Stylelint 的标准可共享 SCSS 配置。
3. Scss：stylelint-config-recommended-scss：Stylelint 推荐的可共享 SCSS 配置
4. stylelint-config-recommended-vue：扩展 stylelint-config-recommended 配置，并提供推荐的 Vue 相关规则，
5. stylelint-config-recess-order：对 CSS 属性进行排序
6. stylelint-config-html：此配置捆绑  postcss-html  自定义语法并对其进行配置
7. postcss：使用 JavaScript 转换 CSS 的工具
8. postcss-html: 用于解析 HTML（和类 HTML）的 PostCSS 语法，比如 Vue SFC 文件
9. Less：postcss-less：用于解析 Less 的 PostCSS 语法
10. Scss：postcss-scss： 用于解析 Scss 的 PostCSS 语法

**安装依赖**

```js
pnpm add stylelint-config-standard stylelint-config-standard-scss stylelint-config-recommended-scss --save-dev
pnpm add stylelint-config-recommended-vue stylelint-config-recess-order stylelint-config-html --save-dev
pnpm add postcss postcss-html postcss-scss --save-dev
// 如果你使用的是Less，把 postcss-scss 替换成 postcss-less

```

与 Prettier 配合，在 ESLint 部分，我们为配合 Prettier 时介绍了两个包， eslint-config-prettier 和 eslint-plugin-prettier而在 Stylelint 中，也有类似的包，分别是

1. stylelint-config-prettier，用于解决 Stylelint 和 Prettier 之间的规则冲突问题已经不维护了。因为从 Stylelint v15 开始，所有与样式相关的格式规则都已被弃用，比如那些强制执行特定代码风格或格式的规则。如果您使用的是 v15 或更高版本，并且没有使用这些已弃用的规则，则不再需要此插件。
2. stylelint-prettier，作为 Stylelint 规则运行 Prettier，并将差异报告为单独的 Stylelint 问题

这里只安装 stylelint-prettier、注意，请确保你已经安装了 Stylelint 和 Prettier

```js
pnpm add stylelint-prettier --save-dev
// 然后在 stylelint.config.js 中配置
// stylelint.config.js
/** @type {import('stylelint').Config} */

export default {
  plugins: ["stylelint-prettier"],
  rules: {
    "prettier/prettier": true,
  },
};
```

配置stylelint 脚本命令

1. --fix：自动修复规则报告的问题
2. --max-warnings：设置接受的警告数量限制
3. --cache：存储已处理文件的结果，以便 Stylelint 仅对更改的文件进行操作
4. --cache-location：作用同 ESLint，将缓存文件放在 node_modules/.cache 下

```json
{
  "scripts": {
    "lint:style": "stylelint --fix --max-warnings 0 --cache \"**/*.{css,scss,sass,vue}\" --cache-location \"node_modules/.cache/stylelint/\""

  }
}
// 然后就可以在终端执行命令来调用脚本
pnpm lint:style

```

### 2.1.5 EditorConfig

EditorConfig 帮助我们在不同 IDE 编辑器中维持一致的编码风格和格式化规范，比如缩进，字符编码等，有助于为跨各种编辑器和 IDE 处理同一项目的多个开发人员保持一致的编码风格。
在 VS Code 中安装 EditorConfig 插件，然后在项目根目录下创建一个 .editorconfig 文件，配置如下：

```js
# 官网：https://editorconfig.org/
root = true # 表示最顶层的 EditorConfig 文件，即停止向上找，直接使用该配置文件

[*] # 匹配所有文件
charset = utf-8 # 控制字符集
indent_style = space # 缩进方式 (tabl | space)
indent_size = 2 # 缩进大小

end_of_line = crlf # 设置换行符的类型。可选值为 lf（Unix 风格）、cr（Mac 风格）或 crlf（Windows 风格）。
insert_final_newline = true # 是否在文件末尾插入一个空行，以确保文件总是以换行符结尾
trim_trailing_whitespace = true # 是否保存文件时删除行尾的空白字符


```

在 VS Code 扩展模块搜索 EditorConfig 进行安装

### 2.1.6 其它

1. 快捷键: 上面我们配置了 ESLint、Prettier、Stylelint的脚本命令，我们可以写一个聚合的命令，统一执行我们的三条脚本命令。注意要先格式化代码后再调用 ESLint，Stylelint 进行代码检查

```json
{
  "scripts": {
    "lint": "pnpm lint:format && pnpm lint:eslint && pnpm lint:style"
  }
}
```

2. 缓存文件删除:Eslint 和 Stylelint 命令中，会生成缓存文件，这些文件存在 node_modules/.cache 目录中，有些时候我们可以删除这些缓存，它的作用在于删除缓存会强制重新检查所有文件，而不是依赖可能过时的缓存结果。这里我们需要到一个新的包 rimraf ,它是一个跨平台的删除工具，我们借助它来删除缓存文件。
   **安装**

```js
pnpm add -D rimraf
// 在 package.json 的 scripts 中写入删除缓存文件脚本：
  "scripts": {
    "clear:cache": "rimraf node_modules/.cache",
  }
// 然后就可以在终端执行命令来删除 node_modules/.cache 文件
pnpm clear:cache

```

3. 文件折叠:ESLint、Stylelint、Prettier都有其配置文件及忽略文件等，可以在 VS Code 中写入配置来折叠它们，显得整洁。

```json
{
  "explorer.fileNesting.enabled": true, //是否启用文件折叠
  "explorer.fileNesting.expand": false, //控制是否自动扩展文件嵌套
  // 折叠规则:收敛在哪
  "explorer.fileNesting.patterns": {
    "eslint.config.js": ".prettierrc.*, stylelint.*, .editorconfig, .prettierignore, .stylelintignore"
  }
}
```

## 2.2 工程层面

项目工程上的规范主要是 Git 提交规范、在团队合作中, Git 提交如果没有规范化, 会让代码库变得混乱不堪, 影响协作效率, 特别是在多人协作中。
所以我们第一步先配置git 提交规范。git提交规范化是从项目工程化的角度出发, 让团队成员在提交代码时, 通过配置的工具自动实现规范化, 从而避免一些错误。主要是: lint 校验和 Commit Message 规范化

1. husky: 一个 Git hook 工具, 使用 Husky 可以挂载 Git 钩子, 使现代的原生 Git 钩子变得简单, 即可以帮助我们在 commit(提交) 前做一些自定义操作。
2. Lint-staged: 对暂存区的 git 文件运行 linters, 也就是只对暂存的文件进行 ESLint、Prettier、Stylelint 等检查。
3. commitlint: 对 commit 信息进行检查是否符合规范, 即 lint Commit Message。
4. Commitizen: 基于 Node.js 的  git commit  命令行工具, 辅助生成标准化规范化的 Commit Message。

### 2.2.1 Husky

在我们执行 git init 命令后, 会在当前目录下生成一个 .git 的隐藏文件夹, 目录中又存在一个 hooks 文件夹。hook 是钩子的意思, 有点类似于 Vue 的生命周期钩子一样, Git 同样也能在特定的重要动作发生时触发自定义脚本。

**.git 目录结构**

```js
└── .git
    ├── COMMIT_EDITMSG  # 保存最新的commit message
    ├── config  # 仓库的配置文件
    ├── description  # 仓库的描述信息, 主要给gitweb使用
    ├── HEAD    # 指向当前分支
    ├── hooks   # 存放一些shell脚本, 可以设置特定的git命令后触发相应的脚本
    ├── index   # 二进制暂存区（stage）
    ├── info    # 仓库的其他信息
    │   └── exclude # 本地的排除文件规则, 功能和.gitignore类似
    ├── logs    # 保存所有更新操作的引用记录, 主要用于git reflog等
    ├── objects # 所有文件的存储对象
    └── refs    # 具体的引用, 主要存储分支和标签的引用

```

.git/hooks 目录下存放着一些 shell 脚本, 以 .sample 为后缀, 表示默认不启动, 这些 shell 脚本主要分为两大类：客户端和服务端两类。我们主要关注客户端部分常用一下四个:

1. pre-commit  钩子在键入提交信息前运行、所以可以进行 lint 校验, 比如 ESLint、Stylelint、Prettier 等。
2. prepare-commit-msg  钩子在启动提交信息编辑器之前, 默认信息被创建之后运行。
3. commit-msg  存有当前提交信息的临时文件, 如果该钩子脚本以非零值退出, Git 将放弃提交、所以可以对当前 Commit Message 进行检查并使用工具来规范化 Message 信息。
4. post-commit  钩子在整个提交过程完成后运行。

而要在 git 钩子里去做这些事情就需要借助工具 Husky 来配置 Git 钩子、这是因为 Husky 能监听 Git 操作并执行脚本代码。

**安装依赖**

```js
// 官网: https://github.com/typicode/husky
pnpm add --save-dev husky
pnpm add -D husky
// 安装版本是: husky 9.1.7

// 使用 Husky 推荐的 init 命令、init 命令简化了项目中的 husky 设置。它会在 .husky/ 中创建 pre-commit 脚本, 并更新 package.json “scripts”中的 prepare 脚本。
pnpm exec husky init

// 在终端运行下面的命令, 来初始化 husky
pnpm prepare

```

到这里已经可以实现对 git 提交时的校验了,不过功能比较简陋, 而且只应该 lint 我当前修改的文件, 而不是全量 lint , 这样就可以避免 lint 的耗时, 提高效率且有针对性。这时我们需要借助 lint-staged 来实现。

### 2.2.2 Lint-staged

lint-staged 是一个专门针对已放入 Git 暂存区的文件进行检查的工具, 它可以帮助我们在暂存的文件上执行 lint, 而不是对整个项目进行全量校验。这样可以显著减少 lint 校验的时间消耗, 提高效率, 并确保校验的针对性。

**安装依赖**

```js
pnpm add --save-dev lint-staged
pnpm add -D lint-staged
// 安装版本是: lint-staged 15.4.3

```

**配置**
可以通过多种方式来配置，一种普遍的方式是直接在 package.json 中配置，比如:

```js
// 在 package.json 中添加以下配置
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.vue": [
      "prettier --write",
	  "eslint --fix",
      "stylelint --fix",
    ]
  },


```

还有种方式是创建一个配置文件，比如:

```js
// 在根目录创建一个 lint-staged.config.js 文件这个文件默认导出一个对象、注意使用ESM模式。
/** @type {import('lint-staged').Config} */
export default {
  '*.vue': ['prettier --write --cache', 'eslint --fix', 'stylelint --fix'],
  '*.{js,ts,jsx,tsx}': ['prettier --write --cache', 'eslint --fix'],
  '*.{css,scss,less}': ['prettier --write --cache', 'stylelint --fix'],
  '*.html': ['prettier --write --cache', 'stylelint --fix'],
  '*.json': 'prettier --write --cache',
};
```

然后是在 Git 钩子 pre-commit 能够正确调用 lint-staged 即可实现 linter 校验。当然在运行指定的 linter 和代码格式化工具时，建议先运行 Prettier ，因为它会对代码进行整体格式化，这样可以确保代码在进行 lint 校验之前是一致且格式良好的状态。

添加新的 hook、在根目录下的终端运行如下 shell 命令。这条命令的作用是将 "pnpm lint-staged" 写入到 .husky/pre-commit 文件中。

```js
echo "pnpm lint-staged" > .husky/pre-commit

```

### 2.2.3 Commitlint

在上面两步完成后使用 git commit 命令进行提交时如果通不过校验 Commit 提交并未通过而是直接退出了。但是提交信息还是没有统一的规范的。提交信息规范化有以下优点

1. 提高代码可读性和项目质量、改善项目可维护性
2. 简化协作和沟通
3. 方便版本管理和代码回溯
4. 有助于自动化生成变更日志

在社区发展中有两个提交规范比较出色

1. Angular 规范，由 Angular 团队制定并使用，也被社区广泛接受
2. Conventional Commits 规范则是由 Angular 规范发展调整而来的一个更通用的规范

不是Angular 项目一般都是使用另一个、而要让我们的提交信息能够符合 Conventional Commits 规范，可通过使用工具如 commitlint 来实现。

**安装依赖**

```js
pnpm add --save-dev @commitlint/{cli,config-conventional}
// 会在你的 package.json 文件的 devDependencies 中生成两个依赖
@commitlint/cli，命令行工具
@commitlint/config-conventional，此配置遵循 Conventional Commits 规范，与 @commitlint/cli 配合使用

// 如果安装不了也可以单独安装这两个包

```

创建配置文件: commitlint.config.js

```js
export default {
  ignores: [(commit) => commit === ''],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 | New feature
        'fix', // 修复bug | Bug fix
        'docs', // 文档更新 | Documentation updates
        'style', // 代码格式（不影响代码运行的变动） | Code formatting (changes that do not affect code execution)
        'refactor', // 重构（既不是新增功能，也不是修改bug的代码变动） | Refactoring (code changes that neither fix a bug nor add a feature)
        'perf', // 性能优化 | Performance improvements
        'test', // 增加测试 | Adding tests
        'chore', // 构建过程或辅助工具的变动 | Changes to the build process or auxiliary tools
        'revert', // 回滚到上一个版本 | Revert to a previous version
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 | Compilation-related changes, such as release versions or changes to project build or dependencies
        'types', // 类型 | Types
        'ci', // CI 配置文件和脚本的更改 | Changes to CI configuration files and scripts
      ],
    ],
    'header-max-length': [2, 'always', 100], // 头部最大长度100
    'body-max-line-length': [2, 'always', 100], // body最大长度100
    'footer-max-line-length': [2, 'always', 100], // footer最大长度100
    'type-empty': [2, 'never'], // type 不能为空
    'subject-empty': [2, 'never'], // subject 不能为空
    // "scope-empty": [2, "never"], // scope 不能为空
    'type-case': [2, 'always', 'lower-case'], // type 小写
    'scope-case': [2, 'always', ['lower-case', 'pascal-case']], // scope - lower case、PascalCase
    'subject-case': [0, 'always'], // subject 不显示大小写
  },
  prompt: {
    questions: {
      type: {
        description: "选择你要提交的变更类型 | Select the type of change you're committing",
        enum: {
          feat: {
            description: '新功能 | A new feature',
            title: 'Features | 功能',
            emoji: '✨',
          },
          fix: {
            description: '修复bug | A bug fix',
            title: 'Bug Fixes | 修复',
            emoji: '🐛',
          },
          docs: {
            description: '仅文档更改 | Documentation only changes',
            title: 'Documentation | 文档',
            emoji: '📚',
          },
          style: {
            description:
              '不影响代码含义的更改（空白、格式化、缺少分号等）| Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles | 样式',
            emoji: '💎',
          },
          refactor: {
            description:
              '既不修复bug也不添加新功能的代码更改 | A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring | 代码重构',
            emoji: '📦',
          },
          perf: {
            description: '提高性能的代码更改 | A code change that improves performance',
            title: 'Performance Improvements | 性能优化',
            emoji: '🚀',
          },
          test: {
            description:
              '添加缺失的测试或修正现有的测试 | Adding missing tests or correcting existing tests',
            title: 'Tests | 测试',
            emoji: '🚨',
          },
          chore: {
            description:
              '构建过程或辅助工具的变动 | Changes to the build process or auxiliary tools',
            title: 'Chores | 杂务',
            emoji: '🔧',
          },
          revert: {
            description: '回滚到上一个版本 | Revert to a previous version',
            title: 'Reverts | 回滚',
            emoji: '⏪',
          },
          build: {
            description:
              '编译相关的修改，例如发布版本、对项目构建或者依赖的改动 | Changes that affect the build system or external dependencies',
            title: 'Builds | 构建',
            emoji: '🏗',
          },
          types: {
            description: '类型定义文件更改 | Changes to type definitions',
            title: 'Types | 类型',
            emoji: '🏷️',
          },
          ci: {
            description: 'CI 配置文件和脚本的更改 | Changes to CI configuration files and scripts',
            title: 'Continuous Integration | 持续集成',
            emoji: '🎡',
          },
        },
      },
      scope: {
        description:
          '变更的范围是什么（例如组件或文件名，可选）| What is the scope of this change (e.g. component or file name，optional)',
      },
      subject: {
        description:
          '写一个简短的、命令式的变更描述（必填） | Write a short, imperative tense description of the change（required）',
      },
      body: {
        description:
          '提供更长的变更描述（可选） | Provide a longer description of the change（optional）',
      },
      isBreaking: {
        description: '有什么重大变更吗？| Are there any breaking changes?',
      },
      breakingBody: {
        description:
          '重大变更提交需要一个正文。请输入提交本身的更长描述 | A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: '描述重大变更 | Describe the breaking changes',
      },
      isIssueAffected: {
        description: '此变更是否影响任何未解决的问题？| Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          '如果问题已关闭，提交需要一个正文。请输入提交本身的更长描述 | If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description:
          '添加问题引用（例如 "fix #123", "re #123"）| Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
```

写完自定义的配置规则后，我们要在创建提交之前对其进行 lint 校验，需要使用到 Husky 的 commit-msg 钩子。commit-msg 概念：存有当前提交信息的临时文件，如果该钩子脚本以非零值退出，Git 将放弃提交
运行 shell 命令:

```bash
echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg
# 这个 shell 脚本会在 .husky 文件夹生成一个 commit-msg 文件，并且写入以下内容
"pnpm dlx commitlint --edit \$1"
# 测试一下对于提交信息的检测，看是否符合我们在 Commitlint 定义的规则
pnpm exec commitlint --from HEAD~1 --to HEAD --verbose
# 这个命令的作用是检测你上一次的提交信息(前提是你有上一次提交信息)，并让 Commitlint 输出更详细的信息

# 当然也可以来测试一下提交当前commit时，lint 校验是否起作用、在暂存区加一些测试文件，然后，输入 commit 信息即可。

```

到这一步，我们已经实现了基本的 commit 信息校验。但是它的提交信息还是要自己手动输入的如果想要通过自动化程序来避免这种纯手敲 commit 信息格式的错误、这时候我们就需要 Commitizen 来辅助我们生成一套标准化规范化的 Commit 信息。

### 2.2.4 Commitizen

在 Commitlint 官网的介绍中，有推荐一个 @commitlint/prompt-cli 来让我们创建交互式命令行。
另一种代替方案是使用 Commitizen、Commitizen 是一个用于生成标准化规范化的 Commit 信息的命令行工具。

两者的区别：

1. @commitlint/prompt-cli 是官方提供的包，是 Commitlint 生态一部分，与 Commitlint 无缝衔接
2. Commitizen 拥有着更大的社区、更广泛的使用、更成熟，灵活及定制化

**安装**
安装完后，我们还需要安装一个适配器，这里介绍两个：

1. cz-conventional-changelog是 Commitizen 文档中介绍的适配器，也是广泛使用的适配器
2. @commitlint/cz-commitlint 是 Commitlint 官方提供的 Commitizen 适配器，提供了一种更现代的交互方式

```bash
pnpm add --save-dev commitizen
pnpm add --save-dev @commitlint/cz-commitlint

```

在 package.json 中写入以下内容:

```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  }
}
```

在 commitlint.config.js 文件中配置 prompt 属性，比如：

```js
/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit === ''],
  rules: {
    //...规则，上文已经配置
  },
  prompt: {
    questions: {
      type: {
        description: '选择你要提交的变更类型',
        enum: {
          feat: {
            description: '新功能',
            title: '新功能',
            emoji: '✨',
          },
          fix: {
            description: '修复bug',
            title: 'Bug修复',
            emoji: '🐛',
          },
          docs: {
            description: '仅文档更改',
            title: '文档',
            emoji: '📚',
          },
          style: {
            description: '不影响代码含义的更改（空白、格式化、缺少分号等）',
            title: '样式',
            emoji: '💎',
          },
          refactor: {
            description: '既不修复bug也不添加新功能的代码更改',
            title: '代码重构',
            emoji: '📦',
          },
          perf: {
            description: '提高性能的代码更改',
            title: '性能优化',
            emoji: '🚀',
          },
          test: {
            description: '添加缺失的测试或修正现有的测试',
            title: '测试',
            emoji: '🚨',
          },
          //更多...
        },
      },
    },
  },
};

// 在配置好上面的内容后，我们就可以来测试一下效果了
pnpm commit
```
