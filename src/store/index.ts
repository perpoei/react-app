import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'
import tabReducer from './modules/tabsStore'

export default configureStore({ reducer: { user: userReducer, tabs: tabReducer } })

const store = configureStore({ reducer: { user: userReducer, tabs: tabReducer } })

// 从 store 自身推断 RootState 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 创建带类型的 hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;