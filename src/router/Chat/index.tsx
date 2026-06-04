import { lazy, Suspense } from 'react';

const Chat = lazy(() => import("@/pages/Chat/index.tsx"))
const LoadingComponent = lazy(() => import("@/components/common/loading/index"))

const ChatRouter = [
    {
        path: '/chat',
        element:  <Suspense fallback={<LoadingComponent />}><Chat /></Suspense>,
    },
]

export default ChatRouter