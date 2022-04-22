import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import playlistReducer from "./playlistSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		playlist: playlistReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
