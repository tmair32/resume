import { defineConfig } from "vite";
import { resolve } from "path";

import eslintPlugin from "vite-plugin-eslint";
import Pages from "vite-plugin-pages";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslintPlugin(),
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
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
});
