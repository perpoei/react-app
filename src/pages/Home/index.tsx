import { NoticeBar, NavBar, Form, Button, Picker, Input, hooks, Grid, Sticky } from 'react-vant';
import { ChatO, InfoO, UserO } from '@react-vant/icons'
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react'
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { showTab } from '@/store/modules/tabsStore'
import { TabPath } from '@/enum/tabs';
import { cityColumns } from '@/utils/cityList';
import { formRules } from '@/utils/rules'
import '@/styles/Home/index.css';

export default function Chat() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState<boolean>(false);
        const [state, updateState] = hooks.useSetState({
        city: '',
        budget: '0',
        days: '0'
    })

    const [form] = Form.useForm()

    const cityMap = cityColumns.map(item => item.text)
        .map(item => item.replace('市', ''))

    const cityList = cityMap.filter((v, i) => {
        if (i < 30) return v
    })

    /** 解决tab被键盘顶起问题 */
    const handleFocus = () =>  dispatch(showTab({isShow: false}))
    const handleBlur = () =>  dispatch(showTab({isShow: true}))

    /** 组件挂载执行一次 */
    const hotCity = useMemo(() => {
        const randomNum = [...Array(8)].map(() => Math.floor(Math.random() * 300))
        return cityMap.filter((v, i) => {
            if (randomNum.includes(i)) return v
        })
    }, []) // 空依赖数组，只计算一次

    /** 目的地选择 */
    const pickerConfirm = (_: string) => {
        updateState({city: _ ?? ''})
        setShowPicker(false)
    }

    /** 热门城市选择 */
    const handleCityTag = (cityName: string) => {
        updateState({city: cityName})
        form.setFieldValue('city', cityName)  // 同步更新表单字段值，触发校验
    }

    /** 页面跳转 */
    const goPage = (path: TabPath) => {
        navigate(path, { replace: true })
    }

    /** 表单提交 */
    const onFinish = () => {
        const { city, budget, days } = state;
        const params = new URLSearchParams({ city, budget, days });
        const path = `${TabPath.详情}?${params.toString()}`
        navigate(path)

        /** 隐藏菜单 */
        dispatch(showTab({isShow: false}))
    }

    useEffect(() => {
        dispatch(showTab({isShow: true}))
    }, [])

    const Footer = () => (
        <div style={{ margin: '16px 16px 0' }}>
            <Button
                round
                block
                nativeType='submit'
                type='primary'
            >
                开始规划
            </Button>
        </div>
    )

    return (
        <div className='page-container'>
            <Sticky >
                <NavBar
                    title="智能旅游助手"
                    fixed
                    leftArrow={false}
                />
            </Sticky>
            <div className='page-content'>
                <NoticeBar
                    className='notice-bar'
                    leftIcon={<InfoO />}
                    scrollable
                    text="基于AI的智能景点介绍与行程规划系统" />

                <div className="card">
                    <h3>规划你的旅程</h3>
                    <div>
                        <Form 
                            form={form}
                            onFinish={onFinish} 
                            footer={<Footer />}
                        >
                            <Form.Item
                                className='form-item'
                                rules={formRules.city}
                                isLink
                                name='city'
                                label='目的地'
                                trigger='onConfirm'
                                onClick={() => setShowPicker(true)}
                            >
                                <Picker
                                    popup
                                    value={state.city}
                                    visible={showPicker}
                                    columns={cityList}
                                    onConfirm={pickerConfirm}
                                    onCancel={() => setShowPicker(false)}
                                >
                                    {() => state.city || '请选择城市'}
                                </Picker>
                            </Form.Item>
                            <Form.Item
                                className='form-item'
                                rules={formRules.budget}
                                name='budget'
                                label='预算(￥)'>
                                <Input
                                    type='number'
                                    onChange={budget => updateState({ budget })}
                                    placeholder='请输入预算金额'
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                />
                            </Form.Item>
                            <Form.Item
                                className='form-item'
                                rules={formRules.days}
                                name='days'
                                label='天数' >
                                <Input
                                    type='number'
                                    onChange={days => updateState({ days })}
                                    placeholder='请输入天数' 
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <div className="card">
                    <h3>快捷入口</h3>
                    <Grid className='grid' gutter={12} columnNum={2}>
                        <Grid.Item
                            icon={<ChatO style={{ fontSize: '2rem' }} />}
                            text="AI对话"
                            onClick={() => goPage(TabPath.对话)}
                        />
                        <Grid.Item
                            icon={<UserO style={{ fontSize: '2rem' }} />}
                            text="我的"
                            onClick={() => goPage(TabPath.我的)}
                        />
                    </Grid>
                </div>
                <div className="card">
                    <h3>热门目的地</h3>
                    <Grid className='grid' gutter={10}>
                        {
                            hotCity.map((v, i) =>
                                <Grid.Item key={i} >
                                    <div className={classNames('city-tag-common', {
                                        'city-tag-active': !state.city.indexOf(v),
                                        'city-tag': !!state.city.indexOf(v)
                                    })} onClick={() => handleCityTag(v)}>{v}</div>
                                </Grid.Item>)
                        }
                    </Grid>
                </div>
            </div>
        </div >
    )
}