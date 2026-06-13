import { Empty, NavBar, Sticky, Tag, Field, Button, Loading } from "react-vant";
import { useNavigate, useSearchParams } from 'react-router-dom';
import '@/styles/Chat/index.css'
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showTab } from "@/store/modules/tabsStore";
import classNames from "classnames";
import type { RootState } from "@/store";
import { fetchStream } from "@/utils/request";
import type { Messages } from "@/types/chat";
import { MessageType } from "@/enum/chat";
import ChatBubble from "@/components/chatBubble";
import { TabPath } from "@/enum/tabs";

export default function Chat() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [inputMessage, setInputMessage] = useState<string>('')
    /** 会话数据 */
    const [messages, setMessages] = useState<Messages[]>([])

    /** AI处理的状态 */
    const [isStreaming, setIsStreaming] = useState<boolean>(false)

    const dispatch = useDispatch(); // ✅ 在组件内部调用 Hook
    /** 是否调起键盘 */
    const isKeyboard = useSelector((state: RootState) => state.tabs.isKeyboard)
    /** 解决tab被键盘顶起问题 */
    const handleFocus = () => dispatch(showTab({ isKeyboard: true }))
    const handleBlur = () => dispatch(showTab({ isKeyboard: false }))

    /** 返回上一页 */
    const goBack = () => {
        navigate(-1)
    }

    /** 常见问题 */
    const quickQuestion: string[] = [
        '北京有哪些必去的景点',
        '上海美食推荐',
        '成都三日游攻略',
        '如何选择旅行保险?'
    ]

    /** 置底方法 */
    const scrollToBottom = () => {
        // 找到真正的滚动容器 .app-content（父级容器）
        const scrollContainer = chatContainerRef.current?.closest('.app-content') as HTMLElement;
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }


    useEffect(() => {
        const city = searchParams.get('city')
        const scene = searchParams.get('scene')
        scene
        if (city && scene === TabPath.详情) {
            setInputMessage(`我想了解一下${city}的旅游景点~`)
        }
    }, [])

    useEffect(() => {
        // 消息变化后（DOM 更新完成）执行置底
        scrollToBottom()
    }, [messages])

    const sendMessage = (msg?: string) => {
        // 优先使用传入的参数，否则使用 inputMessage 状态
        const messageToSend = (msg ?? inputMessage).trim();

        /** 输入框无文字 or ai正在输出  **/
        if (!messageToSend || isStreaming) return

        addUserMessage(messageToSend)
        setInputMessage(''); // 清空输入框
        fetchResponse(messageToSend); // 调用AI接口
    }



    let fullResponse: string = ''
    /**
     * 处理数据块的回调函数
     * @param chunk - 接收到的任意类型的数据块
     */
    const onChunk = (chunk: string) => {
        fullResponse += chunk
        setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            // 确保最后一条是 AI 消息且 id 匹配（防止并发干扰）
            if (lastIndex >= 0 && newMessages[lastIndex].role === MessageType.AI) {
                newMessages[lastIndex] = {
                    ...newMessages[lastIndex],
                    content: fullResponse,
                }
            }
            return newMessages;
        })
        scrollToBottom(); // 滚动到底部
    }

    /**
     * 处理结束事件的回调函数
     * 当某个操作或流程结束时被调用
     */
    const onEnd = () => {
        setIsStreaming(false); /** AI返回完成 */
        scrollToBottom(); // 滚动到底部
    }

    /**
     * 处理AI返回错误信息的回调函数
     * @param {string} errMsg - 错误信息
     */
    const onError = (errMsg: string) => {
        setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            // 确保最后一条是 AI 消息且 id 匹配（防止并发干扰）
            if (lastIndex >= 0 && newMessages[lastIndex].role === MessageType.AI) {
                newMessages[lastIndex] = {
                    ...newMessages[lastIndex],
                    content: '抱歉，AI返回错误：' + errMsg,
                }
            }
            return newMessages;
        })
        setIsStreaming(false) /** AI返回错误 */
        scrollToBottom(); // 滚动到底部
        // alert('AI发生错误，请重试')
    }

    /** 获取AI响应 **/
    const fetchResponse = async (userMsg: string) => {
        setIsStreaming(true)
        let aiMessageId = Date.now() + 1;

        setMessages(prev => [...prev, {
            id: aiMessageId,
            role: MessageType.AI,
            content: '',
            timestamp: new Date().getTime()
        }])



        /** 调用流式接口 */
        fetchStream('chat',
            { message: userMsg },
            onChunk,
            onEnd,
            onError
        )
    }

    /** 发送消息 */
    const addUserMessage = (content: string) => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            role: MessageType.用户,
            content,
            timestamp: new Date().getTime()
        }])
    }

    const EmptyContent = () => {
        return (
            <div className="chat-empty">
                <Empty description="开始和AI助手聊天吧~" />
                <div className="quick-question">
                    <div className="quick-title">常见问题</div>
                    <div className='quick-question-list'>
                        {
                            quickQuestion.map((item, index) => {
                                return (
                                    <Tag
                                        mark
                                        size="large"
                                        key={index}
                                        className="quick-tag"
                                        onClick={() => sendMessage(item)}
                                    >
                                        {item}
                                    </Tag>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    /** 输入框发送按钮 */
    const SendBtn = () => <Button
        size='small'
        type='primary'
        round
        disabled={!inputMessage.trim()}
        onClick={() => sendMessage()}
    >
        发送
    </Button>

    return (
        <div className='page-container'>
            <Sticky >
                <NavBar
                    title='AI旅游助手'
                    fixed
                    onClickLeft={goBack}
                    leftText='返回'
                />
            </Sticky>

            <div className="page-content" ref={chatContainerRef}>
                {
                    messages.length === 0 ?
                        <EmptyContent /> :
                        <div className="message-list">
                            {
                                messages.map(v =>
                                    <>
                                        {
                                            v.content?.trim() &&
                                            <ChatBubble message={v} key={v.id} />
                                        }
                                    </>
                                )
                            }
                            {
                                isStreaming &&
                                <div className="streaming-indicator">
                                    <Loading type='spinner' size='16px'>AI正在生成中...</Loading>
                                </div>
                            }
                        </div>
                }
            </div>

            <div className={classNames('input-area', {
                'isKeyboardOpen': isKeyboard,
                'isKeyboardClosed': !isKeyboard,
            })}>
                <Field
                    value={inputMessage}
                    center
                    placeholder='输入您的问题...'
                    disabled={isStreaming}
                    onChange={setInputMessage}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    suffix={<SendBtn />}
                />
            </div>
        </div>
    )
}