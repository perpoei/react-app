import { Tag, NavBar, Collapse, Sticky, Button, Loading } from 'react-vant';
import { useEffect, useState } from 'react';
import { ClockO, Logistics } from '@react-vant/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { timeSlot } from '@/enum/detail'
import '@/styles/Detail/index.css'
import type { TimeSlot } from '@/types/detail';
import { useTravel } from '@/hooks/useTravel';


export default function Detail() {
    const navigate = useNavigate();
    const {
        planData, 
        // setPlanData, 
        getTravelPlan
    } = useTravel();
    const [searchParams] = useSearchParams();
    const [isShow, setIsShow] = useState(false)

    const city = searchParams.get('city') || ''
    const budget = searchParams.get('budget') || ''
    const days = searchParams.get('days') || ''

    const title = city + `行程规划`
    console.log('searchParams', city, budget, days)

    const handleTravelPlan = async () => {
        await getTravelPlan({
            city, budget, days
        })

        console.log('planData', planData)
    }


    /** 返回上一页 */
    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        setIsShow(true)
        handleTravelPlan()
    }, [])

    /** schedule Component  */
    const ScheduleComponent = (props: { data: TimeSlot }) => {
        const { data } = props
        return (
            <div className='schedule-content'>
                <div className='day-time'>
                    <Tag type={data.type} size="large">{data.name}</Tag>
                </div>
                <div className='scenic-spot'>颐和园</div>
                <div className='scenic-spot-detail'>
                    <div className='detail-item'>
                        <ClockO className='icon' fontSize={16} />
                        <span className='ticket-cost'>30元 (大门)/60元 (联票)</span>
                    </div>
                    <div className="detail-item">
                        <Logistics className='icon' fontSize={16} />
                        <span>地铁4号线北宫门站D口出</span>
                    </div>
                    <div className='detail-item decribe'>
                        <p>
                            颐和园是中国清朝时期皇家园林，以昆明湖、万寿山为基址，汲取江南园林的设计手法而建成。
                            被誉为"皇家园林博物馆”。建议从北宫门进入，游览苏州街、四大部洲，登万寿山俯瞰昆明湖，长廊漫步，
                            感受皇家园林的气派与精致。
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    /** 预算统计 */
    const BudgetItem = () => {
        return (
            <div className='budget-item'>
                <span className='thing'>住宿</span>
                <span className='cost'>￥5000</span>
            </div>
        )
    }

    return (
        <div className='page-container'>
            <Sticky >
                <NavBar
                    title={title}
                    fixed
                    onClickLeft={goBack}
                    leftText='返回'
                />
            </Sticky>

            <div className='page-content'>
                {
                    !isShow ? <div className='loading-container'>
                        <Loading className='loading' vertical>正在生成旅游规划...</Loading>
                    </div> : <>
                        <div className='header card'>
                            <span className='adress-day' >{city}·2天行程</span>
                            <span className='budget' >预算￥: 5000</span>
                        </div>

                        <div className='schedule'>
                            <Collapse initExpanded={['1']}>
                                <Collapse.Item title="第1天" name="1">
                                    {
                                        timeSlot.map(v => (<ScheduleComponent data={v} />))
                                    }
                                </Collapse.Item>
                                <Collapse.Item title="第2天" name="2">
                                    {
                                        timeSlot.map(v => (<ScheduleComponent data={v} />))
                                    }
                                </Collapse.Item>
                                <Collapse.Item title="第3天" name="3">
                                    {
                                        timeSlot.map(v => (<ScheduleComponent data={v} />))
                                    }
                                </Collapse.Item>
                            </Collapse>
                        </div>

                        <div className='card'>
                            <h3 className='title'>预算明细</h3>
                            <div className='budget-detail'>
                                <BudgetItem />
                                <BudgetItem />
                                <BudgetItem />
                                <BudgetItem />
                                <BudgetItem />
                                <BudgetItem />
                            </div>
                        </div>

                        <div className='card'>
                            <h3 className='title'>温馨提示</h3>
                            <p className='text'>
                                故宫门票非常紧张，建议提前7天在官网或微信小程序预。
                                约，通常在晚上20:00放票。<br />
                                北京早晚高峰交通拥堵严重，建议优先选择地铁出行，覆盖景点广且准时。<br />
                                前往天安门广场参观需提前1天在'天安门广场预约参观小程序预约，否则无法进入广场区域。
                            </p>
                        </div>

                        <div className='card'>
                            <h3 className='title'>注意事项</h3>
                            <p className='text'>
                                故宫门票非常紧张，建议提前7天在官网或微信小程序预。
                                约，通常在晚上20:00放票。
                                北京早晚高峰交通拥堵严重，建议优先选择地铁出行，覆盖景点广且准时。
                                前往天安门广场参观需提前1天在'天安门广场预约参观小程序预约，否则无法进入广场区域。
                            </p>
                        </div>

                        <Button className="ask-btn" type='primary' block round>咨询AI助手</Button>
                    </>
                }
            </div>
        </div>
    )
}