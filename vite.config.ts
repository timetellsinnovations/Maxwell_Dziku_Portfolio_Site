import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set third parameter to '' to load all env regardless of prefix
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Robustly define process.env.API_KEY to prefer the system env (Vercel) then local env
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY),
      // Polyfill process.env for other usages
      'process.env': {}
    },
  };
});