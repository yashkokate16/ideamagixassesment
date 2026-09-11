import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getMe } from "./authThunk.jsx";

let authSlice = createSlice({
name:"auth",
initialState:{
    user:null,
    isAuthenticated:false,
    isLoading:false,
    error:null
},

reducers :{
    setUser:(state, action) =>{
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    logoutUser:(state) =>{
        state.user = null;
        state.isAuthenticated = false;
    },
},

extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.error = null;
    })
    .addCase(loginUser.fulfilled,(state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload.message || "Login failed";
    })
    .addCase(registerUser.pending, (state) => {
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload.message || "Registration failed";
    })
    .addCase(getMe.pending, (state) => {
    state.isLoading = true;
})

.addCase(getMe.fulfilled, (state, action) => {
    state.user = action.payload.data;
    state.isAuthenticated = true;
    state.isLoading = false;
})

.addCase(getMe.rejected, (state) => {
    state.user = null;
    state.isAuthenticated = false;
    state.isLoading = false;
})
}

})
export let {setUser, logoutUser} = authSlice.actions;

export default authSlice.reducer;

