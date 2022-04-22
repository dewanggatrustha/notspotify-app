import { UserProfile, Playlist } from "../Types/spotifyTypes";

export interface AuthInitialState {
	accessToken: string;
	isAuth: boolean;
	user: UserProfile | null;
}

export interface PlaylistInitialState {
	playlist: Playlist[] | null;
}
