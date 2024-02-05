import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../../utils/api';

const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

export const getAllProjects = createAsyncThunk(
    'dashboard/getAllProjects',
    async (role, { rejectWithValue }) => {
        try {
            const response = await API.get(`${backendURL}/api/projects/admin`);
            const allProjects = response.data;
            return allProjects;
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);

// Get the Role
export const getRole = createAsyncThunk(
    'dashboard/getRole',
    async (username, { rejectWithValue }) => {

        try {
            const response = await API.get(`${backendURL}/api/users/selectedUser?username=${username}`)
            const role = await response.data[0]?.role_id.name;
            return role;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }

)

// Get Notifications
export const getNotifications = createAsyncThunk(
    'dashboard/getNotifications',
    async (username, { rejectWithValue }) => {

        try {
            const response = await API.get(`${backendURL}/api/notifications?receiptName=${username}`)
            const notifications = await response.data;
            return notifications;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Get Projects for role/mananger

export const getProjectsByManager = createAsyncThunk(
    'dashboard/getProjectsByManager',
    async ({ FullName, id }, { rejectWithValue }) => {
        try {
            const response = await API.get(`${backendURL}/api/projects/?prepared_by=${FullName}&id=${id}`)
            const projects = await response.data;
            return projects
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
// Get Projects for role/resource

export const getProjectsByResource = createAsyncThunk(
    'dashboard/getProjectsByResource',
    async (userData, { rejectWithValue }) => {
        const { FullName, id } = userData;
        try {
            const response = API.get(`${backendURL}/api/projects/resource/?resource_name=${FullName}&id=${id}`)
            const projects = await response;
            return projects.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Projects Sorting

// Vteams Project
export const getVteamsProjects = createAsyncThunk(
    'dashboard/getVteamsProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get(`${backendURL}/api/projects/Vsort`)
            const projects = await response.data
            return projects
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
// Nxb Projects
export const getNxbProjects = createAsyncThunk(
    'dashboard/getNxbProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get(`${backendURL}/api/projects/Nsort`)
            const projects = await response.data
            return projects
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Recent Projects
export const getRecentProjects = createAsyncThunk(
    'dashboard/getRecentProjects',
    async (FullName, { rejectWithValue }) => {
        try {
            const response = await API.get(`${backendURL}/api/projects/dsort?prepared_by=${FullName}`)
            const projects = await response.data
            return projects
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
) 