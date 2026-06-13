import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import router from '@/router'
import store from '@/store/index.ts'
import Loading from '@/components/loading/index.tsx'

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  )
}

export default App
