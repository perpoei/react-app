import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

console.log('Vite config loaded', path.resolve(__dirname, 'src'))

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api/travel': {
        target: 'http://127.0.0.1:3300',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 启用源码映射（生产环境关闭）
    sourcemap: false,
    // 压缩选项
    minify: 'esbuild',
    // Rollup 选项优化
    rollupOptions: {
      output: {
        // 入口文件命名
        entryFileNames: 'assets/js/[name]-[hash].js',
        // 代码分割文件命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        // 资源文件命名
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  }
})