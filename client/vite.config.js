// Import Vite's configuration function and the React plugin for Vite
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Export the Vite configuration
export default defineConfig({
  // Register the React plugin to enable React support in the project
  plugins: [react()],
  // Server configuration settings for development
  server: {
    // Specify the port number on which the development server will run
    port: 3000,
    // Automatically open the browser when the server starts
    open: true,
    // Set up a proxy to redirect API requests during development
    proxy: {
      // Redirect requests from /graphql to the backend server running on port 3001
      '/graphql': {
        // Target server to which requests should be forwarded
        target: 'http://localhost:3001',
        // Disable SSL verification (useful for self-signed certificates)
        secure: false,
        // Adjust the origin of the host header to match the target URL
        changeOrigin: true
      }
    }
  }
})
