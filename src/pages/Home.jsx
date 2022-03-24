import React from "react";
import AlbumData from "../data/albumData";
import Card from "../components/Card";

const Home = () => {
	return (
		<div className="container">
			<Card
				imagesUrl={AlbumData.album.images[0].url}
				title={AlbumData.name}
				artist={AlbumData.artists[0].name}
			/>
		</div>
	);
};

export default Home;
