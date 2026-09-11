import {createAsyncThunk} from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../src/config/axiosInstance.jsx";

export let loginUser = createAsyncThunk("auth/loginUser",
    async(credentials, thunkApi)=>{
        try {
            const response = await axiosInstance.post("/auth/login", credentials);
            console.log("Login response:", response.data);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data);
        }
    }
)


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register", credentials);

      console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/auth/me");

            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to get user"
            );
        }
    }
);



