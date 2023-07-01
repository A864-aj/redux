// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   sellerData: [],
// };


// const sellerSlice = createSlice({
//   name: "sellerSlice",
//   initialState,
//   reducers: {
//     sellerDataRed: (state, action) => {
//       state.sellerData = action.payload;
//     }
//   },
// });

// export default sellerSlice.reducer;

// export const { sellerDataRed } = sellerSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {},
  error: "",
  status: false,
};


export const userFetchThunk = createAsyncThunk(
  "userFetchThunk/get",
  async () => {
    try {
      const { data } = await axios.get("http://localhost:3999/seller/getSellerdata", {
        withCredentials: true,
        credentials: 'include'
      });
      return data[0];
    } catch (error) {
      if (error.response.status === 404) {
        throw new Error("Page not found");
      }
      if (error.response.status === 500) {
        throw new Error("Internal Server Error");
      }
    }
  }
);



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      
      builder.addCase(userFetchThunk.pending, (state, action) => {
        state.data = [];
        state.status = true;
        state.error = "";
      });
  
      builder.addCase(userFetchThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = false;
        state.error = "";
      });

      builder.addCase(userFetchThunk.rejected, (state, action) => {
        console.log("action:", action);
        state.data = [];
        state.status = false;
        state.error = action.error.message;
      });
  



    },
});



export default userSlice.reducer;