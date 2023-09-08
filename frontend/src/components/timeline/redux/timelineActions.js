import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const backendURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";


export const getProjectDetails = createAsyncThunk(
    'timeline/getProjectDetails',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${backendURL}/api/projects/${id}`)
            const project = await response.data
            return project
        } catch (error) {
            console.log("Error getting project details", error);
            return rejectWithValue(error)
        }
    }
)


