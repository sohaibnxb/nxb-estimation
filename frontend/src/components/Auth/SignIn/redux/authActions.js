import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../../../utils/api';

const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {

        const payload = { username, password }
        try {
            const response = await API.post(`${backendURL}/api/users/signin`, payload)
            if (response) {
                localStorage.setItem("access-token", JSON.stringify(response?.data?.token));
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }

)
