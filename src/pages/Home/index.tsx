import { NoticeBar, NavBar, Form, Button, Picker, Input, hooks, Grid } from 'react-vant';
import { ChatO, InfoO, UserO } from '@react-vant/icons'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import classNames from 'classnames';
import { TabPath } from '@/enum/tabs';
import '@/styles/Home/index.css';

export default function Chat() {
    const navigate = useNavigate();
    const [city, setCity] = useState('')

    const [showPicker, setShowPicker] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [, updateState] = hooks.useSetState({
        money: '0',
        day: '0'
    })
    const [form] = Form.useForm()

    //todo
    const cityList = ['北京', '上海', '广州', '深圳', '杭州', '厦门']

    const pickerConfirm = (_: string) => {
        setCity(_ ?? '')
        setShowPicker(false)
    }

    const handleCityTag = (cityName: string) => {
        setCity(cityName)
        form.setFieldValue('city', cityName)  // 同步更新表单字段值，触发校验
    }

    const goPage = (path: TabPath) => {
        navigate(path, { replace: true })
    }

    const onFinish = () => {
        const submit = !isSubmit
        setIsSubmit(submit)
    }

    const Footer = () => (
        <div style={{ margin: '16px 16px 0' }}>
            <Button
                round
                block
                nativeType='submit'
                type='primary'
                loading={isSubmit}>
                开始规划
            </Button>
        </div>
    )

    return (
        <div className='container'>
            <NavBar
                title="智能旅游助手"
                fixed
                leftArrow={false}
            />
            <div className='content'>
                <NoticeBar
                    className='notice-bar'
                    leftIcon={<InfoO />}
                    scrollable
                    text="基于AI的智能景点介绍与行程规划系统" />

                <div className="card">
                    <h3>规划你的旅程</h3>
                    <div>
                        <Form form={form}
                            onFinish={onFinish} footer={<Footer />}>
                            <Form.Item
                                className='form-item'
                                rules={[{ required: true, message: '请选择城市' }]}
                                isLink
                                name='city'
                                label='目的地'
                                trigger='onConfirm'
                                onClick={() => setShowPicker(true)}
                            >
                                <Picker
                                    popup
                                    value={city}
                                    visible={showPicker}
                                    columns={cityList}
                                    onConfirm={pickerConfirm}
                                    onCancel={() => setShowPicker(false)}
                                >
                                    {() => city || '请选择城市'}
                                </Picker>
                            </Form.Item>
                            <Form.Item
                                className='form-item'
                                rules={[{ required: true, message: '请输入预算金额' }]}
                                name='money'
                                label='预算(￥)'>
                                <Input
                                    type='number'
                                    onChange={money => updateState({ money })}
                                    placeholder='请输入预算金额'
                                />
                            </Form.Item>
                            <Form.Item
                                className='form-item'
                                rules={[{ required: true, message: '请输入天数' }]}
                                name='days'
                                label='天数' >
                                <Input
                                    type='number'
                                    onChange={day => updateState({ day })}
                                    placeholder='请输入天数' />
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
                            cityList.map((v, i) =>
                                <Grid.Item key={i} >
                                    <div className={classNames('city-tag-common', {
                                        'city-tag-active': !city.indexOf(v),
                                        'city-tag': !!city.indexOf(v)
                                    })} onClick={() => handleCityTag(v)}>{v}</div>
                                </Grid.Item>)
                        }
                    </Grid>
                </div>
            </div>
        </div >
    )
}