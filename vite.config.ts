import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/pacientes-ms": "http://localhost:8082/",
      "/medicos-ms": "http://localhost:8082/",
      "/consultas-ms": "http://localhost:8082/",
    },
  },
  plugins: [react()],
});
