import { createSlice } from '@reduxjs/toolkit'
import { getRole, getNotifications, getProjectsByManager, getProjectsByResource, getVteamsProjects, getNxbProjects, getRecentProjects, getAllProjects } from './dashboardActions'


const initialState = {
    projects: [],
    notifications: null,
    role: null,
    loading: false,
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Get Role 
        builder.addCase(getRole.pending, state => {
            state.error = null
        })
            .addCase(getRole.fulfilled, (state, action) => {
                state.role = action.payload
            })
            .addCase(getRole.rejected, (state, action) => {
                state.error = action.payload
            })

            // Get Notifications 
            .addCase(getNotifications.pending, state => {
                // state.loading = true
                state.error = null
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                // state.loading = false
                state.notifications = action.payload
            })
            .addCase(getNotifications.rejected, (state, action) => {
                // state.loading = false
                state.error = action.payload
            })

            // Get Project for manager
            .addCase(getProjectsByManager.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getProjectsByManager.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
            .addCase(getProjectsByManager.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Get all projects for admin
            .addCase(getAllProjects.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
            .addCase(getAllProjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Get project for resouce 
            .addCase(getProjectsByResource.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getProjectsByResource.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
            .addCase(getProjectsByResource.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Projects Sorting
            // Vteams Projects
            .addCase(getVteamsProjects.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getVteamsProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
            .addCase(getVteamsProjects.rejected, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
            // Nxb Projects
            .addCase(getNxbProjects.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getNxbProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
            .addCase(getNxbProjects.rejected, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
            // Recent Projects
            .addCase(getRecentProjects.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getRecentProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
            .addCase(getRecentProjects.rejected, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
    }


})

export default dashboardSlice.reducer;