import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons/apple-touch-icon.png"],
      manifest: {
        name: "I Ching — Consultas",
        short_name: "I Ching",
        description:
          "Un espacio de calma para tus consultas al I Ching, con diario personal.",
        lang: "es",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#fafaf9",
        theme_color: "#9c6644",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // La app no hace llamadas de red (todo el estado vive en IndexedDB
        // local): basta con precachear el propio bundle para que funcione
        // sin conexión, sin necesidad de estrategias de runtime caching.
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
      },
    }),
  ],
});
