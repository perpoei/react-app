const ProfileRouter = [
    {
        path: '/profile',
        // 在这里使用懒加载，不要在外部静态导入
        component: () => import("../../pages/Profile/index.tsx"),
    },
]
export default ProfileRouter