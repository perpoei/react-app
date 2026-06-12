import { useMemo } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Tabbar, TabbarItem } from 'react-vant';
// import { useSelector } from 'react-redux';
import { HomeO, UserO, ChatO } from '@react-vant/icons';
import type { TabConfig, TabChangeHandler } from '@/types/tab';
import { TabName, TabPath, NeedTabList } from '@/enum/tabs';
// import type { RootState } from '@/store/index'
import classNames from 'classnames';

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    /** 读取store的值 */
    // const isShow = useSelector((state: RootState) => state.tabs.isShow)
    const isShow = NeedTabList.includes(location.pathname as TabPath);

    /** 根据当前路径确定激活的Tab（使用 useMemo 缓存计算结果） */
    const activeTab: TabName = useMemo((): TabName => {
        if (location.pathname.includes(TabPath.首页)) return TabName.首页;
        if (location.pathname.includes(TabPath.对话)) return TabName.对话;
        if (location.pathname.includes(TabPath.我的)) return TabName.我的;
        return TabName.首页;
    }, [location.pathname]);

    /** Tab 配置列表 */
    const tabs: TabConfig[] = [
        { title: '首页', path: TabPath.首页, icon: <HomeO />, name: TabName.首页 },
        { title: '对话', path: TabPath.对话, icon: <ChatO />, name: TabName.对话 },
        { title: '我的', path: TabPath.我的, icon: <UserO />, name: TabName.我的 },
    ];

    /**
     * 处理标签页切换的回调函数（使用 replace 模式）
     * @param value 当前选中的标签页名称
     */
    const onChange: TabChangeHandler = (name: string | number): void => {
        const tab = tabs.find((t: TabConfig) => t.name === name);
        if (tab) {
            navigate(tab.path, { replace: true });
        }
    };

    return (
        <div className='app-container'>
            {/** 内容区域 */}
            <div className={classNames('app-content', {
                'app-content-padding': isShow
            })}>
                <Outlet />
                {/* TabBar固定在底部 */}
            </div>
            {
                isShow && <div className={classNames('tabbar-container animate__animated', {
                    'animate__fadeOutDown': !isShow,
                    'animate__fadeInUp': isShow
                })}>
                    <Tabbar value={activeTab} onChange={onChange}>
                        {tabs.map((tab: TabConfig) => (
                            <TabbarItem key={tab.name} icon={tab.icon} name={tab.name}>{tab.title}</TabbarItem>
                        ))}
                    </Tabbar>
                </div>
            }
        </div>
    );
}