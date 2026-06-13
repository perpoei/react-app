import {Tag, NavBar, Collapse, Sticky, Button, Loading, Empty} from 'react-vant';
import {useEffect} from 'react';
import {ClockO, Logistics} from '@react-vant/icons';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {BudgetList, BudgetType, TagColor, timeSlot} from '@/enum/detail'
import '@/styles/Detail/index.css'
import type {AttractionDetail, TimeSlot, TravelRecommendResponse} from '@/types/detail';
import {useTravel} from '@/hooks/useTravel';
import classNames from 'classnames';
import {TabPath} from '@/enum/tabs';


/** 行程组件  */
const DailyItineraryContent = (props: { timeSlot: TimeSlot, data: AttractionDetail }) => {
    const {data, timeSlot} = props
    return (
        <div className='dailyItinerary-content'>
            <div className='day-time'>
                <Tag type={timeSlot.type} size="large">{timeSlot.name}</Tag>
            </div>
            <div className='scenic-spot'>{data.spot}</div>
            <div className='scenic-spot-detail'>
                <div className='detail-item'>
                    <ClockO className='icon' fontSize={16}/>
                    <span className='duration'>{data.duration} {data.ticket}</span>
                </div>
                <div className="detail-item">
                    <Logistics className='icon' fontSize={18}/>
                    <span>{data.transportation}</span>
                </div>
                <div className='detail-item decribe'>
                    <p>{data.description}</p>
                </div>
            </div>
        </div>
    )
}

const DailyItineraryCollapse = (props: { planData: TravelRecommendResponse }) => {
    const {planData} = props
    return <Collapse initExpanded={['1']}>
        {
            planData?.dailyItinerary.map((v) =>
                <Collapse.Item title={`第${v.day}天`} name={v.day} key={v.day}>
                    {
                        timeSlot.map((_) => {
                            let data: AttractionDetail;
                            if (_.type === TagColor.上午) data = v.morning;
                            else if (_.type === TagColor.下午) data = v.afternoon;
                            else data = v.evening;
                            return <DailyItineraryContent key={_.type} timeSlot={_} data={data}/>;
                        })
                    }
                </Collapse.Item>)
        }
    </Collapse>
}

/** 预算统计 */
const BudgetItem = ({title, value, isTotal = false}: {
    title: string,
    value: number | string,
    isTotal?: boolean
}) => {
    return (
        <div className={classNames('budget-item', {'budget-item-total': isTotal})}>
            {
                title === BudgetType.备注 ? <div>
                    <span>备注</span>
                    <span className='notes'>{value}</span>
                </div> : <>
                    <span className='budgetTitle'>{title}</span>
                    <span className='cost'>￥{value}</span>
                </>
            }
        </div>
    )
}

const BudgetTable = (props: { planData: TravelRecommendResponse }) => {
    const {planData} = props
    return <div className='budget-detail'>
        {
            planData?.budgetBreakdown && Object.entries(planData.budgetBreakdown)
                .map(([k, v]) => {
                    const key = k as keyof typeof BudgetList
                    return <BudgetItem title={BudgetList[key]} value={v} key={k}/>
                })
        }
        <BudgetItem title='总计' value={planData?.totalBudget || 0} isTotal/>
    </div>
}

export default function Detail() {
    const navigate = useNavigate();
    const {
        loading,
        errMsg,
        planData,
        getTravelPlan
    } = useTravel();
    const [searchParams] = useSearchParams();

    const city = searchParams.get('city') || ''
    const budget = searchParams.get('budget') || ''
    const days = searchParams.get('days') || ''

    const title = city + `行程规划`

    const handleTravelPlan = async () => {
        await getTravelPlan({
            city, budget, days
        })
    }

    /** 返回上一页 */
    const goBack = () => {
        navigate(-1)
    }

    /** 跳转AI助手 */
    const toChat = () => {
        const params = new URLSearchParams({ city, scene: TabPath.详情 });
        const path = `${TabPath.对话}?${params.toString()}`
        navigate(path)
    }

    useEffect(() => {
        handleTravelPlan()
    }, [])

    return (
        <div className='page-container'>
            <Sticky>
                <NavBar
                    title={title}
                    fixed
                    onClickLeft={goBack}
                    leftText='返回'
                />
            </Sticky>

            <div className='page-content'>
                {
                    loading ? <div className='loading-container'>
                        <Loading className='loading' vertical>正在生成旅游规划...</Loading>
                    </div> : errMsg ?
                        <Empty description={errMsg}>
                            <Button
                                type='primary'
                                round
                                onClick={handleTravelPlan}
                            >
                                重新规划
                            </Button>
                        </Empty> :
                        <>
                            <div className='header card'>
                                <span className='adress-day'>{city}·{days}天行程</span>
                                <span className='budget'>预算￥: {budget}</span>
                            </div>

                            {
                                planData && planData.dailyItinerary && <div className='dailyItinerary'>
                                    <DailyItineraryCollapse planData={planData}/>
                                </div>
                            }

                            {
                                planData && planData.budgetBreakdown && <div className='card'>
                                    <h3 className='title'>预算明细</h3>
                                    <BudgetTable planData={planData}/>
                                </div>
                            }

                            {
                                planData && planData.tips && <div className='card'>
                                    <h3 className='title'>温馨提示</h3>
                                    <ul className='text'>
                                        {planData.tips.map(v => <li>{v}</li>)}
                                    </ul>
                                </div>
                            }

                            {
                                planData && planData.warnings && <div className='card'>
                                    <h3 className='title'>注意事项</h3>
                                    <ul className='text'>
                                        {planData.warnings.map(v => <li>{v}</li>)}
                                    </ul>
                                </div>
                            }

                            <Button className="ask-btn" type='primary' block round onClick={toChat}>咨询AI助手</Button>
                        </>
                }
            </div>
        </div>
    )
}