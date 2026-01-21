import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Define 'process.env' as an object to prevent "process is not defined" crashes
      'process.env': {
         API_KEY: env.API_KEY
      },
      // Explicitly replace the specific key as well for safety
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});