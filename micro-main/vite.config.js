import { defineConfig } from 'vite'
import { resolve } from 'path';
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: '8090',
    open: true,
    // cors: true,
    // 端口占用直接退出
    strictPort: true,
    // proxy: {
    //   // https://cn.vitejs.dev/config/#server-proxy
    //   [viteEnv.VITE_BASE_URL]: {
    //     // 本地 8000 前端代码的接口 代理到 8888 的服务端口
    //     target: viteEnv.VITE_BASE_SERVER_URL,
    //     changeOrigin: true, // 允许跨域
    //     rewrite: (path) => path.replace(viteEnv.VITE_BASE_URL, '/')
    //   }
    // }
  },
  // 别名设置
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // 把 @ 指向到 src 目录去
    }
  },
  plugins: [vue(),UnoCSS()],
})
