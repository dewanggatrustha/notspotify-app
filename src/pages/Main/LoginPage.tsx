import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile, getSpotifyAuth } from "../../lib/apiSpotify";
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
				} catch (error) {
					if (error instanceof Error) {
						toast.error(error.message);
					}
				}
			};

			setUserProfile();
		}
	});

	return (
		<Flex
			h="100vh"
			alignItems="center"
			justifyContent="center"
			bgGradient="linear(purple.900 0%, gray.900 20%)"
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
