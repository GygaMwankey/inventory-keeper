import {configureStore} from "@reduxjs/toolkit";
import stockReducer from "./stock/stockSlice"
import authReducer from "./auth/authSlice"


const store = configureStore({
    reducer: {
        stock: stockReducer,
        auth: authReducer,
    },
});

export default store