import { Button, Cell, CellGroup, Tabbar, TabbarItem } from 'react-vant';
import { FriendsO, HomeO, Search, SettingO } from '@react-vant/icons'

export default function Layout() {
    return (
        <div className='demo-tabbar'>
            <Tabbar>
                <TabbarItem icon={<HomeO />} />
                <TabbarItem icon={<Search />} />
                <TabbarItem icon={<FriendsO />} />
                <TabbarItem icon={<SettingO />} />
            </Tabbar>
        </div>
    )
}