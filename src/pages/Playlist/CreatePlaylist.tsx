import React, { useState } from "react";
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import CreatePlaylistForm from "../../components/CreatePlaylistForm";
import ProfileBar from "../../components/ProfileBar";
import { Box, Flex, Grid, Divider } from "@chakra-ui/react";

const CreatePlaylist = () => {
	const [tracks, setTracks] = useState<any[]>([]);
	const [selectedTracksUri, setSelectedTracksUri] = useState<string[]>([]);
	const [selectedTracks, setSelectedTracks] = useState<any[]>([]);

	const onSuccessSearch = (searchTracks: any[]) => {
		const selectedSearchTracks = searchTracks.filter((track) =>
			selectedTracksUri.includes(track.uri)
		);

		setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
	};

	const toggleSelect: (track: any) => void = (track) => {
		const uri = track.uri;

		if (selectedTracksUri.includes(uri)) {
			setSelectedTracksUri(
				selectedTracksUri.filter((item: any) => item !== uri)
			);
			setSelectedTracks(
				selectedTracks.filter((item: any) => item.uri !== uri)
			);
		} else {
			setSelectedTracksUri([...selectedTracksUri, uri]);
			setSelectedTracks([...selectedTracks, track]);
		}
	};
	return (
		<Box>
			<Flex
				h="100vh"
				direction="column"
				alignItems="center"
				bgGradient="linear(purple.900 0%, gray.900 20%)"
			>
				<Flex w="full" justifyContent="flex-end" mt={5} mb={5} mr={10}>
					<ProfileBar />
				</Flex>
				<CreatePlaylistForm uriTracks={selectedTracksUri} />

				<Divider w="400px" m={10} />

				<SearchBar onSuccess={(tracks) => onSuccessSearch(tracks)} />

				<Grid templateColumns="repeat(4, 1fr)" gap={6} mt={10} mb={10}>
					{tracks.map((track) => (
						<Card
							key={track.id}
							imagesUrl={track.album.images[0].url}
							title={track.name}
							artist={track.artists[0].name}
							toggleSelect={() => toggleSelect(track)}
							select={selectedTracksUri.includes(track.uri)}
						/>
					))}
				</Grid>
			</Flex>
		</Box>
	);
};

export default CreatePlaylist;
