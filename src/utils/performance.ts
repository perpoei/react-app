// 性能监控工具
export interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstPaint: number
  firstContentfulPaint: number
  timeToInteractive: number
}

// 测量页面加载性能
export function measurePerformance(): PerformanceMetrics {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  const paint = performance.getEntriesByType('paint')

  return {
    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    timeToInteractive: navigation.domInteractive - navigation.fetchStart,
  }
}

// 记录性能数据
export function logPerformanceMetrics(): void {
  if (typeof window === 'undefined') return

  // 监听页面加载完成
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = measurePerformance()

      console.group('🚀 性能指标')
      console.log(`页面加载时间: ${metrics.loadTime.toFixed(2)}ms`)
      console.log(`DOM 内容加载: ${metrics.domContentLoaded.toFixed(2)}ms`)
      console.log(`首次绘制: ${metrics.firstPaint.toFixed(2)}ms`)
      console.log(`首次内容绘制: ${metrics.firstContentfulPaint.toFixed(2)}ms`)
      console.log(`可交互时间: ${metrics.timeToInteractive.toFixed(2)}ms`)
      console.groupEnd()

      // 发送到分析服务（可选）
      if (metrics.loadTime > 3000) {
        console.warn('⚠️ 页面加载时间超过 3 秒，需要优化！')
      }
    }, 0)
  })
}

// 预加载关键资源
export function preloadResources(): void {
  const resources = [
    '/src/main.tsx',
    // 添加其他关键资源路径
  ]

  resources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource
    link.as = 'script'
    link.type = 'module'
    document.head.appendChild(link)
  })
}

// 检查网络状况
export function checkNetworkStatus(): void {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    const effectiveType = connection.effectiveType
    const downlink = connection.downlink

    console.log(`网络类型: ${effectiveType}`)
    console.log(`下行速度: ${downlink} Mbps`)

    if (effectiveType === '2g' || effectiveType === 'slow-2g') {
      console.warn('⚠️ 网络状况较差，已启用轻量模式')
      // 可以在这里添加针对弱网的优化逻辑
    }
  }
}

// 初始化性能监控
export function initPerformanceMonitoring(): void {
  logPerformanceMetrics()
  preloadResources()
  checkNetworkStatus()
}