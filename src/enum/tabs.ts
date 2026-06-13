export enum TabName {
    首页 = 'home',
    对话 = 'chat',
    我的 = 'profile',
    详情 = 'detail'
}

export enum TabPath {
    首页 = '/home',
    对话 = '/chat',
    我的 = '/profile',
    详情 = '/detail'
}

export const NeedTabList = [
    TabPath.首页,
    TabPath.对话,
    TabPath.我的
]

// 定义需要缓存的路由路径（只包含有对应组件的路径）
export const CachedPath = [
    TabPath.首页,    // /home
    TabPath.对话,    // /chat
    TabPath.详情,    // /detail
];