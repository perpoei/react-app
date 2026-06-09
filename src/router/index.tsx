import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// 懒加载布局组件
const TabBarLayout = lazy(() => import("@/pages/TabBarLayout/index.tsx"))

// 导入路由配置
import ChatRouter from './Chat';
import HomeRouter from './Home';
import ProfileRouter from './Profile';

// 辅助函数：将路由配置转换为实际的路由元素
function createLazyRoute(routeConfig: any) {
    const LazyComponent = lazy(routeConfig.component);
    return {
        ...routeConfig,
        element: routeConfig.element || (
            <Suspense fallback={<div>Loading...</div>}>
                <LazyComponent />
            </Suspense>
        )
    };
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <TabBarLayout />,
        children: [
            ...ChatRouter.map(createLazyRoute),
            ...HomeRouter.map(createLazyRoute),
            ...ProfileRouter.map(createLazyRoute),
            /** 默认重定向到首页 */
            {
                index: true,
                element: <Navigate to="/home" replace />
            }
        ]
    },
]);

export default router;