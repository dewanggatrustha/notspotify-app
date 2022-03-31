import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import config from "../lib/config";

const Home = () => {
	const [accessToken, setAccessToken] = useState("");
	const [isAuth, setIsAuth] = useState(false);
	const [tracks, setTracks] = useState([]);
	const [selectedTracksUri, setSelectedTracksUri] = useState([]);

	useEffect(() => {
		const accessToken = new URLSearchParams(window.location.hash).get(
			"#access_token"
		);

		setAccessToken(accessToken);
		setIsAuth(accessToken !== null);
	}, []);

	const getSpotifyLinkAuth = () => {
		const state = Date.now().toString();
		const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

		return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
	};

	const filterSelectedTracks = () => {
		return tracks.filter((track) => selectedTracksUri.includes(track.uri));
	};

	const onSuccessSearch = (searchTracks) => {
		const selectedTracks = filterSelectedTracks();
		const searchDistincTracks = searchTracks.filter(
			(track) => !selectedTracksUri.includes(track.uri)
		);

		setTracks([...selectedTracks, ...searchDistincTracks]);
	};

	const toggleSelect = (track) => {
		const uri = track.uri;

		if (selectedTracksUri.includes(uri)) {
			setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
		} else {
			setSelectedTracksUri([...selectedTracksUri, uri]);
		}
	};

	return (
		<>
			{!isAuth && (
				<main className="auth__content">
					<button className="auth__button">
						<a href={getSpotifyLinkAuth()}>Log In with Spotify</a>
					</button>
				</main>
			)}

			{isAuth && (
				<main className="container" id="home">
					<SearchBar
						accessToken={accessToken}
						onSuccess={(tracks) => onSuccessSearch(tracks)}
					/>

					<div className="home__content">
						{tracks.length === 0 && <p>No tracks</p>}

						<div className="home__cards">
							{tracks.map((data) => (
								<Card
									key={data.id}
									imagesUrl={data.album.images[0].url}
									title={data.name}
									album={data.album.name}
									artist={data.artists[0].name}
									toggleSelect={() => toggleSelect(data)}
								/>
							))}
						</div>
					</div>
				</main>
			)}
		</>
	);
};

export default Home;
