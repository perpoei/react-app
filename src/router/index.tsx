import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ChatRouter from './Chat';
import HomeRouter from './Home';
import ProfileRouter from './Profile';

const Layout = lazy(() => import("../pages/Layout/index.tsx"))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,

    },
    ...ChatRouter,
    ...HomeRouter,
    ...ProfileRouter,
]);

export default router;
