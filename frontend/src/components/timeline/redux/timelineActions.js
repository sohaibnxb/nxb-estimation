import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../utils/api";

const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

export const getProjectDetails = createAsyncThunk(
    'timeline/getProjectDetails',
    async (idsData, { rejectWithValue }) => {
        const { id, userID, FullName, role } = idsData;
        try {
            const response = await API.get(`${backendURL}/api/projects/${id}`)
            const project = await response.data;
            return {project, userID, FullName, role};
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const submitTimelines = createAsyncThunk(
    'timeline/submitTimelines',
    async (timelines, { rejectWithValue }) => {
        try {
            const response = await API.post(`${backendURL}/api/timelines/`, {
                timelines: timelines
            })
            const updatedTimelines = await response.data.timelines
            return updatedTimelines
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

