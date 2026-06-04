// Tab 模块相关类型定义
// 用于 TabBarLayout 组件和 tab 枚举相关的类型
// 注意：枚举定义在 @/enum/tabs 中，这里只定义类型

import type { ReactNode } from 'react';
import type { TabName, TabPath } from '@/enum/tabs';

// Tab 配置接口
export interface TabConfig {
    title: string;
    path: TabPath;
    icon: ReactNode;
    name: TabName;
}

// TabBar 切换事件处理函数类型
export type TabChangeHandler = (name: string | number) => void;

// Tab 状态接口（如果需要在组件中使用）
export interface TabState {
    activeTab: TabName;
    tabs: TabConfig[];
    onChange: TabChangeHandler;
}
