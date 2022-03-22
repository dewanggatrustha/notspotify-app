import React from "react";
import "./index.css";
import albumInfo from "../../data/album";

export default function index() {
	return (
		<div className="card-wrapper">
			<img
				alt={albumInfo.album.name}
				src={albumInfo.album.images[0].url}
				className="card-image"
			/>
			<div className="card-info">
				<h3>{albumInfo.name}</h3>
				<p>{albumInfo.artists[0].name}</p>
			</div>
			<div className="button-wrapper">
				<button className="card-button">Select</button>
			</div>
		</div>
	);
}
