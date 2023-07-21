import axios from "axios";
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = "http://localhost:5000";

export const userLogin = createAsyncThunk(
    'auth/login',
    // async ({ email, password }, { rejectWithValue }) => {
    //     try {
    //         // configure header's Content-Type as JSON
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         }
    //         const { data } = await axios.post(
    //             `${backendURL}/api/user/login`,
    //             { email, password },
    //             config
    //         )
    //         // store user's token in local storage
    //         localStorage.setItem('userToken', data.userToken)
    //         return data
    //     } catch (error) {
    //         // return custom error message from API if any
    //         if (error.response && error.response.data.message) {
    //             return rejectWithValue(error.response.data.message)
    //         } else {
    //             return rejectWithValue(error.message)
    //         }
    //     }
    // }

    async ({ username, password }, { rejectWithValue }) => {

        const payload = { username, password }
        try {
            const response = await axios.post(`${backendURL}/api/users/signin`, payload)
            // Setting values in local storage
            if (response) {
                localStorage.setItem("access-token", JSON.stringify(response?.data?.token));
                localStorage.setItem("user", response.data.FullName);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("managerName", response.data.managerName);
            }
            return response.data
        } catch (error) {
            console.log("These credentials do not match our records")
            return rejectWithValue(error.message)
        }
    }

)


// export const userLogin = createAsyncThunk(
//     'auth/login',
    

//     async ({ username, password }, { rejectWithValue }) => {

//         const payload = { username, password }
//         try {
//             const response = await axios.post(`${backendURL}/api/users/signin`, payload)
//             // Setting values in local storage
//             if (response) {
//                 localStorage.setItem("access-token", JSON.stringify(response?.data?.token));
//                 localStorage.setItem("user", response.data.FullName);
//                 localStorage.setItem("username", response.data.username);
//                 localStorage.setItem("managerName", response.data.managerName);
//             }
//             return response.data
//         } catch (error) {
//             console.log("These credentials do not match our records")
//             return rejectWithValue(error.message)
//         }
//     }

// )