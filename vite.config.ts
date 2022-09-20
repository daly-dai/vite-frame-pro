import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer'; // 自动添加css兼容前缀
import cssnano from 'cssnano'; // 压缩css体积
import windi from 'vite-plugin-windicss';

import viteEslint from 'vite-plugin-eslint';

import svgr from 'vite-plugin-svgr'; // 图片组件化

import viteImagemin from 'vite-plugin-imagemin'; // 压缩图片
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // 合并图标

import { alias } from './frame.config';
// 定义css的全局变量
const variablePath = normalizePath(
  path.resolve('./src/assets/css/variable.scss')
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // 加入 babel 插件
        // 以下插件包都需要提前安装
        // 当然，通过这个配置你也可以添加其它的 Babel 插件
        plugins: [
          // 适配 styled-component
          'babel-plugin-styled-components'
        ]
      }
    }),
    windi(),
    viteEslint(),
    svgr(),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')]
    })
  ],
  css: {
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        }),
        cssnano({ preset: 'default' })
      ]
    },
    preprocessorOptions: {
      modules: {
        // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
        // 其中，name 表示当前文件名，local 表示类名
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      },
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  },
  optimizeDeps: {
    // 配置为一个字符串数组，将 `lodash-es` 和 `vue`两个包强制进行预构建
    include: ['lodash-es']
  },
  assetsInclude: ['.gltf'], // 额外的静态资源类型
  build: {
    // 文件超过8Kb 单独打包
    assetsInlineLimit: 8 * 1024
  },
  resolve: {
    // 别名配置
    alias
  }
});
