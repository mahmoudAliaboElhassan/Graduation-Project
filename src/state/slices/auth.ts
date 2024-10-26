import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";
import {
  signUp,
 
} from "../act/actAuth";
const { initialStateAuth } = UseInitialStates();

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialStateAuth,
  reducers: {
    // handlelogOutState: (state) => {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("type");
    //   localStorage.removeItem("role");
    //   localStorage.removeItem("expired");
    //   localStorage.removeItem("userId");
    //   localStorage.removeItem("countOfCartItem");
    //   state.token = "";
    //   state.expireToken = "";
    //   state.role = "";
    //   state.Uid = "";  
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
      
      })
      .addCase(signUp.fulfilled, (state, action) => {
        
      })
      .addCase(signUp.rejected, (state, action) => {
       
      })
  },
});

export default authSlice.reducer;
export {
  signUp,
 
};
 