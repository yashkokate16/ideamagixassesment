import { createSlice } from "@reduxjs/toolkit";

import { getAllInstructors } from "./instructorThunk";


const instructorSlice = createSlice({

    name: "instructor",

    initialState: {
        instructors: [],
        isLoading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {

        builder
            .addCase(getAllInstructors.pending, (state) => {

                state.isLoading = true;
                state.error = null;

            })

            .addCase(getAllInstructors.fulfilled, (state, action) => {

                state.isLoading = false;
                state.instructors = action.payload.data;

            })

            .addCase(getAllInstructors.rejected, (state, action) => {

                state.isLoading = false;
                state.error = action.payload;

            });

    }

});


export default instructorSlice.reducer;