import { toast } from "react-toastify"
import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from './authActions'

const userToken = localStorage.getItem('access-token')
    ? JSON.parse(localStorage.getItem('access-token'))
    : null

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(userLogin.pending, state => {
            state.loading = true
            state.error = null
            toast.loading("Authentication is pending")

        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.userToken = action.payload.token
            toast.dismiss()
            toast.success("Login successfully")
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.dismiss()
            toast.error("Invalid username or password")
        })
    }
})

export default authSlice.reducer;