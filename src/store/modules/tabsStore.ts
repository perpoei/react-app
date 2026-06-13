import { createSlice } from '@reduxjs/toolkit';

const tabSlice = createSlice({
    name: 'tabs',
    initialState: { 
        /** 键盘是否被调用 */
        isKeyboard: false
    },
    reducers: {
        showTab: (state, action) => {
            state.isKeyboard = action.payload.isKeyboard
        }
    }
})

export const { showTab } = tabSlice.actions
export default tabSlice.reducer