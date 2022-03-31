import React, { useState } from "react";
import config from "../../lib/config";
import "./index.css";

const SearchBar = ({ accessToken, onSuccess }) => {
	const [text, setText] = useState("");

	const handleInput = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const requestOptions = {
			headers: {
				Authorization: "Bearer " + accessToken,
				"Content-Type": "application/json",
			},
		};

		try {
			const response = await fetch(
				`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`,
				requestOptions
			).then((data) => data.json());

			const tracks = response.tracks.items;
			onSuccess(tracks);
		} catch (e) {
			alert(e);
		}
	};

	return (
		<form className="search" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search your favorite songs.."
				className="search__input"
				required
				onChange={handleInput}
			/>
			<button className="search__button" type="submit">
				Search
			</button>
		</form>
	);
};

export default SearchBar;
