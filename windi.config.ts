import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: "class",
  extract: {
    include: ["index.html", "src/**/*.{vue, ts}"],
  },
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        pretendard: "Pretendard",
      },
    },
  },
  plugins: [require("@windicss/plugin-question-mark")],
});
