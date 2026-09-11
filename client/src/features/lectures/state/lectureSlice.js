import { createSlice } from "@reduxjs/toolkit";

import {
    createLecture,
    getLecturesByCourse,
    deleteLecture,
    getMyLectures
} from "./lectureThunk";


const lectureSlice = createSlice({

    name: "lecture",

    initialState: {
        lectures: [],
        isLoading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {

        // CREATE LECTURE

        builder
            .addCase(createLecture.pending, (state) => {

                state.isLoading = true;
                state.error = null;

            })

            .addCase(createLecture.fulfilled, (state, action) => {

                state.isLoading = false;

                state.lectures.push(action.payload.data);

            })

            .addCase(createLecture.rejected, (state, action) => {

                state.isLoading = false;
                state.error = action.payload;

            });


        // GET LECTURES

        builder
            .addCase(getLecturesByCourse.pending, (state) => {

                state.isLoading = true;
                state.error = null;

            })

            .addCase(getLecturesByCourse.fulfilled, (state, action) => {

                state.isLoading = false;

                state.lectures = action.payload.data;

            })

            .addCase(getLecturesByCourse.rejected, (state, action) => {

                state.isLoading = false;
                state.error = action.payload;

            });


        // DELETE LECTURE

        builder
            .addCase(deleteLecture.pending, (state) => {

                state.isLoading = true;
                state.error = null;

            })

            .addCase(deleteLecture.fulfilled, (state, action) => {

                state.isLoading = false;

                state.lectures = state.lectures.filter(
                    (lecture) =>
                        lecture._id !== action.payload.lectureId
                );

            })

            .addCase(deleteLecture.rejected, (state, action) => {

                state.isLoading = false;
                state.error = action.payload;

            })
    .addCase(getMyLectures.pending, (state) => {

    state.isLoading = true;
    state.error = null;

})

.addCase(getMyLectures.fulfilled, (state, action) => {

    state.isLoading = false;
    state.lectures = action.payload.data;

})

.addCase(getMyLectures.rejected, (state, action) => {

    state.isLoading = false;
    state.error = action.payload;

})
            
    }

});


export default lectureSlice.reducer;