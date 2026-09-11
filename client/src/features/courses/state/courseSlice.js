import { createSlice } from "@reduxjs/toolkit";
import {getAllCourses, createCourse, updateCourse, deleteCourse} from "./courseThunk";

const initialState = {
    courses: [],
    isLoading: false,
    error: null
};

const courseSlice = createSlice({
    name: "course",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        // GET COURSES

        builder
            .addCase(getAllCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.data;
            })

            .addCase(getAllCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(createCourse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoading = false;

                state.courses.push(action.payload.data);
            })

            .addCase(createCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateCourse.pending, (state) => {
    state.isLoading = true;
    state.error = null;
})

.addCase(updateCourse.fulfilled, (state, action) => {
    state.isLoading = false;

    const updatedCourse = action.payload.data;

    const index = state.courses.findIndex(
        (course) => course._id === updatedCourse._id
    );

    if (index !== -1) {
        state.courses[index] = updatedCourse;
    }
})

.addCase(updateCourse.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
})
.addCase(deleteCourse.pending, (state) => {
    state.isLoading = true;
    state.error = null;
})

.addCase(deleteCourse.fulfilled, (state, action) => {
    state.isLoading = false;

    state.courses = state.courses.filter(
        (course) => course._id !== action.payload.courseId
    );
})

.addCase(deleteCourse.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
})
            
    }
});

export default courseSlice.reducer;