import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginPrerender } from 'vite-plugin-prerender'

export default defineConfig({
  plugins: [
    react(),
    VitePluginPrerender({
      // prerender the home page (add more routes as needed)
      routes: ['/'],
      // optional: increase timeout if your app fetches on mount
      renderAfterTime: 2000
    })
  ]
})
