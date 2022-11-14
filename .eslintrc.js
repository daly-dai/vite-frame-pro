// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  settings: {
    react: {
      version: '999.999.999' // It will default to "detect" in the future
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 1. 接入 prettier 的规则
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 2. 加入 prettier 的 eslint 插件
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    // 允许使用any类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 组件默认名称
    'react/display-name': 'off',
    // 组件传参校验
    'react/prop-types': 0,
    'no-unused-vars': 0, //变量声明未被使用校验
    'react/jsx-uses-react': 2
  }
};
