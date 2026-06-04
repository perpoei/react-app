import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ChatRouter from './Chat';
import HomeRouter from './Home';
import ProfileRouter from './Profile';

const TabBarLayout = lazy(() => import("@/pages/TabBarLayout/index.tsx"))

const router = createBrowserRouter([
    {
        path: '/',
        element: <TabBarLayout />,
        children: [
            ...ChatRouter,
            ...HomeRouter,
            ...ProfileRouter,
            /** 默认重定向到首页 */
            {
                index: true,
                element: <Navigate to="/home" replace />
            }
        ]
    },
]);

export default router;
