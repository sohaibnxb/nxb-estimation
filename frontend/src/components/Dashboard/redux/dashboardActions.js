import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = "http://localhost:5000";

// Decoded token values

// Get the Role
export const getRole = createAsyncThunk(
    'dashboard/getRole',
    async (username, { rejectWithValue }) => {

        try {
            const response = await axios.get(`${backendURL}/api/users/selectedUser?username=${username}`)
            const role = await response.data[0]?.role_id.name;
            return role;
        } catch (error) {
            console.log("error from getRole async function", error);
            return rejectWithValue(error.message)
        }
    }

)

// Get Notifications
export const getNotifications = createAsyncThunk(
    'dashboard/getNotifications',
    async (username, { rejectWithValue }) => {

        try {
            const response = await axios.get(`${backendURL}/api/notifications?receiptName=${username}`)

            const notifications = await response.data;
            return notifications;
        } catch (error) {
            console.log("error from getRole async function", error);
            return rejectWithValue(error.message)
        }
    }
)

// Get Projects for role/mananger

export const getProjectsByManager = createAsyncThunk(
    'dashboard/getProjectsByManager',
    async (FullName, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${backendURL}/api/projects/?prepared_by=${FullName}`)
            const projects = await response.data
            debugger
            return projects
        } catch (error) {
            debugger
            console.log("Error from getProjects async function", error);
            return rejectWithValue(error.message)
        }
    }
)
// Get Projects for role/resource

export const getProjectsByResource = createAsyncThunk(
    'dashboard/getProjectsByResource',
    async (username, { rejectWithValue }) => {
        try {
            const response = axios.get(`${backendURL}/api/projects/resource/?resource_name=${username}`)
            const projects = await response.data
            return projects
        } catch (error) {
            console.log("Error from getProjects async function", error);
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
            const response = await axios.get(`${backendURL}/api/projects/Vsort`)
            const projects = await response.data
            return projects
        } catch (error) {
            console.log("Error from getVteamsProject async function", error);
            return rejectWithValue(error.message)
        }
    }
)

// Nxb Projects
export const getNxbProjects = createAsyncThunk(
    'dashboard/getNxbProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${backendURL}/api/projects/Nsort`)
            const projects = await response.data
            return projects
        } catch (error) {
            console.log("Error from getVteamsProject async function", error);
            return rejectWithValue(error.message)
        }
    }
)

// Recent Projects
export const getRecentProjects = createAsyncThunk(
    'dashboard/getRecentProjects',
    async (FullName, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${backendURL}/api/projects/dsort?prepared_by=${FullName}`)
            const projects = await response.data
            return projects
        } catch (error) {
            console.log("Error from getVteamsProject async function", error);
            return rejectWithValue(error.message)
        }
    }
) 