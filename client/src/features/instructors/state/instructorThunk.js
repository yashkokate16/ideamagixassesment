import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";


export const getAllInstructors = createAsyncThunk(
    "instructor/getAllInstructors",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get(
                "/admin/instructors/all"
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to get instructors"
            );

        }

    }
);