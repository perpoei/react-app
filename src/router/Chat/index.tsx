import { lazy } from 'react';

const Chat = lazy(() => import("../../pages/Chat/index.tsx"))

const ChatRouter = [
    {
        path: '/chat',
        element: <Chat />,
    },
]

export default ChatRouter