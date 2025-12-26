import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = parseInt(env.PORT || '8082', 10);
  
  return {
    server: {
      host: "0.0.0.0",
      port: port,
      allowedHosts: [
        'stg.eecfin.org',
        'web-stg.eecfin.org',
        'eecfin.org',
        'eecfinweb.localhost',
        '.eecfin.org', // allows all subdomains of aku.education
      ],
      hmr: {
        overlay: false,
      },
    },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
