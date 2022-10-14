import { defineConfig } from "vite-plugin-windicss";
import colors from "windicss/colors";

export default defineConfig({
  darkMode: "class",
  extract: {
    include: ["index.html", "src/**/*.{vue, ts}"],
  },
  plugins: [require("@windicss/plugin-question-mark")],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        pretendard: "Pretendard",
      },
      colors: {
        "star-color-A": colors.white,
        "star-color-B": colors.transparent,
      },
    },
  },
});
