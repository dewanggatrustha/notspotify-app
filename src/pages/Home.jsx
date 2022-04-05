import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import config from "../lib/config";
import CreatePlaylistForm from "../components/CreatePlaylistForm";
import { getUserProfile } from "../lib/spotifyAPI";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";

const Home = () => {
	const [tracks, setTracks] = useState([]);
	const [selectedTracksUri, setSelectedTracksUri] = useState([]);
	const [selectedTracks, setSelectedTracks] = useState([]);
	const isAuth = useSelector((state) => state.auth.isLogin);

	const dispatch = useDispatch();

	useEffect(() => {
		const accessTokenParams = new URLSearchParams(window.location.hash).get(
			"#access_token"
		);

		if (accessTokenParams !== null) {
			const setUserProfile = async () => {
				try {
					const response = await getUserProfile(accessTokenParams);
					dispatch(
						login({
							accessToken: accessTokenParams,
							user: response,
						})
					);
				} catch (e) {
					toast.error(e);
				}
			};

			setUserProfile();
		}
	}, []);

	const getSpotifyLinkAuth = () => {
		const state = Date.now().toString();
		const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

		return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
	};

	const onSuccessSearch = (searchTracks) => {
		const selectedSearchTracks = searchTracks.filter((track) =>
			selectedTracksUri.includes(track.uri)
		);

		setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
	};

	const toggleSelect = (track) => {
		const uri = track.uri;

		if (selectedTracksUri.includes(uri)) {
			setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
			setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
		} else {
			setSelectedTracksUri([...selectedTracksUri, uri]);
			setSelectedTracks([...selectedTracks, track]);
		}
	};

	return (
		<div className="home">
			{!isAuth && (
				<main className="auth__content">
					<button className="auth__button">
						<a href={getSpotifyLinkAuth()}>
							<i class="fa-brands fa-spotify"></i>LOG IN WITH SPOTIFY
						</a>
					</button>
				</main>
			)}

			{isAuth && (
				<main className="container" id="home">
					<CreatePlaylistForm uriTracks={selectedTracksUri} />

					<hr />

					<SearchBar onSuccess={(tracks) => onSuccessSearch(tracks)} />

					<div className="home__nocards">
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
									select={selectedTracksUri.includes(data.uri)}
								/>
							))}
						</div>
					</div>
				</main>
			)}
		</div>
	);
};

export default Home;
