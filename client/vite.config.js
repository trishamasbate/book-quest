import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export Vite configuration
export default defineConfig({
  // Include the React plugin for Vite
  plugins: [react()],
  server: {
    // Set the development server to run on port 3000
    port: 3000,
    // Automatically open the browser when the server starts
    open: true,
    proxy: {
      // Proxy API requests to the backend server
      '/graphql': {
        target: 'http://localhost:3001', // Backend server URL
        secure: false, // Disable SSL verification for the proxy
        changeOrigin: true // Change the origin of the host header to the target URL
      }
    }
  }
});