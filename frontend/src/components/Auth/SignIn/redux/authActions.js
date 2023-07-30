import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = "http://localhost:5000";

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {

        const payload = { username, password }
        try {
            const response = await axios.post(`${backendURL}/api/users/signin`, payload)
            // Setting values in local storage
            if (response) {
                localStorage.setItem("access-token", JSON.stringify(response?.data?.token));
                // localStorage.setItem("user", response.data.FullName);
                // localStorage.setItem("username", response.data.username);
                // localStorage.setItem("managerName", response.data.managerName);
            }
            return response.data
        } catch (error) {
            console.log("These credentials do not match our records")
            return rejectWithValue(error.message)
        }
    }

)