import { lazy } from 'react';

const Profile = lazy(() => import("../../pages/Profile/index.tsx"))

const ProfileRouter = [
    {
        path: '/profile',
        element: <Profile />,
    },
]
export default ProfileRouter