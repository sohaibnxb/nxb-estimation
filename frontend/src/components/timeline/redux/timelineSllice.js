import { createSlice } from '@reduxjs/toolkit'
import { getProjectDetails } from './timelineActions'


const initialState = {
    project: null,
    projectDeliverables: null,
    loading: false,
    error: null
}

const timelineSlice = createSlice(
    {
        name: 'timeline',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getProjectDetails.pending, state => {
            })
                .addCase(getProjectDetails.fulfilled, (state, action) => {
                    state.project = action.payload
                })
                .addCase(getProjectDetails.rejected, (state, action) => {
                    state.error = action.payload
                })
        }
    }
)

export default timelineSlice.reducer
