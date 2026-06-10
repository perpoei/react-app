import { createSlice } from '@reduxjs/toolkit';

const tabSlice = createSlice({
    name: 'tabs',
    initialState: { 
        /** 用于主页底部tab的显示 */
        isShow: true
    },
    reducers: {
        showTab: (state, action) => {
            state.isShow = action.payload.isShow
        }
    }
})

export const { showTab } = tabSlice.actions
export default tabSlice.reducer