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
        name: "Stock App Hackathon",
        short_name: "StockApp",
        description:
          "A prototype of a PWA version of a native Android stock mobile application",
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
