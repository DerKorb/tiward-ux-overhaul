// vite.config.js
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "./src/init.js", dest: "." },
        { src: "./manifest.json", dest: "." },
      ],
    }),
  ],
  resolve: {
    alias: {
      three:
        "https://www.twilightwars.com/js/vendor/three/build/three.module.js",
    },
  },
  build: {
    outDir: "build",
    lib: {
      name: "test",
      entry: "src/app.ts",
      formats: ["iife"],
      fileName: "bundle.js",
    },
    rollupOptions: {
      external: ["chrome"],
    },
    terserOptions: {
      compress: false,
      mangle: false,
    },
  },
});
