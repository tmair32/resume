import { defineConfig } from "vite";
import { resolve } from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import eslintPlugin from "vite-plugin-eslint";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Pages from "vite-plugin-pages";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    AutoImport({
      imports: [
        // presets
        "vue",
        "vue-router",
        // custom
        {
          "@vueuse/core": [
            // named imports
            "useMouse", // import { useMouse } from '@vueuse/core',
            // alias
            "useFetch",
          ],
          axios: [
            // default imports
            ["default", "axios"], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: "src/auto-imports.d.ts",
    }),
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      deep: true,
      dts: true,
      resolvers: [IconsResolver({ componentPrefix: "" })],
    }),
    eslintPlugin(),
    Icons({
      autoInstall: true,
      defaultStyle: "vertical-align: middle;",
    }),
    Pages({
      dirs: [
        {
          dir: "src/pages",
          baseRoute: "",
        },
      ],
      extensions: ["vue"],
    }),
    vue(),
    WindiCSS(),
  ],
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
  },
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  server: {
    port: 3005,
  },
});
