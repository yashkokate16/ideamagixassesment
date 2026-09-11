import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice.js.jsx";
import courseReducer from "../features/courses/state/courseSlice.js";
import instructorReducer from "../features/instructors/state/instructorSlice.js";
import lectureReducer from "../features/lectures/state/lectureSlice.js";




export let store = configureStore({
    reducer:{
        auth:authReducer,
        course: courseReducer,
        instructor: instructorReducer,
        lecture: lectureReducer



    }
})

