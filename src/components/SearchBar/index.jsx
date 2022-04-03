import React, { useState } from "react";
import { toast } from "react-toastify";
import { searchTrack } from "../../lib/spotifyAPI";
import "./index.css";

const SearchBar = ({ accessToken, onSuccess }) => {
	const [text, setText] = useState("");

	const handleInput = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await searchTrack(text, accessToken);

			const tracks = response.tracks.items;
			onSuccess(tracks);
		} catch (e) {
			toast.error(e);
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
