import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";


export const createLecture = createAsyncThunk(
    "lecture/createLecture",

    async (lectureData, thunkAPI) => {

        try {

            const response = await axiosInstance.post(
                "/lectures/create",
                lectureData
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to create lecture"
            );

        }

    }
);


export const getLecturesByCourse = createAsyncThunk(
    "lecture/getLecturesByCourse",

    async (courseId, thunkAPI) => {

        try {

            const response = await axiosInstance.get(
                `/lectures/course/${courseId}`
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to get lectures"
            );

        }

    }
);


export const deleteLecture = createAsyncThunk(
    "lecture/deleteLecture",

    async (lectureId, thunkAPI) => {

        try {

            const response = await axiosInstance.delete(
                `/lectures/delete/${lectureId}`
            );

            return {
                ...response.data,
                lectureId
            };

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete lecture"
            );

        }

    }
);


export const getMyLectures = createAsyncThunk(
    "lecture/getMyLectures",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get(
                "/lectures/my-lectures"
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to get lectures"
            );

        }

    }
);