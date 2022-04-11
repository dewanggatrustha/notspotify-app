import React, { useState } from 'react';
import Card from '../../components/Card';
import SearchBar from '../../components/SearchBar';
import CreatePlaylistForm from '../../components/CreatePlaylistForm';
import './CreatePlaylist.css';

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
		<div className="home">
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
		</div>
	);
};

export default CreatePlaylist;
