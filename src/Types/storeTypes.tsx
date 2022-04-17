import { UserProfile } from "../Types/spotifyTypes";

export interface AuthInitialState {
	accessToken: string;
	isAuth: boolean;
	user: UserProfile | null;
}
