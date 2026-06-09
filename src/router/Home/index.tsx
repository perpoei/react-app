const HomeRouter = [
    {
        path: '/home',
        // 在这里使用懒加载，不要在外部静态导入
        component: () => import("@/pages/Home/index.tsx"),
    },
]

export default HomeRouter