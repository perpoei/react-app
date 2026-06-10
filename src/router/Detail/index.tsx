const DetailRouter = [
    {
        path: '/detail',
        // 在这里使用懒加载，不要在外部静态导入
        component: () => import("@/pages/Detail/index.tsx"),
    },
]

export default DetailRouter