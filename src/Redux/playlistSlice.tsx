import { createSlice } from "@reduxjs/toolkit";
import { PlaylistInitialState } from "../Types/storeTypes";

const initialState: PlaylistInitialState = {
	playlist: null,
};

export const playlistSlice = createSlice({
	name: "playlist",
	initialState,
	reducers: {
		getPlaylist: (state, action) => {
			state.playlist = action.payload.playlist;
		},
	},
});

export const { getPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
