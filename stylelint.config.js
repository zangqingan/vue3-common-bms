/** @type {import('stylelint').Config} */
export default {
  // 扩展现有配置
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-html'],
  // 作为 Stylelint 规则运行 Prettier  
  plugins: ['stylelint-prettier'],
  // 自定义规则
  rules: {
    'prettier/prettier': true,
    'block-no-empty': true,// 禁止空块
    'max-nesting-depth': 3,// 限制嵌套层数
    'no-empty-source': null,
    'import-notation': null,
    'selector-class-pattern': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'use',
          'mixin',
          'include',
          'extend',
          'forward',
          'if',
          'else',
          'each',
        ],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep'],
      },
    ],
  },
  // 指定要应用配置的文件子集
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue/scss'],
      rules: {},
    },
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
      customSyntax: 'postcss-html',
      extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
    '**/*.yml',
    '**/*.d.ts',
  ],
};