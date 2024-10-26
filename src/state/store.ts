// Ensure modeSlice is correctly exported from this file

import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./slices/mode"; // Assuming you're exporting modeSlice.reducer as default
import authSlice from "./slices/auth"; // Assuming you're exporting modeSlice.reducer as default

export const store = configureStore({
  reducer: {
    mode: modeSlice, 
    auth:authSlice// This should point to modeSlice.reducer, so ensure it's exported correctly
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
