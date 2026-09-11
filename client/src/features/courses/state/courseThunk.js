import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const getAllCourses = createAsyncThunk(
    "course/getAllCourses",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/admin/courses/all");

            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to get courses"
            );
        }
    }
);


export const createCourse = createAsyncThunk(
    "course/createCourse",
    async (courseData, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                "/admin/courses/create",
                courseData
            );

            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to create course"
            );
        }
    }
);

export const updateCourse = createAsyncThunk(
    "course/updateCourse",
    async ({ courseId, courseData }, thunkAPI) => {
        try {
            const response = await axiosInstance.patch(
                `/admin/courses/${courseId}`,
                courseData
            );

            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to update course"
            );
        }
    }
);

export const deleteCourse = createAsyncThunk(
    "course/deleteCourse",
    async (courseId, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(
                `/admin/courses/${courseId}`
            );

            return {
                ...response.data,
                courseId
            };

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete course"
            );
        }
    }
);