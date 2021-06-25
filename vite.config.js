'use strict';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import compressPlugin from 'vite-plugin-compression';
import { defineConfig } from 'vite';
import html from 'vite-plugin-html';
function resolve(dir) {
  return path.join(__dirname, dir);
}
const BASE_URL = '/';
export default defineConfig({
  // 部署应用包时的基本 URL
  base: BASE_URL,
  root: process.cwd(),
  // 输出文件目录 dist
  outDir: 'dist',
  // 作为静态资源服务的文件夹
  publicDir: 'public',
  // 文件别名
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve('src'),
      },
    ],
    extensions: ['.js', '.vue', '.json'],
  },
  // 服务配置
  server: {
    port: 8080, // 配置端口
    open: true, // 自动开启浏览器
    '/api': {
      target: 'http://127.0.0.1:8888',
      changeOrigin: true,
      secure: false,
      // ws: true, // 是否启用websockets
      // rewrite: (path) => path.replace(/^\/bins/, '')
    },
  },
  build: {
    target: 'es2015',
    // sourcemap: true,
    // 清除console debugger
    terserOptions: {
      compress: {
        // Pass true to prevent Infinity from being compressed into 1/0, which may cause performance issues on Chrome
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
  plugins: [
    vue(),
    compressPlugin({
      ext: '.gz', //gz br
      algorithm: 'gzip', //brotliCompress gzip
      verbose: true,
      disable: false,
      threshold: 1,
    }),
    html({
      minify: true,
      inject: {
        injectData: {
          title: 'vite with vue3',
          // cdn 配置
          cdn: {
            css: [],
            js: [],
          },
          BASE_URL: BASE_URL,
        },
      },
    }),
  ],
});
