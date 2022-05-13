import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const url = "http://127.0.0.1:8000/api/items/";

const initialState = {
    stockItems: [],
    isLoading: true,
};

export const getStockItems = createAsyncThunk(
    'stock/getStockItems',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(url);
            // console.log(url);
            return res.data

        }catch (e) {
            return thunkAPI.rejectWithValue('There was an error')
        }
    });

export const addStockItem = createAsyncThunk(
    'stock/addStockItem',
    async (stockItem, thunkAPI) => {
        try {
            const res = await axios.post(url, stockItem);
            return (
                res.data
            )

        }catch (e) {
            return thunkAPI.rejectWithValue('There was an error')
        }
    });

export const deleteStockItem = createAsyncThunk(
    'stock/deleteStockItem',
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${url} ${id}`);
            return res.data

        }catch (e) {
            return thunkAPI.rejectWithValue('There was an error')
        }
    });

export const updateStockItem = createAsyncThunk(
    'stock/updateStockItem',
    async (stockItem, thunkAPI) => {
        try {
            const res = await axios.put(`${url} ${stockItem.id}/`, stockItem);
            return res.data

        }catch (e) {
            return thunkAPI.rejectWithValue('There was an error')
        }
    });




const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        updateAmount( state, action ) {
            const { amount, itemId } = action.payload;

            state.stockItems.map((item) => {
                if (item.id === itemId){
                    item.amount = amount
                }
                return state.stockItems
            });
        },

        removeFromStock(state, action) {
            const itemId = action.payload;

            state.stockItems = state.stockItems.filter( (item) => (
                item.id !==itemId
            ));
            state.amount = state.stockItems.length;

            console.log(itemId)
        },
    },
    extraReducers: {
        //get stock items
        [getStockItems.pending] : (state) => {
            state.isLoading = true
        },
        [getStockItems.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.stockItems = action.payload;
        },
        [getStockItems.rejected] : (state) => {
            state.isLoading = false
        },

        // add stock items
        [addStockItem.pending] : (state) => {
            state.isLoading = true
        },
        [addStockItem.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.stockItems = [
                ...state.stockItems,
                action.payload
            ]
        },
        [addStockItem.rejected] : (state) => {
            state.isLoading = false
        },
        // update stock items
        [updateStockItem.pending] : (state) => {
            state.isLoading = true
        },
        [updateStockItem.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.stockItems = [
                action.payload,
                ...state.stockItems.filter((item) => (
                    item.id !== action.payload.id
                ))
            ]
        },
        [updateStockItem.rejected] : (state) => {
            state.isLoading = false
        },
    }
});


export const { updateAmount, removeFromStock } = stockSlice.actions;
export default stockSlice.reducer;