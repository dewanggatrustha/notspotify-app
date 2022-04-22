import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserProfile, getSpotifyAuth } from "../../lib/apiSpotify";
import { login } from "../../Redux/authSlice";
import { Flex, Button, Heading, Text, VStack, HStack } from "@chakra-ui/react";

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
			flexDirection="column"
			justifyContent="center"
			bgGradient="linear(purple.900 0%, gray.900 20%)"
		>
			<VStack spacing={8} textAlign="center">
				<Heading as="h1" size="4xl" color="green.400">
					<Text as="span" color="white">
						Welcome to
					</Text>{" "}
					NotSpotify.
				</Heading>
				<Text color="white" w="2xl" fontSize="xl">
					Lets log in to your account to enjoy the Spotify integrated app
					experience where you can create playlist with your favorite
					songs..
				</Text>
				<HStack>
					<Button
						as="a"
						bgColor="green.500"
						color="white"
						_focus={{ boxShadow: "none" }}
						_hover={{ bgColor: "green.400" }}
						borderRadius="25"
						href={getSpotifyAuth()}
					>
						Get Started
					</Button>
				</HStack>
			</VStack>
		</Flex>
	);
};

export default LoginPage;
