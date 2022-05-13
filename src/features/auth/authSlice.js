import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authServices from "./authServices";

const token = localStorage.getItem('token')

const initialState = {
    token: token ? token : null,
    isAuthenticated: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    user: null,
};

export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async (token, thunkAPI) => {
        try {
            return  await  authServices.loadUser(token)
        }catch (e) {
            return thunkAPI.rejectWithValue('There was an error')
        }
    });

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (body, thunkAPI) => {
        try {
            return  await authServices.register(body);
        }catch (e) {
            return thunkAPI.rejectWithValue('There was an error')
        }
    });

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (body, thunkAPI) => {
        try {
            return  await authServices.login(body);
        }catch (e) {
            return thunkAPI.rejectWithValue('There was an error')
        }
    });

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (token, thunkAPI) => {
        try {
            return await authServices.logout(token)
        }catch (e) {
            return thunkAPI.rejectWithValue('There was an error')
        }
    });

 const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
         reset: (state) => {
             state.token = null;
             state.user = null;
             state.isLoading = false;
             state.isSuccess = false;
             state.isError = false;
             state.isAuthenticated = null;
         }
     },
     extraReducers: (builder) => {
         builder
         // Load User Actions
             .addCase(loadUser.pending, state => {
                 state.isLoading = true;
             })
             .addCase(loadUser.fulfilled, (state, action) => {
                 state.isLoading = false;
                 state.isAuthenticated = true;
                 state.user = action.payload;
             })
             .addCase((loadUser.rejected, registerUser.rejected, logoutUser.fulfilled), (state) => {
                 localStorage.removeItem("token");
                 state.token = null;
                 state.user = null;
                 state.isLoading = false;
                 state.isSuccess = false;
                 state.isError = false;
                 state.isAuthenticated = null;

             })

             // Login User actions
             .addCase(loginUser.pending, (state) => {
                 state.isLoading = true
             })
             .addCase(loginUser.fulfilled, (state, action) => {
                 localStorage.setItem('token', action.payload.token);
                 state.isAuthenticated = true;
                 state.isLoading = false;
                 state.token = action.payload.token
                 state.user = action.payload.user
             })
             .addCase(loginUser.rejected, (state) => {
                 localStorage.removeItem("token");
                 state.token = null;
                 state.user = null;
                 state.isLoading = false;
                 state.isSuccess = false;
                 state.isError = false;
                 state.isAuthenticated = null;

             })

             // Register User Actions
             .addCase(registerUser.pending, (state) => {
                 state.isLoading = true
             })
             .addCase(registerUser.fulfilled, (state, action) => {
                 localStorage.setItem('token', action.payload.token);
                 state.isAuthenticated = true;
                 state.isLoading = false;
                 state.token = action.payload.token
                 state.user = action.payload.user
             })
             .addCase(registerUser.rejected, (state) => {
                 localStorage.removeItem("token");
                 state.token = null;
                 state.user = null;
                 state.isLoading = false;
                 state.isSuccess = false;
                 state.isError = false;
                 state.isAuthenticated = null;

             })
     },

 });

export default authSlice.reducer;