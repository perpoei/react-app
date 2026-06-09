const ChatRouter = [
    {
        path: '/chat',
        // 在这里使用懒加载，不要在外部静态导入
        component: () => import("@/pages/Chat/index.tsx"),
    },
]

export default ChatRouter