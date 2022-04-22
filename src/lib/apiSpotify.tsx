import axios from "axios";
import config from "./config";

const Headers = (accessToken: string) => {
	return {
		Authorization: "Bearer " + accessToken,
		"Content-Type": "application/json",
	};
};

export const searchTrack = async (query: string, accessToken: string) => {
	const requestOptions = {
		headers: Headers(accessToken),
	};

	const response = await axios.get(
		`${config.SPOTIFY_BASE_URL}/search?type=track&q=${query}`,
		requestOptions
	);

	return response.data;
};

export const getSpotifyAuth = () => {
	const state = Date.now().toString();
	const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
	const redirectUri = `${window.location.protocol}//${window.location.host}`;

	return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&state=${state}&scope=${config.SPOTIFY_SCOPE.join(
		"%20"
	)}`;
};

export const getUserProfile = async (accessToken: string) => {
	const requestOptions = {
		headers: Headers(accessToken),
	};

	const response = await axios.get(
		`${config.SPOTIFY_BASE_URL}/me`,
		requestOptions
	);

	return response.data;
};

export const getUserPlaylist = async (accessToken: string) => {
	const requestOptions = {
		headers: Headers(accessToken),
	};

	const response = await axios.get(
		`${config.SPOTIFY_BASE_URL}/me/playlists?offset=6&limit=20`,
		requestOptions
	);

	return response.data;
};
interface NewPlaylistState {
	name: string;
	description: string;
}
export const createPlaylist = async (
	accessToken: string,
	userId: string,
	NewPlaylist: NewPlaylistState
) => {
	const data = JSON.stringify({
		name: NewPlaylist.name,
		description: NewPlaylist.description,
		public: false,
		collaborative: false,
	});

	const requestOptions = {
		headers: Headers(accessToken),
	};

	const response = await axios.post(
		`${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`,
		data,
		requestOptions
	);

	return response.data;
};

export const addTracksToPlaylist = async (
	accessToken: string,
	newPlaylistId: string,
	uris: string[]
) => {
	const data = JSON.stringify({
		uris,
	});

	const requestOptions = {
		headers: Headers(accessToken),
	};

	const response = await axios.post(
		`${config.SPOTIFY_BASE_URL}/playlists/${newPlaylistId}/tracks`,
		data,
		requestOptions
	);

	return response.data;
};
