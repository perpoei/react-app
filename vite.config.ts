import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pxtorem from 'postcss-pxtorem'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

console.log('Vite config loaded', path.resolve(__dirname, 'src'))

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  plugins: [react(), tailwindcss(),
  //    () => pxtorem({
  //   rootValue: 37.5,
  //   propList: ['*'],
  //   selectorBlackList: ['tab-layout'], // tab不转rem
  //   minPixelValue: 1
  // })
],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  }
})
