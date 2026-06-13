import { useMemo } from "react";
import { MessageType } from "@/enum/chat";
import type { Messages } from "@/types/chat";
import '@/styles/components/chatBubble.css'

/** 聊天气泡组件 */
export default function ChatBubble(props: { message: Messages }) {
    const { message } = props;

    const showTime = useMemo(() => message.timestamp && message.content,
        [message.timestamp, message.content]
    )

    const messageClass = useMemo(() => {
        const classMap = {
            [MessageType.用户]: 'user-message',
            [MessageType.AI]: 'ai-message'
        }
        return classMap[message.role as MessageType];
    }, [message.role]);

    /** 时间的处理 */
    const formatTime = useMemo(() => {
        if (!message.timestamp) return '';
        const date = new Date(message.timestamp);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }, [message.timestamp])

    return (
        <div className={`chat-bubble ${messageClass}`}>
            <div className="bubble-content">
                {message.role === MessageType.用户 ? (
                    <div className="message-text">{message.content}</div>
                ) : (
                    <div className="message-text ai-message">
                        {message.content && <>{message.content}</>}
                    </div>
                )}
            </div>
            {showTime && (
                <div className="message-time">
                    {formatTime}
                </div>
            )}
        </div>
    );
}