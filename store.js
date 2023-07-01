import { configureStore } from "@reduxjs/toolkit";

import userReducer from './features/sellerSlice'

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store;