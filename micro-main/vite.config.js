import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// elementPlus icons
import * as EleIcons from "@element-plus/icons-vue";
// 原子CSS UnoCSS
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
// Unocss 指令插件
import transformerDirective from "@unocss/transformer-directives";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  // env 环境变量
  const viteEnv = loadEnv(env.mode, `./env`);
  console.log('viteEnv: ', viteEnv);
  return {
    server: {
      host: "0.0.0.0",
      port: "8090",
      open: true,
      // cors: true,
      // 端口占用直接退出
      strictPort: true,
      // proxy: {
      //   // https://cn.vitejs.dev/config/#server-proxy
      //   [viteEnv.VITE_BASE_URL]: {
      //     // 本地 8090 前端代码的接口 代理到 8888 的服务端口
      //     target: viteEnv.VITE_BASE_SERVER_URL,
      //     changeOrigin: true, // 允许跨域
      //     rewrite: (path) => path.replace(viteEnv.VITE_BASE_URL, '/')
      //   }
      // }
    },
    // 别名设置
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"), // 把 @ 指向到 src 目录去
      },
    },
    plugins: [
      vue(),
      Unocss({
        // 预设
        presets: [
          presetUno(),
          presetAttributify({
            prefix: "uno-",
            prefixedOnly: true,
          }),
        ],
        transformers: [transformerDirective()],
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          (name) =>
            EleIcons[name]
              ? { importName: name, path: "@element-plus/icons-vue" }
              : null,
        ],
      }),
    ],
  };
});
