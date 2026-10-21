import { fileURLToPath, URL } from 'node:url'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Default used by the %VITE_APP_URL% placeholders in index.html (open graph tags)
  process.env.VITE_APP_URL ??= env.VITE_APP_URL || 'http://localhost:3000'

  return {
    // Serve the app under a sub-path, e.g. BASEPATH=/sos
    base: env.BASEPATH ? `${env.BASEPATH.replace(/\/$/, '')}/` : '/',
    plugins: [
      // Must come before the React plugin
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      react(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000
    },
    preview: {
      port: 3000
    }
  }
})
