import { defineConfig } from "vite-plugin-windicss";
import colors from "windicss/colors";

export default defineConfig({
  darkMode: "class",
  extract: {
    include: ["index.html", "src/**/*.{vue, ts}"],
  },
  plugins: [
    require("@windicss/plugin-question-mark"),
    require("@windicss/plugin-scrollbar"),
  ],
  theme: {
    extend: {
      fontFamily: {
        nanumBrush: "Nanum Brush Script",
        poppins: "Poppins",
        pretendard: "Pretendard",
        yeonsung: "Yeon Sung",
      },
      colors: {
        "star-color-A": colors.white,
        "star-color-B": colors.transparent,
      },
    },
  },
});
