import { createSlice } from '@reduxjs/toolkit'
import { getProjectDetails, submitTimelines } from './timelineActions'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    project: null,
    timelines: null,
    projectDeliverables: null,
    loading: false,
    error: null
}



const timelineSlice = createSlice(
    {
        name: 'timeline',
        initialState,
        reducers: {
            // Timelines Reducers
            addTimeline: (state, action) => {
                const { projectId } = action.payload;
                const newTimeline = { id: uuidv4(), projectId: projectId };
                state.timelines.push(newTimeline);
            },
            deleteTimeline: (state, action) => {
                const timelineId = action.payload;
                state.timelines = state.timelines.filter(timeline => timeline.id !== timelineId);
            },
            updateTimelineTitle: (state, action) => {
                const { timelineId, title } = action.payload;
                const timeline = state.timelines.find(timeline => timeline.id === timelineId);
                if (timeline) {
                    timeline.timelineTitle = title;
                }
            },

            //  Single Timeline Reducers

            addTableRowsReducer: (state, action) => {
                const { timelineId } = action.payload;
                const rowsInput = {
                    itemName: "",
                    hours: "",
                    subItems: []
                };
                const timeline = state.timelines.find(timeline => timeline.id === timelineId);
                if (timeline) {
                    if (timeline.items) {
                        timeline.items.push(rowsInput);
                    }
                    else {
                        timeline.items = [rowsInput]
                        timeline.totalHours = null;
                    }
                }
            },

            addSubRowsReducer: (state, action) => {
                const { index, subIndex, timelineId } = action.payload;
                const timeline = state.timelines.find(timeline => timeline.id === timelineId);
                if (timeline) {
                    timeline.items[index].subItems.splice(subIndex + 1, 0, "");
                }

            },

            deleteTableRowsReducer: (state, action) => {
                const { index, timelineId } = action.payload;
                const timeline = state.timelines.find(timeline => timeline.id === timelineId);
                if (timeline) {
                    timeline.items.splice(index, 1);
                    timeline.totalHours = timeline.items.reduce((total, item) => (total + (item.hours ? parseInt(item.hours) : 0)), 0)

                }
            },

            deleteTableExtraRowsReducer: (state, action) => {
                const { index, subIndex, timelineId } = action.payload;
                const timeline = state.timelines.find(timeline => timeline.id === timelineId);
                if (timeline) {
                    timeline.items[index].subItems.splice(subIndex, 1);
                }
            },

            updateItemValuesReducer: (state, action) => {
                const { index, name, timelineId, value } = action.payload;
                const timeline = state.timelines.find(timeline => timeline.id === timelineId);
                if (timeline) {
                    timeline.items[index][name] = value;
                    timeline.totalHours = timeline.items.reduce((total, item) => (total + (item.hours ? parseInt(item.hours) : 0)), 0)
                }
            },
            updateSubItemValuesReducer: (state, action) => {
                const { index, subIndex, timelineId, value } = action.payload;
                const timeline = state.timelines.find(timeline => timeline.id === timelineId);
                if (timeline) {
                    timeline.items[index].subItems[subIndex] = value
                }
            },
        },



        extraReducers: builder => {
            builder.addCase(getProjectDetails.pending, state => {
                state.loading = true;
            })
                .addCase(getProjectDetails.fulfilled, (state, action) => {
                    state.project = action.payload;
                    state.timelines = action.payload.timelines;
                    state.loading = false;
                })
                .addCase(getProjectDetails.rejected, (state, action) => {
                    state.error = action.payload;
                    state.loading = false;
                })
                .addCase(submitTimelines.pending, state => {
                    state.loading = true;
                })
                .addCase(submitTimelines.fulfilled, (state, action) => {
                    state.timelines = action.payload;
                    state.loading = false;
                })
                .addCase(submitTimelines.rejected, (state, action) => {
                    state.error = action.payload;
                    state.loading = false;
                })

        }
    }
)


export const { addTimeline, deleteTimeline, updateTimelineTitle, addTableRowsReducer, addSubRowsReducer, deleteTableRowsReducer, deleteTableExtraRowsReducer, updateItemValuesReducer, updateSubItemValuesReducer } = timelineSlice.actions;
export default timelineSlice.reducer
