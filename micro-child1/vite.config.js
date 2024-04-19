import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// elementPlus icons
import * as EleIcons from "@element-plus/icons-vue"
// 原子CSS UnoCSS
import Unocss from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss';
// Unocss 指令插件
import transformerDirective from '@unocss/transformer-directives';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: '8091',
    open: true,
    // 端口占用直接退出
    strictPort: true,
  },
  // 别名设置
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // 把 @ 指向到 src 目录去
    }
  },
  plugins: [
    vue(),
    Unocss({
      // 预设
      presets: [
        presetUno(),
        presetAttributify({
          prefix: 'uno-',
          prefixedOnly: true
        })
      ],
      transformers: [transformerDirective()],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        (name) => EleIcons[name] ? { importName: name, path: "@element-plus/icons-vue" } : null,
      ],
    }),
  ],
})
