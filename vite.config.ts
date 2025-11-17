import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@formValidation": path.resolve(__dirname, "src/formValidation/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@state": path.resolve(__dirname, "src/state/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@translation": path.resolve(__dirname, "src/translation/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  server: {
    port: 3000,
  },
})
