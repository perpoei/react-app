import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import '@/styles/common.css'
import 'animate.css';
import { initPerformanceMonitoring } from '@/utils/performance'

// 初始化性能监控
initPerformanceMonitoring()

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
