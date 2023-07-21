import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../components/Auth/SignIn/redux/authSlice"
import dashboardReducer from "../components/Dashboard/redux/dashboardSlice"
import timelineReducer from "../components/timeline/redux/timelineSllice"
const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    auth: authReducer,
    timeline: timelineReducer,
});

export default rootReducer;