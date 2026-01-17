import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Hackathon PWA",
        short_name: "PWA",
        description:
          "A prototype of a PWA mobile app to measure CPU and storage I/O performance",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa.png",
            sizes: "144x144",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
          },
        ],
      },
    }),
  ],
});
