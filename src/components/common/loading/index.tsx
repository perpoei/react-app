import { useState, useEffect } from 'react'

export default function Loading() {
    const [showProgress, setShowProgress] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // 模拟加载进度
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(timer)
                    return prev
                }
                return prev + Math.random() * 20
            })
        }, 200)

        // 显示进度条
        const showTimer = setTimeout(() => {
            setShowProgress(true)
        }, 1000)

        return () => {
            clearInterval(timer)
            clearTimeout(showTimer)
        }
    }, [])

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
        }}>
            {/* Logo 或应用图标 */}
            <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
                <span style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>智</span>
            </div>

            {/* 应用名称 */}
            <h1 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '32px',
                margin: 0
            }}>
                智能旅游助手
            </h1>

            {/* 加载动画 */}
            <div style={{
                width: '200px',
                height: '4px',
                backgroundColor: '#f0f0f0',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '16px'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    transition: 'width 0.3s ease',
                    borderRadius: '2px'
                }} />
            </div>

            {/* 加载提示 */}
            <p style={{
                fontSize: '14px',
                color: '#666',
                margin: 0,
                opacity: showProgress ? 1 : 0,
                transition: 'opacity 0.3s ease'
            }}>
                {showProgress ? '正在初始化应用...' : '准备中...'}
            </p>

            {/* 移动端优化提示 */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                fontSize: '12px',
                color: '#999',
                textAlign: 'center',
                padding: '0 20px'
            }}>
                <p style={{ margin: 0 }}>首次加载可能需要几秒钟</p>
                <p style={{ margin: '4px 0 0 0' }}>请确保网络连接稳定</p>
            </div>
        </div>
    )
}