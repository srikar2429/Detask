import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
//import ViteAliases from "vite-aliases";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),  
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
