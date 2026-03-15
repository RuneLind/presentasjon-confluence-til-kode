import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/presentasjon-confluence-til-kode/" : "/",
  plugins: [
    react(),
    {
      name: "presentation-url",
      configureServer(server) {
        server.httpServer?.once("listening", () => {
          const address = server.httpServer?.address();
          if (address && typeof address === "object") {
            console.log(`\n  Presentation: http://localhost:${address.port}/presentation.html\n`);
          }
        });
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith('.md')) {
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          }
          next();
        });
      },
    },
  ],
  root: ".",
  resolve: {
    alias: {
      remotion: path.resolve(__dirname, "src/remotion-mock.tsx"),
      "@remotion/transitions/fade": path.resolve(__dirname, "src/transitions-mock.tsx"),
      "@remotion/transitions/wipe": path.resolve(__dirname, "src/transitions-mock.tsx"),
      "@remotion/transitions": path.resolve(__dirname, "src/transitions-mock.tsx"),
    },
  },
  server: {
    port: 5173,
    open: "/presentation.html",
  },
  build: {
    outDir: "dist-presentation",
    rollupOptions: {
      input: path.resolve(__dirname, "presentation.html"),
    },
  },
});
