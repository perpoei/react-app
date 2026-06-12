import { Tag, NavBar, Collapse, Sticky, Button, Loading, Empty } from 'react-vant';
import { useEffect, useState } from 'react';
import { ClockO, Logistics } from '@react-vant/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BudgetList, TagColor, timeSlot } from '@/enum/detail'
import '@/styles/Detail/index.css'
import type { AttractionDetail, TimeSlot } from '@/types/detail';
import { useTravel } from '@/hooks/useTravel';
import classNames from 'classnames';
import { TabPath } from '@/enum/tabs';


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
        navigate(TabPath.对话)
    }

    useEffect(() => {
        handleTravelPlan()
    }, [])

    /** 行程组件  */
    const DailyItineraryContent = (props: { timeSlot: TimeSlot, data: AttractionDetail }) => {
        const { data, timeSlot } = props
        return (
            <div className='dailyItinerary-content'>
                <div className='day-time'>
                    <Tag type={timeSlot.type} size="large">{timeSlot.name}</Tag>
                </div>
                <div className='scenic-spot'>{data.spot}</div>
                <div className='scenic-spot-detail'>
                    <div className='detail-item'>
                        <ClockO className='icon' fontSize={16} />
                        <span className='duration'>{data.duration}  {data.ticket}</span>
                    </div>
                    <div className="detail-item">
                        <Logistics className='icon' fontSize={18} />
                        <span>{data.transportation}</span>
                    </div>
                    <div className='detail-item decribe'>
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
        )
    }

    const DailyItineraryCollapse = () => <Collapse initExpanded={['1']}>
        {
            planData?.dailyItinerary.map((v, i) =>
                <Collapse.Item title={`第${v.day}天`} name={v.day} key={v.day} >
                    {
                        timeSlot.map(_ =>
                            <>
                                {
                                    _.type === TagColor.上午 ?
                                        <DailyItineraryContent timeSlot={_} data={v.morning} /> :
                                        _.type === TagColor.下午 ?
                                            <DailyItineraryContent timeSlot={_} data={v.afternoon} /> :
                                            <DailyItineraryContent timeSlot={_} data={v.evening} />
                                }
                            </>
                        )
                    }
                </Collapse.Item>)
        }
    </Collapse>

    /** 预算统计 */
    const BudgetItem = ({ title, cost, isTotal = false }: { title: string, cost: number | string, isTotal?: boolean }) => {
        return (
            <div className={classNames('budget-item', { 'budget-item-total': isTotal })}>
                <span className='budgetTitle'>{title}</span>
                <span className='cost'>￥{cost}</span>
            </div>
        )
    }

    const BudgetTable = () => <div className='budget-detail'>
        {
            planData?.budgetBreakdown && Object.entries(planData.budgetBreakdown)
                .map(([k, v]) => {
                    const key = k as keyof typeof BudgetList
                    return <BudgetItem title={BudgetList[key]} cost={v} key={k} />
                })
        }
        <BudgetItem title='总计' cost={budget} isTotal />
    </div>

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
                    loading ? <div className='loading-container'>
                        <Loading className='loading' vertical>正在生成旅游规划...</Loading>
                    </div> : errMsg ?
                        <Empty description={errMsg} >
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
                                <span className='adress-day' >{city}·{days}天行程</span>
                                <span className='budget' >预算￥: {budget}</span>
                            </div>

                            {
                                planData && planData.dailyItinerary && <div className='dailyItinerary'>
                                    <DailyItineraryCollapse />
                                </div>
                            }

                            {
                                planData && planData.budgetBreakdown && <div className='card'>
                                    <h3 className='title'>预算明细</h3>
                                    <BudgetTable />
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