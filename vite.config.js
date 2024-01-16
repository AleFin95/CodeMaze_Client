import { defineConfig } from "vite";
import PostcssNested from "postcss-nested";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [PostcssNested()],
    },
  },
  test: {
    environment: "jsdom",
  },
});
