import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import config from "../../lib/config";
import { getUserProfile } from "../../lib/spotifyAPI";
import { login } from "../../Redux/authSlice";
import { Flex, Button } from "@chakra-ui/react";

const LoginPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = new URLSearchParams(window.location.hash).get(
			"#access_token"
		);

		if (token !== null) {
			const setUserProfile = async () => {
				try {
					const response = await getUserProfile(token);
					dispatch(
						login({
							accessToken: token,
							user: response,
						})
					);
				} catch (e) {
					toast.error(e);
				}
			};

			setUserProfile();
		}
	});

	const getSpotifyAuth = () => {
		const state = Date.now().toString();
		const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

		return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
	};

	return (
		<Flex
			h="100vh"
			alignItems="center"
			justifyContent="center"
			bgGradient="linear(var(--darkblue) 0%, var(--lightblack) 20%)"
		>
			<Button
				as="a"
				bgColor="green.500"
				color="white"
				_focus={{ boxShadow: "none" }}
				_hover={{ bgColor: "green.400" }}
				borderRadius="25"
				href={getSpotifyAuth()}
			>
				Log In with Spotify
			</Button>
		</Flex>
	);
};

export default LoginPage;
