import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  /** 数据状态 */
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },

  /** 同步修改方法 */
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    loginStart(state) {
      state.loading = true
    },
    loginSuccess(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false
    },
    loginError(state, action) {
      state.error = action.payload.error
      state.loading = false
    },
    logout(state) {
      state.user = null
      state.token = null        
}
  },
})

export const { loginStart, loginSuccess, loginError, logout } = userSlice.actions
export default userSlice.reducer            