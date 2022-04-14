import React, { useState } from "react";
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import CreatePlaylistForm from "../../components/CreatePlaylistForm";
import { Box, Flex, Grid, Text, Divider } from "@chakra-ui/react";
const CreatePlaylist = () => {
	const [tracks, setTracks] = useState([]);
	const [selectedTracksUri, setSelectedTracksUri] = useState([]);
	const [selectedTracks, setSelectedTracks] = useState([]);

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
		<Box>
			<Flex
				min-h="100vh"
				direction="column"
				alignItems="center"
				bgGradient="linear(var(--darkblue) 0%, var(--lightblack) 20%)"
			>
				<CreatePlaylistForm uriTracks={selectedTracksUri} />

				<Divider w="400px" m={10} />

				<SearchBar onSuccess={(tracks) => onSuccessSearch(tracks)} />

				<Grid templateColumns="repeat(5, 1fr)" gap={6} mt={10} mb={10}>
					{tracks.length === 0 && (
						<Text fontSize="lg" color="white">
							No tracks
						</Text>
					)}
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
				</Grid>
			</Flex>
		</Box>
	);
};

export default CreatePlaylist;
