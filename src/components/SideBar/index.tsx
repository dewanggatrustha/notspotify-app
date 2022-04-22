import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import {
	Flex,
	Heading,
	VStack,
	Text,
	Link,
	Box,
	Divider,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { FaHome, FaRegPlusSquare } from "react-icons/fa";
import { getUserPlaylist } from "../../lib/apiSpotify";
import { getPlaylist } from "../../Redux/playlistSlice";

const SideBar = () => {
	const userPlaylists = useAppSelector((state) => state.playlist.playlist);
	const token = useAppSelector((state) => state.auth.accessToken);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const setUserPlaylist = async () => {
			const response = await getUserPlaylist(token);
			dispatch(
				getPlaylist({
					playlist: response.items,
				})
			);
		};

		setUserPlaylist();
	});

	return (
		<Flex
			flexDirection="column"
			pos="fixed"
			w="350px"
			minH="full"
			bgColor="black"
			top={0}
		>
			<VStack justify="space-between" mt={10}>
				<Heading as="h2" size="lg" fontWeight="bold" color="white">
					NotSpotify.
				</Heading>
			</VStack>

			<Box ml={10} mt={10}>
				<Link as={ReactLink} to="#">
					<Flex alignItems="center" mb={5} cursor="pointer">
						<FaHome color="white" />
						<Text
							ml={2}
							fontSize="xl"
							fontWeight="semibold"
							color="white"
						>
							Home
						</Text>
					</Flex>
				</Link>
				<Link as={ReactLink} to="/create-playlist">
					<Flex alignItems="center" mb={5} cursor="pointer">
						<FaRegPlusSquare color="white" />
						<Text
							ml={2}
							fontSize="xl"
							fontWeight="semibold"
							color="white"
						>
							Create Playlist
						</Text>
					</Flex>
				</Link>
			</Box>

			<Box ml={10} mt={10}>
				<Text color="white" fontWeight="bold" fontSize="xl">
					My Playlist
				</Text>
				<Divider w="80%" mt={2} />
				{userPlaylists !== null &&
					userPlaylists.map((playlist: any) => (
						<Link href={playlist.external_urls.spotify} isExternal>
							<Text
								id={playlist.id}
								color="gray.400"
								fontWeight="semibold"
								mt={2}
								_hover={{ color: "white" }}
							>
								{playlist.name}
							</Text>
						</Link>
					))}
			</Box>
		</Flex>
	);
};

export default SideBar;
