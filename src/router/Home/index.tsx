import { lazy } from 'react';

const Home = lazy(() => import("../../pages/Home/index.tsx"))

const HomeRouter = [
    {
        path: '/home',
        element: <Home />,
    },
]

export default HomeRouter