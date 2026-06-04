import { NoticeBar } from 'react-vant';
import { InfoO } from '@react-vant/icons'
import  '@/styles/Home/index.css';

export default function Chat() {
    return (
        <div className='container'>
            <NoticeBar leftIcon={<InfoO />} scrollable text="基于AI的智能景点介绍与行程规划系统" />
            <div className="card search-card">
                <h3>规划你的旅程</h3>
            </div>
            <div className="card"></div>
            <div className="card"></div>
        </div>
    )
}