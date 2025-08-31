import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
    server: {
        port: 3000,
        open: true,
    },
    base: "./",
    build: {
        outDir: "build",
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react", "react-dom"],
                    router: ["react-router-dom"],
                },
            },
        },
        target: "es2020",
        cssCodeSplit: true,
        chunkSizeWarningLimit: 700,
    },
});
