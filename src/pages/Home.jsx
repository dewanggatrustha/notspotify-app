import React from "react";
import AlbumData from "../data/albumData";
import Card from "../components/Card";

const Home = () => {
	return (
		<div className="container cards">
			{AlbumData.map((data) => (
				<Card
					key={data.album.id}
					imagesUrl={data.album.images[0].url}
					title={data.name}
					album={data.album.name}
					artist={data.artists[0].name}
					songUrl={data.external_urls.spotify}
				/>
			))}
		</div>
	);
};

export default Home;
