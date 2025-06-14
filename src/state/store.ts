import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./slices/mode";
import authSlice from "./slices/auth";
import gameSlice from "./slices/game";
import adminSlice from "./slices/admin";

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    auth: authSlice,
    game: gameSlice,
    admin: adminSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
