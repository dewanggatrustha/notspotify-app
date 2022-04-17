import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState } from "../Types/storeTypes";

const initialState: AuthInitialState = {
	accessToken: "",
	isAuth: false,
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.isAuth = true;
			state.user = action.payload.user;
		},
		logout: () => initialState,
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
